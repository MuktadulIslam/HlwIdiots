import { useLoaderData } from "react-router-dom";
import AdminSectionTitle from "../../../AdminShared/AdminSectionTitle/AdminSectionTitle";
import AdminSubjects from "../../../Components/AdminSubjects";

const AdminQuestionBank = () => {
    const totalQuestions = useLoaderData();

    return (
        <div>
            {/* section title */}
            <AdminSectionTitle
                title={`Question Bank (Total Questions: ${totalQuestions.result})`}
            />

            {/* subjects */}
            <AdminSubjects />
        </div>
    );
};

export default AdminQuestionBank;
