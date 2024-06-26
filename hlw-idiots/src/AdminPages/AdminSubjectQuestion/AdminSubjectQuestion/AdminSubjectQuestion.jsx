import { useLoaderData, useParams } from "react-router-dom";
import AdminSectionTitle from "../../../AdminShared/AdminSectionTitle/AdminSectionTitle";
import { FaEye } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ChapterAddModal from "./Components/Chapters/ChapterAddModal";
import ChaptersTable from "./Components/Chapters/ChaptersTable";
import useChapters from "../../../Hooks/useChapters";
import { FaPlus } from "react-icons/fa6";
import QuestionAddForm from "./Components/Questions/QuestionAddForm";
import LatestQuestionView from "./Components/Questions/LatestQuestionView";
import useQuestionBank from "../../../Hooks/useQuestionBank";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import QuestionEditForm from "./Components/Questions/QuestionEditForm";

const AdminSubjectQuestion = () => {
    const { pageNo } = useParams();
    const [page, setPage] = useState(pageNo);
    const { subjectName } = useParams();
    const subject = useLoaderData();
    const [axiosSecure] = useAxiosSecure();
    const [editMode, setEditMode] = useState(false);
    const [editableQuestion, setEditableQuestion] = useState({});
    const [chapters, isLoadingChapters, refetchChapters] = useChapters(
        subject.slug
    );
    const [questionsBank, isLoadingQuestionsBank, refetchQuestionsBank] =
        useQuestionBank(subjectName, page);

    const paginationUrl = `/678170a9caf9f7e3/question-bank/${subjectName}/`;

    useEffect(() => {
        refetchQuestionsBank();
    }, [page, refetchQuestionsBank]);

    const questionEditHandler = (id) => {
        setEditMode(true);
        axiosSecure.get(`questions/${id}`).then((response) => {
            setEditableQuestion(response.data);
        });
    };

    return (
        <div>
            {/* section title */}
            <AdminSectionTitle
                title={`${subject.bnName} ${subject.bnPaper} (মোট প্রশ্ন - ${questionsBank.totalQuestions})`}
            />

            <Tabs>
                <TabList className="flex flex-wrap justify-center items-center gap-4 pt-5 mb-5">
                    {/* add question */}
                    <Tab className="flex items-center justify-center">
                        <button
                            type="button"
                            className="admin-big-btn bg-cyan-100 hover:bg-cyan-200"
                        >
                            <FaPlus className="w-7 h-7" />
                            Add Question
                        </button>
                    </Tab>

                    {/* view question button */}
                    <Tab className="flex items-center justify-center">
                        <button
                            type="button"
                            className="admin-big-btn bg-amber-100 hover:bg-amber-200"
                        >
                            <FaEye className="w-7 h-7" />
                            View Questions
                        </button>
                    </Tab>

                    {/* chapter tags button */}
                    <Tab className="flex items-center justify-center">
                        <button
                            type="button"
                            className="admin-big-btn bg-blue-100 hover:bg-blue-200"
                        >
                            <MdOutlineLibraryBooks className="w-7 h-7" />
                            Chapter Tags
                        </button>
                    </Tab>
                </TabList>

                {/* data views */}
                <TabPanel>
                    {editMode ? (
                        <QuestionEditForm
                            refetchQuestionsBank={refetchQuestionsBank}
                            editableQuestion={editableQuestion}
                            setEditMode={setEditMode}
                        />
                    ) : (
                        <QuestionAddForm
                            subjectName={subjectName}
                            refetchQuestionsBank={refetchQuestionsBank}
                        />
                    )}

                    <LatestQuestionView
                        questionsBank={questionsBank}
                        isLoadingQuestionsBank={isLoadingQuestionsBank}
                        questionEditHandler={questionEditHandler}
                        refetchQuestionsBank={refetchQuestionsBank}
                        setPage={setPage}
                        paginationUrl={paginationUrl}
                        page={page}
                    />
                </TabPanel>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>

                <TabPanel>
                    <ChapterAddModal
                        subject={subject}
                        refetchChapters={refetchChapters}
                    />

                    <ChaptersTable
                        chapters={chapters}
                        isLoadingChapters={isLoadingChapters}
                        refetchChapters={refetchChapters}
                    />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default AdminSubjectQuestion;
