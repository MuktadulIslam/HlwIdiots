import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
    const { user, apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { isLoading, data: userData = {} } = useQuery({
        queryKey: ['userData', user?.email],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/${user?.email}`);
            return response.data;
        }
    });

    return [userData, isLoading];
};

export default useUserData;