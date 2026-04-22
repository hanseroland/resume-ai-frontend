import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
     DeleteResume,
     GetUserResumes,
     UpdateResumeColor,
     UpdateSummaryInfo
} from '../api/resumes';

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

     // 3. Mutation pour le résumé (Summary)
    // On passe un objet { resumeId, values } à la mutation
    const summaryMutation = useMutation({
        mutationFn: ({ resumeId, values }) => UpdateSummaryInfo(resumeId, values),
        onSuccess: (_, variables) => {
            // On utilise variables.resumeId pour cibler le bon cache
            queryClient.invalidateQueries(['resume', variables.resumeId]);
        },
    });

    // 4. Mutation pour la couleur/thème
    const themeMutation = useMutation({
        mutationFn: ({ resumeId, color }) => UpdateResumeColor(resumeId, { themeColor: color }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['resume', variables.resumeId]);
        }
    });

    return {
        resumes,
        isLoading,
        error,
        removeResume: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        // On expose les mutations
        updateSummary: summaryMutation.mutate,
        isUpdatingSummary: summaryMutation.isPending,
        updateTheme: themeMutation.mutate,
        isUpdatingTheme: themeMutation.isPending,
    };
};