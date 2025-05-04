import React from 'react'
import { Box } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import ResumeDialog from './dialogs/ResumeDialog';
import ResumeNameForm from '../forms/ResumeNameForm';


function AddResumeBtn({setResumeCreated}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


  return (
    <Box component="div">
        <Box 
            component="div"
            onClick={handleClickOpen}
            py={14}
            p={4}
            border={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="150px"
            width="150px"
            borderRadius="10px"
            sx={{
                borderColor:"#efefef",
                backgroundColor:"#efefef",
                transition: 'all 0.3s ease-in-out',
                cursor:"pointer",
                '&:hover': {
                    transform: "scale(1.05)",
                    transition: "0.3s ease",
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
                    
            },
            }}
        
        >
            <AddCircle/>
        </Box>
        <ResumeDialog
          title="Créer nouveau CV"
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          content={
          <ResumeNameForm 
            setOpenDialog={setOpen} 
            setResumeCreated={setResumeCreated}
          />
          }
          
        
        />
    </Box>
  )
}

export default AddResumeBtn