import { Link, useLoaderData, useParams } from "react-router-dom";
import useTagsBySlug from "../../../Hooks/useTagsBySlug";
import useCollegeExams from "../../../Hooks/useCollegeExams";
import { useEffect, useState } from "react";
import useCollegeExamsSearching from "../../../Hooks/useCollegeExamsSearching";

const CollegeExamList = () => {
    const [searchText, setSearchText] = useState('');
    const subject = useLoaderData();
    const { collegeName, subjectName } = useParams();
    const [college] = useTagsBySlug(collegeName);
    const [collegeExams, , refetch] = searchText
    ? useCollegeExamsSearching(subjectName, collegeName, searchText)
    : useCollegeExams(subjectName, collegeName);

    useEffect(() => {
        refetch();
    }, [searchText, refetch]);

    return (
        <div>
            <div className="card">
                <div className="card-white text-center mb-5">
                    <p>{college.bnName}</p>
                    <h4 className="text-xl font-semibold">{subject.bnName} {subject.bnPaper}</h4>
                </div>

                <input type="text" className="w-full text-center bg-white px-4 py-2 mb-3 shadow-inner rounded-full outline-none" placeholder="Search by Name" onChange={e => setSearchText(e.target.value)} />

                <div className="grid gap-2">
                    {
                        collegeExams.map((item, index) => <Link to={`${item.slug}`} key={index} className="card-sm">
                            {item.bnName}
                        </Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default CollegeExamList;