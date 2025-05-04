import React from 'react';
import UserTable from '../components/UserTable';
import { Box, Button, Typography } from '@mui/material';
import DialogModal from '../components/DialogModal';
import AddUserForm from '../components/forms/AddUserForm';

const UserManagementPage = () => {

  const [openModal, setOpenModal] = React.useState(false);

  const [refreshTrigger, setRefreshTrigger] = React.useState(false); //pour rafraichir le tableau


  

  return (
    <Box>
        <Box display="flex" justifyContent="space-between"  mb={2}>
             <Typography variant="h5" mb={3}>
              Gestion des utilisateurs
            </Typography>
         <Button
           variant="contained"
           color="primary"
           size="small"
           onClick={()=>setOpenModal(true)}
           sx={{textTransform:'none',fontSize:12}}
         >
            Nouvel utilisateur
         </Button>
      </Box>
      <UserTable 
        refreshTrigger={refreshTrigger}
        setRefreshTrigger={setRefreshTrigger}
      />

      <DialogModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Ajouter un nouvel utilisateur"
        form={<AddUserForm setOpenModal={setOpenModal} setRefreshTrigger={setRefreshTrigger} />}
        
      />
      
    </Box>
  );
};

export default UserManagementPage;
