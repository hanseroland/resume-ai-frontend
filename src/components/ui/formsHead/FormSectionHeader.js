import React, { useContext, useState } from 'react';
import { Box, Button, IconButton, Tooltip, Popover } from '@mui/material';
import { Apps, ArrowLeft, ArrowRight, Palette, Close } from '@mui/icons-material';
import { ResumeStyleContext } from '../../../context/ResumeStyleContext';
import SectionManager from './SectionManager';

const colors = ['#000', '#4CAF50', '#FFEB3B', '#F44336', '#2196F3', '#9C27B0', '#E91E63', '#795548'];

const FormSectionHeader = ({ activeFormIndex, setActiveFormIndex, enableNext }) => {
  // Gérer les couleurs
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const { setCvColor } = useContext(ResumeStyleContext); // Utilisation du contexte

  // Gérer le menu des couleurs
  const handleOpenColorMenu = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleCloseColorMenu = () => {
    setColorAnchorEl(null);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 2,
        mb: 2,
        borderTop: '4px solid rgb(86, 128, 236)',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        '@media (min-width:600px)': {
          flexDirection: 'row',
          justifyContent: 'space-between',
        }
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Tooltip title="Thèmes">
          <Button variant="outlined" startIcon={<Apps />} size="small" sx={{ textTransform: 'none' }}>
            Thèmes
          </Button>
        </Tooltip>

        <Tooltip title="Couleurs">
          <Button
            variant="outlined"
            startIcon={<Palette />}
            size="small"
            sx={{ textTransform: 'none' }}
            onClick={handleOpenColorMenu}
          >
            Couleurs
          </Button>
        </Tooltip>
      </Box>

      <SectionManager />

      <Popover
        anchorEl={colorAnchorEl}
        open={Boolean(colorAnchorEl)}
        onClose={handleCloseColorMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            flexWrap: 'wrap', // Permet de passer à la ligne si nécessaire
            maxWidth: '100%', // Limite la largeur pour éviter de sortir du cadre
          }}
        >
          {colors.map((color) => (
            <Tooltip title={color} key={color}>
              <IconButton
                onClick={() => { setCvColor(color); handleCloseColorMenu(); }}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: '2px solid white',
                  boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s ease',
                  },
                }}
              />
            </Tooltip>
          ))}
          <Tooltip title="Fermer">
            <IconButton onClick={handleCloseColorMenu}>
              <Close />
            </IconButton>
          </Tooltip>
        </Box>
      </Popover>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {activeFormIndex > 1 && (
          <Tooltip title="Retour">
            <Button
              variant="contained"
              startIcon={<ArrowLeft />}
              size="small"
              sx={{ textTransform: 'none' }}
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              Retour
            </Button>
          </Tooltip>
        )}

        <Tooltip title="Suivant">
          <Button
            variant="contained"
            endIcon={<ArrowRight />}
            size="small"
            sx={{ textTransform: 'none' }}
            disabled={!enableNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Suivant
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default FormSectionHeader;