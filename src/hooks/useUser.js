import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetCurrentUser } from '../api/users';

export const useUser = () => {
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ['authUser'],
        queryFn: GetCurrentUser,
        retry: false, // On ne réessaie pas si le cookie est absent/invalide
        staleTime: 1000 * 60 * 10, // L'info est considérée "fraîche" pendant 10min
    });

    // Fonction pour vider le cache lors du logout
    const clearUser = () => {
        queryClient.setQueryData(['authUser'], null);
    };

    return {
        user: user?.data || null,
        isLoading,
        isAuthenticated: !!user?.data,
        error,
        clearUser
    };
};