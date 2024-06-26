import Pagination from '../../../Components/Pagination';
import Spinner from '../../../Components/Spinner';
import QuestionSelectionCard from './QuestionSelectionCard';

const QuestionSelection = ({ pageCount, questions, isLoading, page, setPage, selectedQuestions, selectedQuestionsHandler, paginationUrl }) => {
    return (
        <div>
            <div className="columns-1 md:columns-2 gap-3 md:gap-5 mb-6">
                {
                    isLoading
                        ? <Spinner />
                        : questions?.questions && questions?.questions.length > 0 && questions.questions.map((q, index) => <QuestionSelectionCard
                            key={q._id}
                            q={q}
                            serial={index + 1}
                            selectedQuestions={selectedQuestions}
                            selectedQuestionsHandler={selectedQuestionsHandler}
                        />)
                }
            </div>

            <div className="flex justify-center">
                <Pagination pageCount={pageCount} setPage={setPage} paginationUrl={paginationUrl} page={page} />
            </div>
        </div>
    );
};

export default QuestionSelection;