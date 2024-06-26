import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { isLoading, data: isAdmin = false } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`/admin-users/${user?.email}`);
            return response.data;
        }
    });

    return [isAdmin, isLoading];
};

export default useAdmin;