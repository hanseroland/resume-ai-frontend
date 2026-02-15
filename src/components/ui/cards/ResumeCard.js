import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, IconButton, Box, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Share, Article, Edit, MoreVertOutlined } from '@mui/icons-material';
import ConfirmDialog from '../dialogs/ConfirmDialog';

export default function ResumeCard({ resume, removeResume }) {

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);


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


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <Card
      elevation={2}
      sx={{
        maxWidth: 380,
        height: 270,
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
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            //onClick={handleOpenDialog}
            >
              {/*<Delete sx={{ color: '#ff4d4d' }} />*/}
              <MoreVertOutlined />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
              >
                <Link
                  to={`/resumes/${resume._id}/edit`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <ListItemIcon>
                    <Edit fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Edit</Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleOpenDialog}>
                <ListItemIcon>
                  <Delete color="error" fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Delete</Typography>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <Share fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Share</Typography>
              </MenuItem>
            </Menu>
          </div>

        }
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      />

      <Link
        to={`/resumes/${resume._id}/edit`}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 3,
          }}
        >
          <Box sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 100, sm: 120 },
            borderRadius: '16px',
            overflow: 'hidden',
            flexShrink: 0,
            bgcolor: '#e2e8f0'
          }}>
            <Box
              component="img"
              src={resume?.previewUrl || "/images/document_user_16750.png"}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </CardContent>
      </Link>
      {/*<CardActions
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
      </CardActions>*/}

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