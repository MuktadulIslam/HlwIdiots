import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useSubjectBySlug = (slug) => {
    const { apiRestriction } = useAuth();
    const { isLoading, data: subject = {} } = useQuery({
        queryKey: ["subject-slug"],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/subjects/${slug}`
            );
            const data = await response.json();
            return data;
        },
    });

    return [subject, isLoading];
};

export default useSubjectBySlug;
