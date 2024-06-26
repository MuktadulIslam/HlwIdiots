import { Link, useLocation } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { Fragment, useEffect, useState } from "react";
import useTimeDifferencer from "../../../Hooks/useTimeDifferencer";
import { Dialog, Transition } from "@headlessui/react";
import ResultViewQuestion from "../../../Components/ResultViewQuestion";

const ExamResult = () => {
    const location = useLocation();
    const questions = location.state.questions;
    const subject = location.state.subject;
    const college = location.state?.college;
    const exam = location.state?.exam;
    const board = location.state?.board;
    const year = location.state?.year;
    const result = location.state?.result.totalGainedMarks;
    const examData = location.state?.result.examData;

    const [isOpen, setIsOpen] = useState(false);
    const [explaination, setExplaination] = useState("");

    function closeExplainationModal() {
        setIsOpen(false);
        setExplaination("");
    }

    function openExplainationModal(id) {
        const explainatioQuestion = questions.find((q) => q._id === id);
        setExplaination(explainatioQuestion);
        setIsOpen(true);
    }

    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const duration = useTimeDifferencer(
        examData[0].startTime,
        examData[0].submitTime
    );

    useEffect(() => {
        const filtered = questions.map((q) => ({
            ...q,
            tags: q.tags.filter(
                (t) => t.type === "chapter" || t.type === "book"
            ),
        }));
        setFilteredQuestions(filtered);
    }, [questions]);

    return (
        <div>
            <div className="card mb-3">
                <SectionTitle title={college?.bnName || board?.bnName} />
                <div className="flex justify-between items-center">
                    <p className="text-xs">
                        {subject.bnName} {subject.bnPaper}
                    </p>
                    <p className="text-xs">{exam?.bnName || year?.bnName}</p>
                </div>
            </div>

            <div className="card-white bg-[#FFFFFFB5] mb-3">
                <h3 className="text-[#F44336] text-lg text-center">
                    Performance Data
                </h3>
                <div className="flex justify-between items-center">
                    <p className="text-xs">
                        Marks: <span className="text-[#F44336]">{result}</span>/
                        {questions.length * examData[0].positiveMarking}
                    </p>
                    <p className="text-xs">
                        Time: <span className="text-[#F44336]">{duration}</span>
                    </p>
                </div>
            </div>

            <div className="grid gap-3 pb-14">
                {filteredQuestions.map((question, index) => (
                    <ResultViewQuestion
                        key={index}
                        question={question}
                        index={index}
                        examData={examData}
                        openExplainationModal={openExplainationModal}
                    />
                ))}

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeExplainationModal}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="font-medium leading-6 text-gray-900"
                                        >
                                            Explainations
                                        </Dialog.Title>
                                        <div className="mt-2 text-xs">
                                            <p className="mb-1 font-semibold italic">
                                                প্রশ্ন -
                                            </p>
                                            <div className="mb-2">
                                                {explaination.questionImg && (
                                                    <div className="max-w-[450px]">
                                                        <img
                                                            src={
                                                                explaination.questionImg
                                                            }
                                                            alt=""
                                                            className="w-full"
                                                        />
                                                    </div>
                                                )}

                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: explaination.question,
                                                    }}
                                                ></div>
                                            </div>
                                            <p className="mb-1 font-semibold italic text-black">
                                                ব্যাখ্যা -
                                            </p>
                                            <div
                                                className="text-black/60"
                                                dangerouslySetInnerHTML={{
                                                    __html: explaination.explaination,
                                                }}
                                            ></div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

            <div className="w-full flex justify-center fixed bottom-2 left-0">
                <Link to={`/`}>
                    <button className="bg-gradient-to-r from-[#FFC327] to-[#997518] text-white px-3 py-2 shadow-md rounded-full">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ExamResult;
