import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, IconButton } from '@mui/material';
import { DeleteCard, GetCards } from '../../api/cards';
import EditCardForm from './forms/EditCardForm';
import DialogModal from './DialogModal';
import NFCProfileCard from './NFCProfileCard';
import FullScreenDialog from './FullScreenDialog';

 

const NFCTable = ({ refreshTrigger, setRefreshTrigger }) => {

  const [cardInfo, setCardInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Pour gérer l'état de chargement
  const [openModalForEdit, setOpenModalForEdit] = React.useState(false);
  const [cardData, setCardData] = React.useState(null);

  const [openCard, setOpenCard] = React.useState(null);



  // Fonction pour récupérer les données
  const fetchCards = async () => {
    setLoading(true); // Activer l'indicateur de chargement
    try {
      const response = await GetCards();

      if (response.success) {
       // console.log("cards", response.data)
        // Ajout d'un champ `id` si nécessaire
        const formattedData = response.data.map((card, index) => ({
          id: card.id || card._id || index, // Utilisez `id` ou `_id` ou un index comme fallback
          ...card,
        }));

        setCardInfo(formattedData);

        //console.log(response.data)
      }

    } catch (error) {
      console.error('Erreur lors de la récupération des cartes:', error);
    } finally {
      setLoading(false);
    }
  };

  //Fonction pour supprimer un utilisateur
  const deleteCard = async (id) => {
    try {
      const response = await DeleteCard(id);
      if (response.success) {
        //console.log("Carte supprimée")
        setRefreshTrigger(prev => !prev);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la carte :', error);
      alert('Une erreur est survenue.');
    }
  }

  //Ouvrir le modal pour modifier les données
  const editCard = async (values) => {
    // console.log("user data",values.row.id)
    setCardData(values.row)
    setOpenModalForEdit(true)

  }

  //Ouvrir le modal pour afficher les données
  const showCard = async (values) => {
   console.log("card data",values.row)
    setCardData(values.row)
    setOpenCard(true)

  }


  // Charger les données lors du montage du composant
  useEffect(() => {
    fetchCards();
  }, [refreshTrigger]);


  const columns = [
    { field: 'name', headerName: 'Nom', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'position', headerName: 'Poste', width: 150 },
    { field: 'company', headerName: 'Entreprise', width: 200 },
    {
      field: 'nfcId',
      headerName: 'ID NFC',
      width: 150,
    },
    { 
      field: 'activated', 
      headerName: 'Activée',
     // valueGetter: (params) => (params.row?.activated ? 'Oui' : 'Non'), 
      width:100 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      renderCell: (params) => (
        <div>
          {/** Modifier*/}
          <IconButton
            color="primary"
            onClick={() => (editCard(params))}
            style={{ marginRight: 8 }}
          >
            <EditIcon />
          </IconButton>
          {/** Voir les détails */}

          <IconButton
            color="primary"
            onClick={() => (showCard(params))}
          >
            <VisibilityIcon />
          </IconButton>

          {/** Supprimer */}
          <IconButton
            color="error"
            onClick={() => deleteCard(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>

        </div>
      ),
    },
  ];




  return (
    <div>
      <Box  sx={{height: '100%', width: '100%' }}>
          <DataGrid
            rows={cardInfo}
            columns={columns}
            pageSize={20}
            loading={loading} // Montre un indicateur de chargement

          />
      </Box>
     

      <DialogModal
        openModal={openModalForEdit}
        setOpenModal={setOpenModalForEdit}
        title="Modifier la carte"
        form={
          <EditCardForm
            card={cardData}
            setOpenModal={setOpenModalForEdit}
            setRefreshTrigger={setRefreshTrigger}
          />
        }
      />
     {/*<DialogModal
        openModal={openCard}
        setOpenModal={setOpenCard}
        title="Carte"
        form={<NFCProfileCard data={cardData} />}
      />*/}
      <FullScreenDialog
        openModal={openCard}
        setOpenModal={setOpenCard}
        title="Carte"
        component={<NFCProfileCard data={cardData} />}
      />
    </div>
  );
};

export default NFCTable;
