import { Link, useLoaderData } from "react-router-dom";
import AdminSectionTitle from "../../../AdminShared/AdminSectionTitle/AdminSectionTitle";
import useSubjects from "../../../Hooks/useSubjects";

const AdminBoardSubjects = () => {
    const board = useLoaderData();
    const [subjects] = useSubjects();

    return (
        <div>
            {/* section title */}
            <AdminSectionTitle title={board.bnName} />

            {/* subjects */}
            <div className="grid md:grid-cols-2 gap-2">
                {subjects.map((subject, index) => (
                    <Link
                        to={`${subject.slug}`}
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

export default AdminBoardSubjects;
