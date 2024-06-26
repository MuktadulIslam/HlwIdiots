import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useYears = board => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading: isLoadingYears, data: years = [], refetch: refetchYears } = useQuery({
        queryKey: ['years'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`tags/years/${board}`);
            return response.data;
        }
    });

    return [years, isLoadingYears, refetchYears];
};

export default useYears;