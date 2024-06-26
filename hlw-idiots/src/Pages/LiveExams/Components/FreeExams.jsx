import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import useExams from "../../../Hooks/useExams";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaUsers } from "react-icons/fa6";

const FreeExams = () => {
    const [exams, isLoading, refetch] = useExams("live", "free");
    const [currentTime, setCurrentTime] = useState(new Date());

    const updateCurrentTime = useCallback(() => {
        setCurrentTime(new Date());
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
            updateCurrentTime();
        }, 10000);
        return () => clearInterval(intervalId);
    }, [refetch, updateCurrentTime]);

    const handleButtonClick = (message) => {
        Swal.fire({
            icon: "info",
            title: "Information",
            text: message,
            confirmButtonText: "OK",
        });
    };

    const renderExamStatus = (exam) => {
        const startTime = new Date(exam.startTime);
        const endTime = new Date(exam.endTime);

        if (currentTime < startTime) {
            return (
                <div
                    key={exam._id}
                    className="card-sm flex justify-between items-center"
                >
                    <p>{exam.name}</p>
                    <button
                        onClick={() =>
                            handleButtonClick(
                                `Exam will started at ${moment(
                                    startTime
                                ).format("llll")}`
                            )
                        }
                        className="flex items-center gap-2 text-sm text-center tracking-widest bg-white px-1.5 py-0.5 shadow-md rounded-full"
                    >
                        Comming Info
                    </button>
                </div>
            );
        } else if (currentTime >= startTime && currentTime <= endTime) {
            return (
                <Link
                    key={exam._id}
                    to={`/exams/live/${exam.slug}/exam`}
                    state={exam}
                    className="card-sm flex justify-between items-center"
                >
                    <p>{exam.name}</p>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 text-sm text-center tracking-widest bg-white px-1.5 py-0.5 shadow-md rounded-full">
                            <div className="w-4 h-4 bg-[#F44336] shadow-md rounded-full"></div>
                            LIVE
                        </button>

                        <Link
                            to={`/exams/live/${exam.slug}/scoreboard`}
                            state={{
                                name: exam.name,
                                slug: exam.slug,
                                type: exam.type,
                            }}
                        >
                            <FaUsers className="w-5 h-5" />
                        </Link>
                    </div>
                </Link>
            );
        } else {
            return (
                <div
                    key={exam._id}
                    className="card-sm flex justify-between items-center"
                >
                    <p>{exam.name}</p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() =>
                                handleButtonClick(
                                    `Exam has ended at ${moment(endTime).format(
                                        "llll"
                                    )}`
                                )
                            }
                            className="flex items-center gap-2 text-sm text-center tracking-widest bg-white px-1.5 py-0.5 shadow-md rounded-full"
                        >
                            <div className="w-4 h-4 bg-[#F44336] shadow-md rounded-full"></div>
                            LIVE Ended
                        </button>
                        <Link
                            to={`/exams/live/${exam.slug}/scoreboard`}
                            state={{
                                name: exam.name,
                                slug: exam.slug,
                                type: exam.type,
                            }}
                        >
                            <FaUsers className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            );
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="card">
                <SectionTitle title={"সবার জন্য উন্মুক্ত"} />
                <div className="grid gap-2">
                    {exams && exams.length > 0 ? (
                        exams.map((exam) => renderExamStatus(exam))
                    ) : (
                        <p>No exams available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FreeExams;
