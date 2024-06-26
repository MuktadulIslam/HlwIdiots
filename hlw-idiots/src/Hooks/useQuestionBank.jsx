import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useQuestionBank = (subject, page) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading: isLoadingQuestionsBank, data: questionsBank = [], refetch: refetchQuestionsBank } = useQuery({
        queryKey: ['questionsBank'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`questions/bank/subject/${subject}?page=${page}&limit=10`);
            return response.data;
        }
    });

    return [questionsBank, isLoadingQuestionsBank, refetchQuestionsBank];
};

export default useQuestionBank;