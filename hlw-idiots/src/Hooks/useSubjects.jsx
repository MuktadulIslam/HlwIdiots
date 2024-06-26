import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useSubjects = () => {
    const { apiRestriction } = useAuth();
    const { isLoading, data: subjects = [] } = useQuery({
        queryKey: ["subjects"],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/subjects`
            );
            const data = await response.json();
            return data;
        },
    });

    return [subjects, isLoading];
};

export default useSubjects;
