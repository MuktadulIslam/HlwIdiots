import { useQuery } from "@tanstack/react-query";

const useDistricts = () => {
    const { isLoading, data: districts = [] } = useQuery({
        queryKey: ["districts"],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/districts`
            );
            const data = await response.json();
            return data;
        },
    });

    return [districts, isLoading];
};

export default useDistricts;
