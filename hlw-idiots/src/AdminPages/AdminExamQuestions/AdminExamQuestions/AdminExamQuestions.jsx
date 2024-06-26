import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAdminExamBySlug from "../../../Hooks/useAdminExamBySlug";
import useSubjects from "../../../Hooks/useSubjects";
import useTags from "../../../Hooks/useTags";
import Select from "react-select";
import useQuestionsBySubjectTagsPage from "../../../Hooks/useQuestionsBySubjectTagsPage";
import QuestionSelection from "../Components/QuestionSelection";
import toast from "react-hot-toast";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminExamQuestions = () => {
    const { slug, pageNo } = useParams();
    const [exam] = useAdminExamBySlug(slug);
    const [page, setPage] = useState(pageNo);
    const [subjects] = useSubjects();
    const [axiosSecure] = useAxiosSecure();
    const [tags] = useTags();
    const [selectedQuestions, setSelectedQuestions] = useState(
        exam?.questions ? exam.questions : []
    );
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const totalQuestions = selectedQuestions?.length || 0;
    const maxTotalQuestions = exam.totalQuestions;
    const filteredTags = selectedTags.map((t) => t.value);
    const [questions, isLoading, refetch] = useQuestionsBySubjectTagsPage(
        selectedSubject,
        filteredTags,
        page
    );

    const selectedQuestionsHandler = (id) => {
        const isAdded = selectedQuestions.some((sq) => sq === id);
        if (isAdded) {
            const remaining = selectedQuestions.filter((sq) => sq !== id);
            setSelectedQuestions(remaining);
            toast.error("Question Removed");
        } else {
            if (selectedQuestions.length === maxTotalQuestions) {
                return toast.error("exam Question store full");
            }
            setSelectedQuestions([...selectedQuestions, id]);
            toast.success("Question Added");
        }
    };

    const paginationUrl = `/678170a9caf9f7e3/exams/${slug}/`;

    const tagsOptions = tags.map((tag) => {
        if (tag?.college) {
            return {
                value: tag.slug,
                label:
                    tag.name +
                    " | " +
                    tag.collegeName +
                    " | " +
                    tag.subjectName,
            };
        } else if (tag?.board) {
            return { value: tag.slug, label: tag.name + " | " + tag.boardName };
        } else {
            return { value: tag.slug, label: tag.name };
        }
    });

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const addQuestions = () => {
        console.log("clicked");
        axiosSecure
            .patch(`exams/questions/${exam._id}`, selectedQuestions)
            .then((response) => {
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: `Questions Added!`,
                        icon: "success",
                    });
                    refetch();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Something wrong!",
                        icon: "error",
                    });
                }
            });
    };

    useEffect(() => {
        if (exam?.questions) {
            setSelectedQuestions(exam.questions);
        }
    }, [exam.questions]);

    useEffect(() => {
        refetch();
    }, [refetch, page, selectedSubject, filteredTags]);

    const pageCount =
        questions?.totalQuestions > 0
            ? Math.ceil(questions?.totalQuestions / 10)
            : 1;

    return (
        <div>
            <div className="flex justify-center mb-4">
                <button
                    onClick={addQuestions}
                    className="flex items-center gap-1 bg-lime-500 text-lime-50 disabled:bg-gray-100 disabled:text-gray-600 px-5 py-2 rounded-lg"
                    disabled={
                        totalQuestions === maxTotalQuestions ? false : true
                    }
                >
                    Total Question: {totalQuestions} / {maxTotalQuestions}{" "}
                    {totalQuestions === maxTotalQuestions && (
                        <IoCheckmarkDoneSharp className="w-5 h-5" />
                    )}
                </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="mb-4">
                    <label htmlFor="type" className="admin-label">
                        Subject
                    </label>
                    <select
                        id="type"
                        defaultValue={""}
                        onChange={handleSubjectChange}
                        className="admin-input mb-2"
                    >
                        <option value="">Choose Subject</option>
                        {subjects.map((s, index) => (
                            <option key={index} value={s.slug}>
                                {s.bnName} {s.bnPaper}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-span-2 mb-4">
                    <label className="admin-label">Tags *</label>
                    <Select
                        defaultValue={selectedTags}
                        onChange={setSelectedTags}
                        options={tagsOptions}
                        isMulti={true}
                    />
                </div>
            </div>

            <QuestionSelection
                pageCount={pageCount}
                questions={questions}
                isLoading={isLoading}
                selectedQuestions={selectedQuestions}
                selectedQuestionsHandler={selectedQuestionsHandler}
                page={page}
                setPage={setPage}
                paginationUrl={paginationUrl}
            />
        </div>
    );
};

export default AdminExamQuestions;
