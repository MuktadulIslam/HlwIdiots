import { Link } from "react-router-dom";
import useColleges from "../../../Hooks/useColleges";

const Colleges = () => {
    const [colleges] = useColleges();

    return (
        <div>
            <div className="card">
                <input type="text" className="w-full text-center bg-white px-4 py-2 mb-3 shadow-inner rounded-full outline-none" placeholder="Search by Name" />

                <div className="grid gap-2">
                    {
                        colleges.map((college, index) => <Link to={`/colleges/${college.slug}`} key={index} className="card-sm">
                            {college.bnName}
                        </Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Colleges;