import { useLoaderData, useParams } from "react-router-dom";
import Spinner from "../../../Components/Spinner";
import useQuestionsBySubjectTags from "../../../Hooks/useQuestionsBySubjectTags";
import useTagsBySlug from "../../../Hooks/useTagsBySlug";
import AdminSectionTitle from "../../../AdminShared/AdminSectionTitle/AdminSectionTitle";
import SingleQuestion from "../../../AdminShared/SingleQuestion/SingleQuestion";

const AdminBoardQuestion = () => {
    const subject = useLoaderData();
    const { boardName, subjectName, year } = useParams();
    const [board] = useTagsBySlug(boardName);
    const [yearTag] = useTagsBySlug(year);
    const [questions, isLoading] = useQuestionsBySubjectTags(subjectName, [
        boardName,
        year,
    ]);

    return (
        <div>
            <AdminSectionTitle
                title={`${board.bnName} - ${yearTag.bnName} | ${subject.bnName} ${subject.bnPaper}`}
            />

            <div className="columns-1 md:columns-2 gap-3 md:gap-5 mb-6">
                {isLoading ? (
                    <Spinner />
                ) : (
                    questions &&
                    questions?.length > 0 &&
                    questions.map((q, index) => (
                        <SingleQuestion key={q._id} q={q} serial={index + 1} />
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminBoardQuestion;
