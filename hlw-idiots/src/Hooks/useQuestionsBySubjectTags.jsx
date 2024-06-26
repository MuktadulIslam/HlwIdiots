import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useQuestionsBySubjectTags = (subject, tags) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const {
        isLoading: isLoadingQuestions,
        data: questions = [],
        refetch: refetchQuestions,
    } = useQuery({
        queryKey: ["questions"],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.post(`questions/subject/tags`, {
                subject: subject,
                tags: tags,
            });
            return response.data;
        },
    });

    return [questions, isLoadingQuestions, refetchQuestions];
};

export default useQuestionsBySubjectTags;
