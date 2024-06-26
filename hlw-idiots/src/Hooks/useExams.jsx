import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useExams = (type, privilege) => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {
        isLoading,
        data: exams = [],
        refetch,
    } = useQuery({
        queryKey: ["exams"],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(
                `exams/type/${type}/${privilege}`
            );
            return response.data;
        },
    });

    return [exams, isLoading, refetch];
};

export default useExams;
