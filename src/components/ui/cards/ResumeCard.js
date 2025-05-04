import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Share, Article, Edit } from '@mui/icons-material';
import ConfirmDialog from '../dialogs/ConfirmDialog';

export default function ResumeCard({ resume, removeResume }) {

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



  return (
    <Card
      elevation={10}
      sx={{
        maxWidth: 380,
        borderRadius: 4,
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardHeader
        title={
          <Typography fontSize={16} fontWeight="bold" sx={{ color: '#333' }}>
            {resume.title}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Créé le : {new Date(resume.createdAt).toLocaleDateString('fr-FR')}
          </Typography>
        }
        action={
          <IconButton onClick={handleOpenDialog}>
            <Delete sx={{ color: '#ff4d4d' }} />
          </IconButton>
        }
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      />

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '50%',
          }}
        >
          <Article sx={{ fontSize: 48, color: '#555' }} />
        </Box>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Button
          component={Link}
          to={`/resumes/${resume._id}/edit`}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: '#007aff',
            '&:hover': { backgroundColor: '#005bb5' },
          }}
          startIcon={<Edit />}
        >
          Modifier
        </Button>

        <IconButton
          sx={{ color: '#333' }}
          onClick={() => alert('Partage non encore implémenté')}
        >
          <Share />
        </IconButton>
      </CardActions>

       {/* Dialog de confirmation de suppression */}
       <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirmer la suppression"
        description="Êtes-vous sûr de vouloir supprimer ce CV ? Cette action est irréversible."
      />
    </Card>
  );
}