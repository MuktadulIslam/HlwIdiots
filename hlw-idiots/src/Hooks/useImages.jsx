import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useImages = (page, limit) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: images = [], refetch } = useQuery({
        queryKey: ['images'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`media?page=${page}&limit=${limit}`);
            return response.data;
        }
    });

    return [images, isLoading, refetch];
};

export default useImages;