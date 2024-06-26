import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useExamQuestions = (questionIds) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const {
        isLoading,
        data: examQuestions = [],
        refetch,
    } = useQuery({
        queryKey: ["examQuestions"],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.post(`questions/exam`, {
                questionIds: questionIds,
            });
            return response.data;
        },
    });

    return [examQuestions, isLoading, refetch];
};

export default useExamQuestions;
