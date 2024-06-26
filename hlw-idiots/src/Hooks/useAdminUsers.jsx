import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: adminUsers = [], refetch } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const response = await axiosSecure.get("/admin-users");
            return response.data;
        }
    });

    return [adminUsers, isLoading, refetch];
};

export default useAdminUsers;