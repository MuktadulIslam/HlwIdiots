import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useChapters = (subject) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading: isLoadingChapters, data: chapters = [], refetch: refetchChapters } = useQuery({
        queryKey: ['chapters'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`tags/chapters/subject/${subject}`);
            return response.data;
        }
    });

    return [chapters, isLoadingChapters, refetchChapters];
};

export default useChapters;