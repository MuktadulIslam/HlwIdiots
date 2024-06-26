import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useExamScoreboard = (slug) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {
        isLoading,
        data: scoreboard = [],
        refetch,
    } = useQuery({
        queryKey: ["exam-scoreboard"],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`exam-scoreboard/${slug}`);
            return response.data;
        },
    });

    return [scoreboard, isLoading, refetch];
};

export default useExamScoreboard;
