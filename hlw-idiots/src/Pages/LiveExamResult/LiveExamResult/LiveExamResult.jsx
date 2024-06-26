import { Link, useLocation } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { FaFire, FaHeart, FaBookmark, FaBook } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Fragment, useEffect, useState } from "react";
import useTimeDifferencer from "../../../Hooks/useTimeDifferencer";
import { Dialog, Transition } from "@headlessui/react";
import useExamQuestions from "../../../Hooks/useExamQuestions";

const optionIndex = ["A", "B", "C", "D"];

const LiveExamResult = () => {
    const location = useLocation();
    const questionIds = location.state.questions;
    const [questions] = useExamQuestions(questionIds);
    const result = location.state?.result.totalGainedMarks;
    const examData = location.state?.result.examData;
    console.log(location.state);

    const [isOpen, setIsOpen] = useState(false);
    const [explaination, setExplaination] = useState("");

    function closeModal() {
        setIsOpen(false);
        setExplaination("");
    }

    function openModal(id) {
        const explainatioQuestion = questions.find((q) => q._id === id);
        setExplaination(explainatioQuestion.explaination);
        setIsOpen(true);
    }

    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const duration = useTimeDifferencer(
        examData[0].startTime,
        examData[0].submitTime
    );

    useEffect(() => {
        const filtered = questions.map((q) => ({
            ...q,
            tags: q.tags.filter((t) => t.type !== "regular"),
        }));
        setFilteredQuestions(filtered);
    }, [location.state.type, questions]);

    return (
        <div>
            <div className="card mb-3">
                <SectionTitle title={location.state.name} />
                <div className="flex justify-between items-center">
                    <p className="text-xs">{""}</p>
                    <p className="text-xs">{""}</p>
                </div>
            </div>

            <div className="card-white bg-[#FFFFFFB5] mb-3">
                <h3 className="text-[#F44336] text-lg text-center">
                    Performance Data
                </h3>
                <div className="flex justify-between items-center">
                    <p className="text-xs">
                        Marks: <span className="text-[#F44336]">{result}</span>/
                        {questions.length * examData[0].positiveMarking}
                    </p>
                    <p className="text-xs">
                        Time: <span className="text-[#F44336]">{duration}</span>
                    </p>
                </div>
            </div>

            <div className="grid gap-3 pb-14">
                {filteredQuestions.map((question, index) => (
                    <div
                        key={index}
                        className="card-white grid my-grid text-sm"
                    >
                        <div>
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

                            <div className="grid gap-1 mb-3">
                                {question.options.map((o, oIndex) => (
                                    <div
                                        key={oIndex}
                                        className="flex items-start gap-2"
                                    >
                                        <div
                                            className={`w-5 h-5 flex justify-center items-center shadow-md rounded-full
                                        ${
                                            examData[index].answer === "" &&
                                            question.correctAnswer === o
                                                ? "bg-[#5049d3] text-white"
                                                : ""
                                        }
                                        ${
                                            examData[index].answer !== "" &&
                                            question.correctAnswer === o
                                                ? "bg-[#49D34F] text-white"
                                                : ""
                                        }
                                        ${
                                            examData[index].answer !== "" &&
                                            examData[index].answer === o &&
                                            o === question.correctAnswer
                                                ? "bg-[#49D34F] text-white"
                                                : ""
                                        }
                                        ${
                                            examData[index].answer !== "" &&
                                            examData[index].answer === o &&
                                            o !== question.correctAnswer
                                                ? "bg-[#FF0000] text-white"
                                                : ""
                                        }
                                        ${
                                            examData[index].answer === "" &&
                                            question.correctAnswer !== o
                                                ? "bg-white"
                                                : ""
                                        }`}
                                        >
                                            {optionIndex[oIndex]}
                                        </div>

                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: o,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-1 items-center">
                                {question.tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 text-black/70 text-xs px-3 py-1 rounded-full"
                                    >
                                        {tag.bnLabel}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col justify-start gap-4">
                            <button>
                                <FaBookmark className="w-4 h-4 text-gray-600" />
                            </button>
                            <button onClick={() => openModal(question._id)}>
                                <FaBook className="w-4 h-4 text-[#FFC2C2]" />
                            </button>
                            <button>
                                <IoIosInformationCircleOutline className="w-4 h-4 text-gray-600" />
                            </button>
                            <button>
                                <FaHeart className="w-4 h-4 text-red-600" />
                            </button>
                            <button>
                                <FaFire className="w-4 h-4 text-orange-400" />
                            </button>
                            <button>
                                <BiSolidLike className="w-4 h-4 text-yellow-400" />
                            </button>
                        </div>
                    </div>
                ))}
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeModal}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Explainations
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div
                                                className="text-xs"
                                                dangerouslySetInnerHTML={{
                                                    __html: explaination,
                                                }}
                                            ></div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

            <div className="w-full flex justify-center fixed bottom-2 left-0">
                <Link
                    to={`/exams/live/${location.state.slug}/scoreboard`}
                    state={{
                        name: location.state.name,
                        slug: location.state.slug,
                        type: location.state.type,
                    }}
                >
                    <button className="bg-gradient-to-r from-[#FFC327] to-[#997518] text-white px-3 py-2 shadow-md rounded-full">
                        See Your Position
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LiveExamResult;
