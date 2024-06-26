import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdminExamBySlug = (slug) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: exam = {}, refetch } = useQuery({
        queryKey: [`exam-${slug}`],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`exams/slug/${slug}`);
            return response.data;
        }
    });

    return [exam, isLoading, refetch];
};

export default useAdminExamBySlug;