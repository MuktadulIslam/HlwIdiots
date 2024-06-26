import { Link, useLoaderData, useParams } from "react-router-dom";
import AdminSectionTitle from "../../../AdminShared/AdminSectionTitle/AdminSectionTitle";
import useYears from "../../../Hooks/useYears";

const AdminBoardYears = () => {
    const { boardName } = useParams();
    const subject = useLoaderData();
    const [years] = useYears(boardName);

    return (
        <div>
            {/* section title */}
            <AdminSectionTitle title={`${subject.bnName} ${subject.bnPaper}`} />

            {/* sessions */}
            <div className="grid md:grid-cols-2 gap-2">
                {years.map((year, index) => (
                    <Link
                        to={`${year.slug}`}
                        key={index}
                        className="admin-widget"
                    >
                        <h4 className="text-lg font-semibold">{year.bnName}</h4>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminBoardYears;
