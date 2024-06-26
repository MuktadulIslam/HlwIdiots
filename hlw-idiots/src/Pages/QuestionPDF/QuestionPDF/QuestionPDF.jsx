import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import pdfLogo from '../../../assets/images/logo/pdf-logo.png';

const optionIndex = ['A', 'B', 'C', 'D'];

const QuestionPDF = () => {
    const location = useLocation();
    const questions = location.state.questions;
    const subject = location.state.subject;
    const college = location.state?.college;
    const exam = location.state?.exam;
    const board = location.state?.board;
    const year = location.state?.year;

    useEffect(() => {
        window.print();
    }, []);

    return (
        <div>
            <div className="card mb-3">
                <SectionTitle title={college?.bnName || board?.bnName} />
                <div className="flex justify-between items-center">
                    <p className="text-xs">{subject.bnName} {subject.bnPaper}</p>
                    <p className="text-xs">{exam?.bnName || year?.bnName}</p>
                </div>
            </div>

            <div className="columns-2 gap-3 mb-3 pb-14">
                {
                    questions.map((question, index) => <div key={index} className="card-white text-sm relative">
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
                        
                        <img src={pdfLogo} alt="" className="absolute bottom-6 right-4" />
                    </div>)
                }
            </div>
        </div>
    );
};

export default QuestionPDF;