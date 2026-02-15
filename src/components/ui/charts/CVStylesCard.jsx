import { Paper, Typography, Box } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

// On intègre la couleur directement dans l'objet de données
const dataPie = [
    { name: 'Créatifs', value: 311, fill: '#ffafcc' },
    { name: 'Modernes', value: 400, fill: '#bdf2d5' },
    { name: 'Classiques', value: 289, fill: '#a2d2ff' },
    { name: 'Exécutifs', value: 245, fill: '#dcd6ff' },
];

const CVStylesCard = () => {
    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: '28px', border: '1px solid #f1f5f9', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Styles de CV</Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', mb: 2, display: 'block' }}>Basé sur vos 30 derniers jours</Typography>

            <Box sx={{ width: '100%', height: 220, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={dataPie}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"
                            outerRadius="85%"
                            paddingAngle={8}
                            stroke="none"

                            cornerRadius={10}
                            isAnimationActive={true}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Total au centre */}
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b' }}>1245</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.6rem' }}>Total</Typography>
                </Box>
            </Box>


            <Grid container spacing={1} sx={{ mt: 1 }}>
                {dataPie.map((item) => (
                    <Grid size={{ xs: 6 }} key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.fill }} />
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>{item.name}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default CVStylesCard;