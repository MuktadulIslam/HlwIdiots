import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTopSolvedExams = () => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: topSolvedExams = [], refetch } = useQuery({
        queryKey: ['top-solved-exams'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`top-solved-exams`);
            return response.data;
        }
    });

    return [topSolvedExams, isLoading, refetch];
};

export default useTopSolvedExams;