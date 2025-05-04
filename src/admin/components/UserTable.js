import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteUser, GetAllUsers } from '../../api/users';
import { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCardIcon from '@mui/icons-material/AddCard';
import EditUserForm from './forms/EditUserForm';
import DialogModal from './DialogModal';
import AddCardForm from './forms/AddCardForm';



const UserTable = ({refreshTrigger,setRefreshTrigger}) => {

  const [usersInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement
  const [openModalForEdit, setOpenModalForEdit] = React.useState(false);
  const [openModalForCard, setOpenModalForCard] = React.useState(false);

  const [userData, setUserData] = React.useState(null);



  // Fonction pour récupérer les données
  const fetchUsers = async () => {
    setLoading(true); // Activer l'indicateur de chargement
    try {
      const response = await GetAllUsers();
     
      if(response.success){
        setUserInfo(
          response.data.map((user, index) => ({
            id: user._id || index, // Assurez-vous que chaque utilisateur a un ID unique
            name: user?.name,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            company: user?.company,
            jobTitle: user?.jobTitle,
          }))
        );
        //console.log(response.data)
      }
    
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    } finally {
      setLoading(false);
    }
  };

  //Fonction pour supprimer un utilisateur
  const deleteUser = async (id) => {
    try {
      const response = await DeleteUser(id);
      if(response.success){
        console.log("utilisateur supprimer")
        setRefreshTrigger(prev => !prev);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      alert('Une erreur est survenue.');
    }
  }

  //Ouvrir le modal pour modifier les données
  const editUser = async (values) => {
       // console.log("user data",values.row.id)
        setUserData(values.row)
        setOpenModalForEdit(true)
        
  }

   //Ouvrir le modal pour modifier les données
   const addUserCard = async (values) => {
    // console.log("user data",values.row.id)
     setUserData(values.row)
     setOpenModalForCard(true)  
  }




  // Charger les données lors du montage du composant
  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  


  const columns = [
  
    { field: 'name', headerName: 'Nom', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNumber', headerName: 'Téléphone', width: 200 },
    { field: 'company', headerName: 'Société', width: 200 },
    { field: 'jobTitle', headerName: 'Poste', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 170,
      renderCell: (params) => (
       
        <div>
          {/** Modifier*/}
          <IconButton
            color="primary" 
            onClick={()=>(editUser(params))} 
            style={{ marginRight: 8 }}
          >
             <EditIcon/>
          </IconButton>
          {/**Ajouter une carte */}
          <IconButton
            color="primary"
            onClick={()=>(addUserCard(params))} 
          >
             <AddCardIcon/>
          </IconButton>
          
          {/** Supprimer */}
          <IconButton
            color="error"
            onClick={() => deleteUser(params.row.id)}
          >
             <DeleteIcon/>
          </IconButton>
          
        </div>
      ),
    },
  ];
 

  return (
    <div>
      <Box sx={{height: '100%', width: '100%' }}>
        <DataGrid 
            rows={usersInfo} 
            columns={columns} 
            pageSize={20} 
            loading={loading} // Montre un indicateur de chargement          
          />
      </Box>
       
         <DialogModal
            openModal={openModalForEdit}
            setOpenModal={setOpenModalForEdit}
            title="Modifier un nouvel utilisateur"
            form={
              <EditUserForm
                user={userData}
                setOpenModal={setOpenModalForEdit}
                setRefreshTrigger={setRefreshTrigger}
              />
            }
      />
       <DialogModal
            openModal={openModalForCard}
            setOpenModal={setOpenModalForCard}
            title={`Ajouter une carte pour ${userData?.email}`}
            form={
              <AddCardForm
                user={userData}
                setOpenModalForCard={setOpenModalForCard}
                setRefreshTrigger={setRefreshTrigger}
              />
            }
      />
    </div>
  );
};

export default UserTable;
