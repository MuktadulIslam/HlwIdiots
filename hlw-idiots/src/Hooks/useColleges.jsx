import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useColleges = () => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading: isLoadingColleges, data: colleges = [], refetch: refetchColleges } = useQuery({
        queryKey: ['colleges'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get("tags/colleges");
            return response.data;
        }
    });

    return [colleges, isLoadingColleges, refetchColleges];
};

export default useColleges;