import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTagsByType = type => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: tags = [], refetch } = useQuery({
        queryKey: [`tags${type}`],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`tags/${type}`);
            return response.data;
        }
    });

    return [tags, isLoading, refetch];
};

export default useTagsByType;