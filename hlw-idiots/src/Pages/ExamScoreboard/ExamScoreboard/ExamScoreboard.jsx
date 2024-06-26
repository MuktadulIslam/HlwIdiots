import { useLocation } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useExamScoreboard from "../../../Hooks/useExamScoreboard";

const ExamScoreboard = () => {
    const location = useLocation();
    const name = location.state?.name;
    const type = location.state?.type;
    const slug = location.state?.slug;
    const [scoreboard, isLoading] = useExamScoreboard(slug);
    console.log(scoreboard);

    return (
        <div>
            <div className="card mb-3">
                <SectionTitle title={name} />
                <div className="flex justify-between items-center">
                    <p className="text-xs">
                        {type === "live" ? "Live" : "Rapid Fire"}
                    </p>
                    <p className="text-xs">Exam</p>
                </div>
            </div>

            <div className="bg-[#F44336] text-white text-center px-4 py-2 mb-5">
                {type === "live" ? "Live Exam" : "Rapid Fire"} : Todays Best
                Fighters
            </div>

            <div className="grid grid-cols-4 gap-3">
                {isLoading ||
                    scoreboard.map((topper, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                src={topper.profileImg}
                                alt=""
                                className="w-3/5 md:w-1/2 rounded-full"
                            />

                            <div className="text-center">
                                <h4 className="text-xs font-semibold mb-1">
                                    {topper.name}
                                </h4>
                                <p className="text-[10px]">{topper.college}</p>
                                <p className="text-xs">{topper.marks}</p>
                                <p className="text-xs">
                                    {topper?.duration > 0 &&
                                        `${topper?.duration} sec`}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ExamScoreboard;
