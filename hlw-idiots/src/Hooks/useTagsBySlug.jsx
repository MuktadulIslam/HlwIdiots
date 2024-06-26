import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTagsBySlug = slug => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const url = typeof slug === 'string' 
    ? `tags/${slug}`
    : `tags/array/${slug}`
    const { isLoading, data: tag = {}, refetch } = useQuery({
        queryKey: [`${slug}`],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(url);
            return response.data;
        }
    });

    return [tag, isLoading, refetch];
};

export default useTagsBySlug;