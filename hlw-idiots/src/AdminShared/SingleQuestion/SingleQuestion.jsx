import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

const options = ["A", "B", "C", "D"];

const SingleQuestion = ({ q, questionEditHandler, handleDelete, serial }) => {
    return (
        <div className="relative border pr-10 py-5 pl-4 mb-5 rounded-xl text-sm">
            {/* edit, delete buttons */}
            <div className="absolute top-2 right-2 flex flex-col justify-center items-center">
                {questionEditHandler && (
                    <button
                        type="button"
                        onClick={questionEditHandler}
                        className="text-lime-800 bg-lime-100 hover:bg-lime-200 focus:ring-4 focus:outline-none font-medium text-sm p-2.5 text-center inline-flex items-center"
                    >
                        <FaRegEdit className="w-4 h-4" />
                    </button>
                )}

                {handleDelete && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="text-red-800 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none font-medium text-sm p-2.5 text-center inline-flex items-center"
                    >
                        <FaTrashAlt className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Question */}
            <div className="flex items-start gap-2">
                <div className="grid">
                    {q.questionImg && (
                        <img src={q.questionImg} alt="" width={500} />
                    )}
                    <div className="flex justify-start gap-2">
                        <div>{serial}.</div>
                        <div
                            dangerouslySetInnerHTML={{ __html: q.question }}
                            className="mb-3"
                        ></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 mb-3">
                {/* Options */}
                {q.options.map((o, oIndex) => (
                    <div
                        key={oIndex}
                        className={`flex items-start gap-2 ${
                            q.correctAnswer === o && "text-lime-500 font-bold"
                        }`}
                    >
                        <div>{options[oIndex]}.</div>
                        <div dangerouslySetInnerHTML={{ __html: o }}></div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
                {q.tags.map((t, index) => (
                    <div
                        key={index}
                        className={`${
                            index % 2 === 0
                                ? "text-purple-700 bg-purple-100"
                                : "text-pink-700 bg-pink-100"
                        } text-pink-700 bg-pink-100 rounded px-2 py-1 text-[11px] transition duration-200`}
                    >
                        {t.label}
                    </div>
                ))}
            </div>

            <div
                className="text-xs text-black/70"
                dangerouslySetInnerHTML={{ __html: q.explaination }}
            ></div>
        </div>
    );
};

export default SingleQuestion;
