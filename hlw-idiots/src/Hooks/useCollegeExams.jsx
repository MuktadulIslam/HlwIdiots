import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCollegeExams = (subject, college) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading: isLoadingCollegeExams, data: collegeExams = [], refetch: refetchCollegeExams } = useQuery({
        queryKey: ['college-exams'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`tags/exams/${subject}/${college}`);
            return response.data;
        }
    });

    return [collegeExams, isLoadingCollegeExams, refetchCollegeExams];
};

export default useCollegeExams;