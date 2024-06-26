import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCollegeExamsSearching = (subject, college, searchText) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading: isLoadingCollegeExams, data: collegeExams = [], refetch: refetchCollegeExams } = useQuery({
        queryKey: ['college-exams'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`tags/exams/${subject}/${college}/${searchText}`);
            return response.data;
        }
    });

    return [collegeExams, isLoadingCollegeExams, refetchCollegeExams];
};

export default useCollegeExamsSearching;