import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBoards = () => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading: isLoadingBoards, data: boards = [], refetch: refetchBoards } = useQuery({
        queryKey: ['boards'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get("tags/boards");
            return response.data;
        }
    });

    return [boards, isLoadingBoards, refetchBoards];
};

export default useBoards;