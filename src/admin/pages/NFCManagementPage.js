import React from 'react';
import NFCTable from '../components/NFCTable';
import { Box, Typography } from '@mui/material';
import DialogModal from '../components/DialogModal';
import AddCardForm from '../components/forms/AddCardForm';

const NFCManagementPage = () => {
   const [openModal, setOpenModal] = React.useState(false);
  const [refreshTrigger, setRefreshTrigger] = React.useState(false); //pour rafraichir le tableau
   
  return (
    <Box >
       <Box display="flex" justifyContent="space-between"  mb={2}>
       <Typography variant="h5" mb={3}>
        Gestion des cartes NFC
      </Typography>
         
      </Box>
      <NFCTable 
        refreshTrigger={refreshTrigger}
        setRefreshTrigger={setRefreshTrigger}
      />
      <DialogModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Ajouter une carte à un utilisateur"
        form={<AddCardForm/>}
      />
    </Box>
  );
};

export default NFCManagementPage;
