import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useBooks = () => {
    const { apiRestriction } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { isLoading: isLoadingBooks, data: books = [], refetch: refetchBooks } = useQuery({
        queryKey: ['books'],
        enabled: !apiRestriction,
        queryFn: async () => {
            const response = await axiosSecure.get("tags/books");
            return response.data;
        }
    });

    return [books, isLoadingBooks, refetchBooks];
};

export default useBooks;