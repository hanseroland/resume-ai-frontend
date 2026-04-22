import { useQuery } from '@tanstack/react-query';
import { 
  GetLatestUserResumes, 
  CountUserResume, 
  CountAllResume, 
  CountAllResumeByWeeklyActivity, 
  CountAllResumeByWeeklyPerformance 
} from '../api/resumes';
import { GetTotalUsers, GetTotalAdmins } from '../api/users';

export const useDashboardData = (userId) => {
  // 1. CV Récents
  const latestResumes = useQuery({
    queryKey: ['resumes', 'latest', userId],
    queryFn: () => GetLatestUserResumes(userId),
    enabled: !!userId,
    select: (res) => res.data || [],
  });

  // 2. Statistiques Globales (Compteurs)
  const stats = useQuery({
    queryKey: ['dashboard', 'counts', userId],
    queryFn: async () => {
      const [userRes, allRes, totalUsersRes, adminsRes] = await Promise.all([
        CountUserResume(userId),
        CountAllResume(),
        GetTotalUsers(),
        GetTotalAdmins()
      ]);
      return {
        user: userRes.count || 0,
        all: allRes.count || 0,
        users: totalUsersRes.count || 0,
        admins: adminsRes.count || 0
      };
    },
    enabled: !!userId,
  });

  // 3. Activité Hebdomadaire
  const weeklyActivity = useQuery({
    queryKey: ['dashboard', 'weekly-activity'],
    queryFn: CountAllResumeByWeeklyActivity,
    select: (res) => res.data || [],
    initialData: { data: [] } //fournit une structure initiale
  });

  // 4. Performance
  const performance = useQuery({
    queryKey: ['dashboard', 'performance'],
    queryFn: CountAllResumeByWeeklyPerformance,
    select: (res) => ({
      value: res.performance || 0,
      isPositive: res.performance >= 0
    }),
    initialData: { performance: 0 }
  });

  return {
    latestResumes,
    stats,
    weeklyActivity,
    performance,
    isLoading: latestResumes.isLoading || stats.isLoading || weeklyActivity.isLoading || performance.isLoading
  };
};