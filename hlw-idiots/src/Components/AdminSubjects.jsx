import { Link } from "react-router-dom";
import useSubjects from "../Hooks/useSubjects";

const AdminSubjects = () => {
    const [subjects] = useSubjects();

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-2">
                {subjects.map((subject, index) => (
                    <Link
                        to={`${subject.slug}/0`}
                        key={index}
                        className="admin-widget"
                    >
                        <h4 className="text-lg font-semibold">
                            {subject.bnName}
                        </h4>
                        <p className="text-sm">{subject.bnPaper}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminSubjects;
