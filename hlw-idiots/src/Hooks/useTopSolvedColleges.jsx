import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTopSolvedColleges = () => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: topSolvedColleges = [], refetch } = useQuery({
        queryKey: ['top-solved-colleges'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`top-solved-colleges`);
            return response.data;
        }
    });

    return [topSolvedColleges, isLoading, refetch];
};

export default useTopSolvedColleges;