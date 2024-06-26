import { Link } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useTopSolvedColleges from "../../../Hooks/useTopSolvedColleges";

const TopSolvedColleges = () => {
    const [topSolvedColleges] = useTopSolvedColleges();

    return (
        <div className="card">
            <SectionTitle title={"Most Solved College"} />

            <div className="grid gap-2">
                {topSolvedColleges.slice(0, 3).map((college, index) => (
                    <Link
                        to={`/colleges/${college.slug}`}
                        key={index}
                        className="card-sm"
                    >
                        {college.bnName}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopSolvedColleges;
