import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBarComponent from './AppBarComponent';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentUser } from '../../api/users';
import { SetCurrentUser } from '../../redux/slices/userSlice';
import ContactPageIcon from '@mui/icons-material/ContactPage';



const ResumeLayout = () => {


  const { currentUser } = useSelector(state => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const getCurrentUser = useCallback(async () => {
   // console.log("on est dans dasboard")
    try {
      const response = await GetCurrentUser();
     // console.log("Current user dash", response)
      if (response.success) {
        dispatch(SetCurrentUser(response.data));
      } else {
        localStorage.removeItem("token");
        navigate('/connexion');
      }
    } catch (error) {
      console.log("erreur de connexion")
    }
  }, [dispatch, navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/connexion');
  }, [navigate]);


  useEffect(() => { 
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate('/connexion');
    }
  }, [getCurrentUser, navigate]);



  const links = [
    { text: 'Tableau de bord', path: '/', icon: <HomeIcon /> },
    { text: 'Resumes', path: '/resumes', icon: <ContactPageIcon /> },
    { text: 'Profile', path: '/profile', icon: <PersonIcon/> },
  ];
  
    const [open, setOpen] = useState(false);
  
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

   
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarComponent 
        title="Resume AI"
        open={open} 
        drawerWidth={240} 
        handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar 
        
        open={open} 
        handleDrawerClose={handleDrawerClose} 
        links={links}
    
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default ResumeLayout;


