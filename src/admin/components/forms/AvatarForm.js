import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar, Box, CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { PhotoCamera, Upload } from '@mui/icons-material';
import { UpdateAvatar } from '../../../api/cards';

const AvatarForm = ({card}) => {

  const [uploading, setUploading] = useState(false);

  const cardId = card?.id

  //console.log("informations de la carte upload",card)

  const formik = useFormik({
    
    initialValues: {
        avatar: null
    },

    validationSchema: Yup.object({
      avatar: Yup.mixed().required('Avatar requis')
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('avatar', values.avatar);

      try {
        setUploading(true);
        const response = await UpdateAvatar(cardId,formData); 
        if(response.success){
           console.log("avatar téléchargé")
        }
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
      }
    }
  });

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
          <Avatar src={card.avatar} alt="avatar" sx={{width:100,height:100}} />
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="avatar">
              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue('avatar', event.currentTarget.files[0]);
                }}
              />
              <IconButton variant="contained" component="span">
                <PhotoCamera/>
              </IconButton>
            </label>
            {formik.errors.avatar ? <div>{formik.errors.avatar}</div> : null}
            <IconButton type="submit" variant="contained"  disabled={uploading}>
              {uploading ? <CircularProgress size={24} /> : <Upload/>}
            </IconButton>
          </form>
      </Box>
      
    </Box>
  );
};

export default AvatarForm;