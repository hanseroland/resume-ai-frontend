import { Paper, Typography, Box } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { BarChart, XAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

const data = [
    { day: 'Lun', value: 40 },
    { day: 'Mar', value: 55 },
    { day: 'Mer', value: 45 },
    { day: 'Jeu', value: 80 },
    { day: 'Ven', value: 50 },
    { day: 'Sam', value: 35 },
    { day: 'Dim', value: 25 },
];

const WeeklyActivityCard = ({ weeklyData, performance }) => {
    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: '28px', border: '1px solid #f1f5f9', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Activité Hebdomadaire
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', mb: 3, display: 'block' }}>
                Évolution de la création de contenu
            </Typography>

            <Box sx={{ width: '100%', height: 220 }}>
                {/* Utilisation du mode responsive natif de Recharts 3 */}
                <BarChart
                    data={weeklyData.length > 0 ? weeklyData : data} // Utilise les données réelles ou les données de démonstration
                    responsive
                    style={{ width: '100%', height: '100%' }}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    {/* On cache l'axe Y  */}
                    <Tooltip
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    />
                    <Bar
                        dataKey="value"
                        fill="#bde0fe"
                        radius={[10, 10, 10, 10]}
                        barSize={24}
                        isAnimationActive={true}
                    />
                </BarChart>
            </Box>


            <Box sx={{
                mt: 2, p: 2, borderRadius: '20px', bgcolor: '#f0fff4',
                border: '1px solid #dcfce7'
            }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid size="auto">
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#22c55e', display: 'block' }}>
                            PERFORMANCE
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: performance.isPositive ? '#166534' : '#9f1239' }}>
                            {performance.isPositive ? '+' : ''}{performance.value}% cette semaine
                        </Typography>
                    </Grid>
                    <Grid size="auto">
                        <Box component="img" src="/images/chartincreasing.png" sx={{ width: 28 }} />
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default WeeklyActivityCard;