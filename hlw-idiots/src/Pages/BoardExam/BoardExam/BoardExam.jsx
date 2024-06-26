import { RadioGroup } from "@headlessui/react";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ClockSound from "../../../assets/sound/clock-sound.mp3";
import useUserData from "../../../Hooks/useUserData";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const optionIndex = ["A", "B", "C", "D"];

const BoardExam = () => {
    const [userData] = useUserData();
    const location = useLocation();
    const navigate = useNavigate();
    const [axiosSecure] = useAxiosSecure();
    const questions = location.state.questions;
    const subject = location.state.subject;
    const board = location.state?.college;
    const year = location.state?.year;
    const duration = location.state?.duration;
    const positiveMarking = location.state?.exam?.positiveMarking || 1;
    const negativeMarking = location.state?.exam?.negativeMarking || 0;

    const initialSelectedOptions = questions.map(() => "");
    const [selectedOptions, setSelectedOptions] = useState(
        initialSelectedOptions
    );
    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const [lastMinute, setLastMinute] = useState(false);

    const handleOptionChange = (index, option) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = option;
        setSelectedOptions(newSelectedOptions);
    };

    // hook form
    const { register, handleSubmit, setValue, reset } = useForm();

    const onSubmit = useCallback(
        (data) => {
            data.answers = data.answers.map((d) => ({
                ...d,
                examType: "board",
                exam: year.slug,
                student: userData._id,
                startTime: data.startTime,
                submitTime: new Date(),
                totalMark: questions.length,
                positiveMarking: positiveMarking,
                negativeMarking: negativeMarking,
            }));
            console.log(data);
            axiosSecure
                .post("exam/regular", [...data.answers])
                .then((response) => {
                    console.log(response.data);
                    reset();
                    navigate("/exam-result", {
                        state: { ...location.state, result: response.data },
                    });
                });
        },
        [
            axiosSecure,
            location.state,
            navigate,
            negativeMarking,
            positiveMarking,
            questions.length,
            reset,
            userData._id,
            year.slug,
        ]
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmit(onSubmit)();
                    return 0;
                }
                if (prevTime <= 60 && !lastMinute) {
                    setLastMinute(true);
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [handleSubmit, lastMinute, onSubmit, setValue]);

    useEffect(() => {
        if (lastMinute) {
            const audio = new Audio(ClockSound);
            const interval = setInterval(() => {
                audio.play();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [lastMinute]);

    useEffect(() => {
        reset();
        setValue("startTime", new Date());
    }, [reset, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card mb-3">
                <SectionTitle title={board?.bnName} />
                <div className="flex justify-between items-center">
                    <p className="text-xs">
                        {subject.bnName} {subject.bnPaper}
                    </p>
                    <div
                        className={`flex items-center gap-2 text-sm text-center bg-[#F44336] text-white px-2 shadow-md rounded-sm ${
                            lastMinute ? "blink" : ""
                        }`}
                    >
                        Timer: {Math.floor(timeLeft / 60)}:
                        {String(timeLeft % 60).padStart(2, "0")}
                    </div>
                    <p className="text-xs">{year?.bnName}</p>
                </div>
            </div>

            <div className="grid gap-3 pb-14">
                {questions.map((question, index) => (
                    <div key={index} className="card-white text-sm">
                        {question.questionImg && (
                            <div className="max-w-[450px]">
                                <img
                                    src={question.questionImg}
                                    alt=""
                                    className="w-full"
                                />
                            </div>
                        )}

                        <div className="flex items-start gap-2 mb-2">
                            <span>{index + 1}.</span>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: question.question,
                                }}
                            ></div>
                        </div>

                        <RadioGroup
                            value={selectedOptions[index]}
                            onChange={(value) =>
                                handleOptionChange(index, value)
                            }
                        >
                            <RadioGroup.Label className="sr-only">
                                Server size
                            </RadioGroup.Label>
                            <div className="grid gap-1 mb-2">
                                {question.options.map((o, oIndex) => (
                                    <div key={oIndex}>
                                        <RadioGroup.Option
                                            value={o}
                                            className={
                                                "flex items-start gap-2 cursor-pointer"
                                            }
                                        >
                                            <div
                                                className={`w-5 h-5 flex justify-center items-center shadow-md rounded-full ${
                                                    selectedOptions[index] === o
                                                        ? "bg-black text-white"
                                                        : "bg-white"
                                                }`}
                                            >
                                                {optionIndex[oIndex]}
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: o,
                                                }}
                                            ></div>
                                        </RadioGroup.Option>
                                        <input
                                            type="hidden"
                                            {...register("answers")}
                                            onChange={setValue(
                                                `answers[${index}]`,
                                                {
                                                    question: question._id,
                                                    answer: selectedOptions[
                                                        index
                                                    ],
                                                }
                                            )}
                                        />
                                        <input
                                            type="hidden"
                                            {...register("startTime")}
                                        />
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-center gap-2 fixed bottom-2 left-0">
                <button
                    type="submit"
                    className="bg-gradient-to-r from-[#FFC327] to-[#997518] text-white px-5 py-2 shadow-md rounded-full"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default BoardExam;
