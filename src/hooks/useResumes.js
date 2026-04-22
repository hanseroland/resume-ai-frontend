import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteResume, GetUserResumes } from '../api/resumes';

export const useResumes = (userId) => {
    const queryClient = useQueryClient();

    // 1. Récupération des CV
    const { data: resumes, isLoading, error } = useQuery({
        queryKey: ['resumes', userId],
        queryFn: () => GetUserResumes(userId),
        enabled: !!userId, // Ne s'exécute que si on a un ID
        select: (response) => response.data || [], // On nettoie la data ici
    });

    // 2. Suppression d'un CV
    const deleteMutation = useMutation({
        mutationFn: DeleteResume,
        onSuccess: () => {
            // on force le rafraîchissement de la liste
            queryClient.invalidateQueries({ queryKey: ['resumes', userId] });
        },
    });

    return {
        resumes,
        isLoading,
        error,
        removeResume: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending
    };
};