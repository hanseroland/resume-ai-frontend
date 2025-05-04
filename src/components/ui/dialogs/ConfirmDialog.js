import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, title, description }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 4,
          padding: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease-in-out',
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold', fontSize: 18, color: '#333' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ fontSize: 16, color: '#555' }}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            color: '#ff4d4d',
            '&:hover': { backgroundColor: 'rgba(255, 77, 77, 0.1)' },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: '#007aff',
            '&:hover': { backgroundColor: '#005bb5' },
          }}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;