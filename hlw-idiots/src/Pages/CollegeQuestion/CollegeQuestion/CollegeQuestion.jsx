import { FaHeart } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { BiSolidLike } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { Link, useLoaderData, useParams } from "react-router-dom";
import useTagsBySlug from "../../../Hooks/useTagsBySlug";
import useQuestionsBySubjectTags from "../../../Hooks/useQuestionsBySubjectTags";

const optionIndex = ["A", "B", "C", "D"];

const CollegeQuestion = () => {
    const subject = useLoaderData();
    const { collegeName, subjectName, examName } = useParams();
    const [college] = useTagsBySlug(collegeName);
    const [exam] = useTagsBySlug(examName);
    const [questions] = useQuestionsBySubjectTags(subjectName, [
        collegeName,
        examName,
    ]);

    return (
        <div>
            <div className="card mb-3">
                <SectionTitle title={college.bnName} />
                <div className="flex justify-between items-center">
                    <p className="text-xs">
                        {subject.bnName} {subject.bnPaper}
                    </p>
                    <p className="text-xs">{exam.bnName}</p>
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

                        <div className="grid gap-1 mb-2">
                            {question.options.map((o, oIndex) => (
                                <div
                                    key={oIndex}
                                    className="flex items-start gap-2"
                                >
                                    <div className="w-5 h-5 flex justify-center items-center bg-white shadow-md rounded-full">
                                        {optionIndex[oIndex]}
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: o }}
                                    ></div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-around items-center">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-[#F5F5F5] px-3 rounded-full">
                                    <FaHeart className="w-3 h-3 text-red-600" />
                                    {question?.hearts || 0}
                                </div>

                                <div className="flex items-center gap-1 bg-[#F5F5F5] px-3 rounded-full">
                                    <FaFire className="w-3 h-3 text-[#F44336]" />
                                    {question?.fires || 0}
                                </div>

                                <div className="flex items-center gap-1 bg-[#F5F5F5] px-3 rounded-full">
                                    <BiSolidLike className="w-3 h-3 text-[#FFC327]" />
                                    {question?.likes || 0}
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <FaEye className="w-3 h-3" />
                                {question?.views || 0}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-center gap-2 fixed bottom-2 left-0">
                <Link
                    to={"pdf"}
                    state={{
                        subject,
                        exam,
                        college,
                        questions,
                    }}
                >
                    <button className="bg-gradient-to-r from-[#FF2727] to-[#997518] text-white px-3 py-2 shadow-md rounded-full">
                        Download PDF
                    </button>
                </Link>

                {questions?.length >= 15 && (
                    <Link
                        to={`exam`}
                        state={{
                            subject,
                            exam,
                            college,
                            questions,
                            duration: questions.length - 5,
                        }}
                    >
                        <button className="bg-gradient-to-r from-[#FFC327] to-[#997518] text-white px-3 py-2 shadow-md rounded-full">
                            Start Exam
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CollegeQuestion;
