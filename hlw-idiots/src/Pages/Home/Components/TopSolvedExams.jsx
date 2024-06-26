import { Link } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useTopSolvedExams from "../../../Hooks/useTopSolvedExams";

const TopSolvedExams = () => {
    const [topSolvedExams] = useTopSolvedExams();

    return (
        <div className="card">
            <SectionTitle title={"Most Solved Questions"} />

            <div className="grid grid-cols-3 gap-2">
                {topSolvedExams.slice(0, 6).map((collegeQuestion, index) => (
                    <Link
                        key={index}
                        to={`colleges/${collegeQuestion.college}/${collegeQuestion.subject}/${collegeQuestion.slug}`}
                        className="card-sm"
                    >
                        <h4 className="text-sm font-semibold">
                            {collegeQuestion.bnName}
                        </h4>
                        <p className="text-xs">{collegeQuestion.collegeName}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopSolvedExams;
