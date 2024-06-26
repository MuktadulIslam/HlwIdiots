import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import Subjects from "../../../Components/Subjects";
import { useLoaderData } from "react-router-dom";

const CollegeSubjects = () => {
    const college = useLoaderData();

    return (
        <div>
            <div className="card">
                <SectionTitle title={college.bnName} />

                <Subjects tag={college.slug} />
            </div>
        </div>
    );
};

export default CollegeSubjects;
