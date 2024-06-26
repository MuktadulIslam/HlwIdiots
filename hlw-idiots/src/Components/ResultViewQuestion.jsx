/* eslint-disable react/prop-types */
import { BiSolidLike } from "react-icons/bi";
import { FaBook, FaBookmark, FaFire, FaHeart } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";

const optionIndex = ["A", "B", "C", "D"];

const ResultViewQuestion = ({
    question,
    index,
    examData,
    openExplainationModal,
}) => {
    return (
        <div className="card-white grid my-grid text-sm">
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
                        <div key={oIndex} className="flex items-start gap-2">
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
                <button onClick={() => openExplainationModal(question._id)}>
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
    );
};

export default ResultViewQuestion;
