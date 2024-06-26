import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdminExams = () => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: exams = [], refetch } = useQuery({
        queryKey: ['exams'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get("exams");
            return response.data;
        }
    });

    return [exams, isLoading, refetch];
};

export default useAdminExams;