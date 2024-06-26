import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useColleges from "../../../Hooks/useColleges";
import useSubjects from "../../../Hooks/useSubjects";
import { useEffect, useState } from "react";
import useChapters from "../../../Hooks/useChapters";
import useBoards from "../../../Hooks/useBoards";
import { useNavigate, useParams } from "react-router-dom";

const QuestionFetchForm = () => {
    const { tag } = useParams();
    const selectedOption = "";
    const navigate = useNavigate();
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedChapter, setSelectedChapter] = useState("");
    const [institution, setInstitution] = useState("board");
    const [category, setCategory] = useState("subject");
    const [boards] = useBoards();
    const [colleges] = useColleges();
    const [subjects] = useSubjects();
    const [chapters, , refetchChapters] = useChapters(
        selectedSubject || "null"
    );
    const collegesTag = colleges.map((college) => ({
        value: college.slug,
        label: college.name,
    }));

    collegesTag.unshift({ value: "", label: "All College" });

    const { register, handleSubmit, control, setValue } = useForm();

    const onSubmit = (data) => {
        data.tags = [];
        data.tags.push(tag);

        if (institution === "board") {
            delete data.college;
            data.tags.push(data.board);
            delete data.board;
        }

        if (institution === "college") {
            data.college = data.college.value;
            delete data.board;
            data.tags.push(data.college);
            delete data.college;
        }

        if (category === "subject") {
            delete data.chapter;
        }

        if (category === "chapter") {
            data.tags.push(data.chapter);
            delete data.chapter;
        }

        navigate("questions", { state: { ...data } });
    };

    useEffect(() => {
        refetchChapters();
        setSelectedChapter("");
        setValue("chapter", "");
    }, [selectedSubject, refetchChapters, setSelectedChapter, setValue]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <div className="w-full text-center bg-white px-4 mb-3 shadow-inner rounded-full outline-none">
                        <div className="grid grid-cols-2">
                            <div
                                onClick={() => setInstitution("college")}
                                className={`${
                                    institution === "college" &&
                                    "bg-[#FF4242] text-white"
                                } py-2 rounded-full`}
                            >
                                কলেজ প্রশ্ন
                            </div>
                            <div
                                onClick={() => setInstitution("board")}
                                className={`${
                                    institution === "board" &&
                                    "bg-[#FF4242] text-white"
                                } py-2 rounded-full`}
                            >
                                বোর্ড প্রশ্ন
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-2">
                    <div className="w-full text-center bg-white px-4 mb-3 shadow-inner rounded-full outline-none">
                        <div className="grid grid-cols-2">
                            <div
                                onClick={() => setCategory("chapter")}
                                className={`${
                                    category === "chapter" &&
                                    "bg-[#FF4242] text-white"
                                } py-2 rounded-full`}
                            >
                                অধ্যায়
                            </div>
                            <div
                                onClick={() => setCategory("subject")}
                                className={`${
                                    category === "subject" &&
                                    "bg-[#FF4242] text-white"
                                } py-2 rounded-full`}
                            >
                                সাবজেক্ট ফাইনাল
                            </div>
                        </div>
                    </div>
                </div>

                {institution === "college" && (
                    <div className="mb-3">
                        <Controller
                            name="college"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    defaultValue={selectedOption}
                                    value={field.value}
                                    placeholder={"Search College"}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                    }}
                                    options={collegesTag}
                                />
                            )}
                        />
                    </div>
                )}

                {institution === "board" && (
                    <div className="mb-2">
                        <select
                            className="w-full text-center bg-white px-4 py-2 mb-3 shadow-inner rounded-full outline-none"
                            defaultValue={""}
                            {...register("board", { required: true })}
                        >
                            <option value="" disabled>
                                Choose Board
                            </option>
                            <option value={""}>All Boards</option>
                            {boards.map((board, index) => (
                                <option key={index} value={board.slug}>
                                    {board.bnName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <select
                    className="w-full text-center bg-white px-4 py-2 mb-2 shadow-inner rounded-full outline-none"
                    defaultValue={""}
                    {...register("subject", { required: true })}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                >
                    <option value="">Choose Subject</option>
                    {subjects.map((subject, index) => (
                        <option key={index} value={subject.slug}>
                            {subject.bnName} {subject.bnPaper}
                        </option>
                    ))}
                </select>

                {category === "chapter" && (
                    <div className="mb-2">
                        <select
                            className="w-full text-center bg-white px-4 py-2 mb-3 shadow-inner rounded-full outline-none"
                            defaultValue={selectedChapter}
                            {...register("chapter", { required: true })}
                        >
                            <option value="" disabled>
                                Choose Chapter
                            </option>
                            {chapters.map((chapter, index) => (
                                <option key={index} value={chapter.slug}>
                                    {chapter.bnName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="w-full flex justify-center gap-2 mt-14">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#FFC327] to-[#997518] text-white px-3 py-2 shadow-md rounded-full"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuestionFetchForm;
