import { Link } from "react-router-dom";
import MonthlyTopper from "../Components/MonthlyTopper";
import TopSolvedColleges from "../Components/TopSolvedColleges";
import TopSolvedExams from "../Components/TopSolvedExams";
import fireIcon from "../../../assets/images/icon/fire.png";

const Home = () => {
    return (
        <div className="grid gap-4 pb-4">
            {/* live exam & rapid fire button */}
            <div className="flex justify-between items-center">
                <Link to={"/live-exams"}>
                    <button className="flex items-center gap-2 text-sm text-center font-semibold bg-[#F44336] text-white px-3 py-2 shadow-md rounded-md">
                        Join LIVE exam
                        <div className="w-3 h-3 bg-white shadow-md rounded-full"></div>
                    </button>
                </Link>

                <button className="flex items-center gap-2 text-sm text-center font-semibold bg-[#D9D9D9] text-[#000000] px-3 py-2 shadow-md rounded-md">
                    আজকের Rapid Fire
                    {/* <FaFire className="w-5 h-5 text-[#F44336]" /> */}
                    <img src={fireIcon} alt="" className="w-5 h-5" />
                </button>
            </div>

            {/* Most Solved College */}
            <TopSolvedColleges />

            {/* monthly topper */}
            <MonthlyTopper />

            {/* Most Solved Questions */}
            <TopSolvedExams />
        </div>
    );
};

export default Home;
