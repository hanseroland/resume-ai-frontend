import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar, Box, CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { PhotoCamera, Upload } from '@mui/icons-material';
import { GetCurrentUser, UpdateProfilePicture } from '../../../api/users';
import { SetCurrentUser } from '../../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

const ProfilPictureForm = ({user,setSuccess}) => {

  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();


  const userId = user?._id

  //console.log("informations de la carte upload",user)

  const formik = useFormik({
    
    initialValues: {
        profilePicture: null
    },

    validationSchema: Yup.object({
        profilePicture: Yup.mixed().required('Photo requise')
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('profilePicture', values.profilePicture);

      try {
        setUploading(true);
        const response = await UpdateProfilePicture(userId,formData); 
        if(response.success){
            getCurrentUser()
           console.log("photo téléchargée")
        }
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
      }
    }
  });

   const getCurrentUser = useCallback(async () => {
     // console.log("on est dans dasboard")
      try {
        const response = await GetCurrentUser();
       // console.log("Current user dash", response)
        if (response.success) {
          dispatch(SetCurrentUser(response.data));
          setSuccess(true)
        }
      } catch (error) {
        console.log("erreur de connexion")
      }
    }, [dispatch,setSuccess]);

  const Input = styled('input')({
    display: 'none'
  });

 
  return (
    <Box 
      mb={1}  
      display="flex"
      justifyContent="center"
    >
      <Box p={1} >
          <Avatar src={user.profilePicture} alt="profilePicture" sx={{width:100,height:100}} />
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="profilePicture">
              <Input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue('profilePicture', event.currentTarget.files[0]);
                }}
              />
              <IconButton variant="contained" component="span">
                <PhotoCamera/>
              </IconButton>
            </label>
            {formik.errors.profilePicture ? <div>{formik.errors.profilePicture}</div> : null}
            <IconButton type="submit" variant="contained"  disabled={uploading}>
              {uploading ? <CircularProgress size={24} /> : <Upload/>}
            </IconButton>
          </form>
      </Box>
      
    </Box>
  );
};

export default ProfilPictureForm;