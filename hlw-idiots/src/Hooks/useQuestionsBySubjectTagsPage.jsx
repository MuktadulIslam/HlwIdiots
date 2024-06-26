import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useQuestionsBySubjectTagsPage = (subject, tags, page) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const subjectQuery = subject ? `subject=${subject}` : '';
    const tagsQuery = tags.map(tag => `&tag=${tag}`).join('');

    const { isLoading: isLoadingQuestions, data: filterQuestions = [], refetch: refetchQuestions } = useQuery({
        queryKey: ['filterQuestions'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`questions/filter?${subjectQuery}${tagsQuery}&page=${page}&limit=10`);
            return response.data;
        }
    });

    return [filterQuestions, isLoadingQuestions, refetchQuestions];
};

export default useQuestionsBySubjectTagsPage;