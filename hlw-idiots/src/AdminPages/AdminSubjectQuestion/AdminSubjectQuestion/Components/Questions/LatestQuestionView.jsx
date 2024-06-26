import Swal from "sweetalert2";
import SingleQuestion from "../../../../../AdminShared/SingleQuestion/SingleQuestion";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Pagination from "../../../../../Components/Pagination";
import Spinner from "../../../../../Components/Spinner";

const LatestQuestionView = ({
    questionsBank,
    isLoadingQuestionsBank,
    questionEditHandler,
    refetchQuestionsBank,
    setPage,
    paginationUrl,
    page,
}) => {
    const [axiosSecure] = useAxiosSecure();
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete this question`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`questions/${id}`).then((response) => {
                    if (response.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Deleted Successfull.",
                            icon: "success",
                        });
                        refetchQuestionsBank();
                    }
                });
            }
        });
    };

    const pageCount =
        questionsBank?.totalQuestions > 0
            ? Math.ceil(questionsBank?.totalQuestions / 10)
            : 1;

    return (
        <div>
            <div className="columns-1 md:columns-2 gap-3 md:gap-5 mb-6">
                {isLoadingQuestionsBank ? (
                    <Spinner />
                ) : (
                    questionsBank?.questions &&
                    questionsBank?.questions.length > 0 &&
                    questionsBank.questions.map((q, index) => (
                        <SingleQuestion
                            key={q._id}
                            q={q}
                            serial={index + 1}
                            questionEditHandler={() =>
                                questionEditHandler(q._id)
                            }
                            handleDelete={() => handleDelete(q._id)}
                        />
                    ))
                )}
            </div>

            <div className="flex justify-center">
                <Pagination
                    pageCount={pageCount}
                    setPage={setPage}
                    paginationUrl={paginationUrl}
                    page={page}
                />
            </div>
        </div>
    );
};

export default LatestQuestionView;
