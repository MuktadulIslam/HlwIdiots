import useAdminExams from "../../../Hooks/useAdminExams";
import ExamAddModal from "./Components/ExamAddModal";
import ExamTable from "./Components/ExamTable";

const AdminExams = () => {
    const [exams, isLoading, refetch] = useAdminExams();

    return (
        <div>
            <ExamAddModal 
                refetch={refetch} 
            />

            <ExamTable
                exams={exams.exams}
                isLoading={isLoading}
                refetch={refetch}
            />
        </div>
    );
};

export default AdminExams;