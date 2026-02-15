import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    IconButton,
    Stack,
    Tooltip
} from '@mui/material';
import { formatDate } from '../../../services';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../dialogs/ConfirmDialog';

const ResumeDashCard = ({ resume, removeResume }) => {

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        removeResume(resume._id);
        handleCloseDialog();
    };

    // Styles pour le look "Soft & Rounded"
    const styles = {
        card: {
            p: { xs: 2, sm: 2.5 },
            borderRadius: '28px',
            border: '1px solid #f1f5f9',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            display: 'flex',
            gap: 2,
            position: 'relative',
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'translateY(-3px)' },
            width: '100%',
            maxWidth: { xs: '100%', sm: 460 },
        },
        imageBox: {
            width: { xs: 80, sm: 100 },
            height: { xs: 100, sm: 120 },
            borderRadius: '16px',
            overflow: 'hidden',
            flexShrink: 0,
            bgcolor: '#e2e8f0'
        },
        iconAction: {
            width: 32,
            height: 32,
            p: 0.5,
            borderRadius: '8px',
            transition: 'background 0.2s',
        }
    };

    return (
        <Paper elevation={0} sx={styles.card}>
            {/* 1. Image de l'aperçu du CV */}
            <Box sx={styles.imageBox}>
                <Box
                    component="img"
                    src={resume?.previewUrl || "/images/document_user_16750.png"}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>

            {/* 2. Contenu Textuel */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Chip
                    label={resume?.tag || "TECH"}
                    size="small"
                    sx={{
                        alignSelf: 'flex-start',
                        bgcolor: '#eef7ff',
                        color: '#0ea5e9',
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        borderRadius: '8px',
                        mb: 1
                    }}
                />

                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#334155', lineHeight: 1.2 }}>
                    {resume?.title || "CV Développeur Senior"}
                </Typography>

                <Typography variant="caption" sx={{ color: '#94a3b8', mt: 0.5 }}>
                    Dernière modif: {resume?.updatedAt ? formatDate(resume.updatedAt) : "Aucune date"}
                </Typography>

                {/* 3. Barre d'actions (Crayon & Download) */}
                <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 1 }}>
                    <Tooltip title="Modifier le CV" placement="bottom">
                        <Link
                            to={`/resumes/${resume._id}/edit`}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',


                            }}
                        >
                            <IconButton sx={{ ...styles.iconAction, bgcolor: '#f0f9ff', '&:hover': { bgcolor: '#e0f2fe' } }}>
                                <Box component="img" src="/images/edit_icon-icons.com_52382.png" sx={{ width: 18 }} />
                            </IconButton>
                        </Link>

                    </Tooltip>

                    <Tooltip title="Télécharger le CV" placement="bottom">
                        <IconButton

                            sx={{
                                ...styles.iconAction,
                                bgcolor: '#f0fdf4',
                                '&:hover': { bgcolor: '#dcfce7' }
                            }}
                        >
                            <Box component="img" src="/images/268426_download-icon.png" sx={{ width: 18 }} />
                        </IconButton>
                    </Tooltip>

                </Stack>
            </Box>

            {/* 4. Bouton Corbeille  */}
            <Tooltip title="Supprimer le CV" placement="bottom">
                <IconButton
                    onClick={handleOpenDialog}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        bottom: 16,
                        bgcolor: '#fff1f2',
                        borderRadius: '10px',
                        width: 32,
                        height: 32,
                        '&:hover': { bgcolor: '#ffe4e6' }
                    }}
                >
                    <Box component="img" src="/images/garbage_trash_bin_delete_icon_219499.png" sx={{ width: 16 }} />
                </IconButton>
            </Tooltip>

            {/* Dialog de confirmation de suppression */}
            <ConfirmDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
                title="Confirmer la suppression"
                description="Êtes-vous sûr de vouloir supprimer ce CV ? Cette action est irréversible."
            />
        </Paper>
    );
};

export default ResumeDashCard;