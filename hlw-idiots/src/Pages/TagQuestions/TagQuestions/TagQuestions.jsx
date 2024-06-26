import { useLocation } from "react-router-dom";
import useQuestionsBySubjectTags from "../../../Hooks/useQuestionsBySubjectTags";
import { useState } from "react";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { FaEye, FaFire, FaHeart } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import useTagsBySlug from "../../../Hooks/useTagsBySlug";
import useSubjectBySlug from "../../../Hooks/useSubjectBySlug";

const optionIndex = ['A', 'B', 'C', 'D'];

const TagQuestions = () => {
    const location = useLocation();
    const [fetchParams, setFetchParams] = useState(location.state);
    const [subject] = useSubjectBySlug(fetchParams.subject);
    const [tags] = useTagsBySlug(fetchParams.tags);

    let institute = {};
    let chapter = {};
    let keyWord = {};

    if (tags && tags.length > 0) {
        institute = tags.find(tag => tag.type === 'board' || tag.type === 'college');
        chapter = tags.find(tag => tag.type === 'chapter') || null;
        keyWord = tags.find(tag => tag.type === 'regular') || null;
    }

    const [questions] = useQuestionsBySubjectTags(fetchParams.subject, fetchParams.tags);

    return (
        <div>
            <div className="card mb-3">
                <SectionTitle title={keyWord.name} />
                <div className="flex justify-between items-center">
                    {
                        subject && <p className="text-xs">{subject.bnName} {subject.bnPaper}</p>
                    }
                    <p className="text-xs">{institute?.bnName}</p>
                </div>

                {
                    chapter && <div className="flex justify-center items-center">
                        <p className="text-xs">{chapter.bnName}</p>
                    </div>
                }
            </div>

            <div className="grid gap-3 pb-14">
                {
                    questions.map((question, index) => <div key={index} className="card-white text-sm">
                        {
                            question.questionImg && <div className="max-w-[450px]">
                                <img src={question.questionImg} alt="" className="w-full" />
                            </div>
                        }

                        <div className="flex items-start gap-2 mb-2">
                            <span>{index + 1}.</span>
                            <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
                        </div>

                        <div className="grid gap-1 mb-2">
                            {
                                question.options.map((o, oIndex) => <div key={oIndex} className="flex items-start gap-2">
                                    <div className="w-5 h-5 flex justify-center items-center bg-white shadow-md rounded-full">{optionIndex[oIndex]}</div>
                                    <div dangerouslySetInnerHTML={{ __html: o }}></div>
                                </div>)
                            }
                        </div>

                        <div className="flex justify-around items-center">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-[#F5F5F5] px-3 rounded-full">
                                    <FaHeart className="w-3 h-3 text-red-600" />
                                    {question.hearts}
                                </div>

                                <div className="flex items-center gap-1 bg-[#F5F5F5] px-3 rounded-full">
                                    <FaFire className="w-3 h-3 text-[#F44336]" />
                                    {question.fires}
                                </div>

                                <div className="flex items-center gap-1 bg-[#F5F5F5] px-3 rounded-full">
                                    <BiSolidLike className="w-3 h-3 text-[#FFC327]" />
                                    {question.likes}
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <FaEye className="w-3 h-3" />
                                {question.views}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default TagQuestions;