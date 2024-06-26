import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useTags = () => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading: isLoadingTags, data: tags = [], refetch: refetchTags } = useQuery({
        queryKey: ['tags'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`tags`);
            return response.data;
        }
    });

    return [tags, isLoadingTags, refetchTags];
};

export default useTags;