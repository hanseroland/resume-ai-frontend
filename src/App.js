import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResumeLayout from './components/Layouts/ResumeLayout';
import Home from './pages/Home';
import Resumes from './pages/Resumes';
import Profile from './pages/Profile';
import { Provider } from 'react-redux';
import store from './redux/store';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SimpleLayout from './components/Layouts/SimpleLayout';
import EditResume from './pages/EditResume';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './context/authContext';
import { Box, CircularProgress, Typography } from '@mui/material';
import ResumeView from './pages/ResumeView';


function App() {

  // Utiliser "/nfc" en production et "/" en local
  const basename = process.env.PUBLIC_URL || '/';


  return (

    <Provider store={store} >
      <Router>
        <AuthProvider>
          <Routes>

            {/* Section simple (sans Navbar/Dashboard) */}
            <Route element={<SimpleLayout />}>
              <Route path="/inscription" element={<SignupPage />} />
              <Route path="/connexion" element={<SignInPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            {/* Section Admin */}
            <Route element={<ResumeLayout />}>
              <Route index element={<Home />} />
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/resumes/:resumeId/edit" element={<EditResume />} />
              <Route path="/my-resume/:resumeId/view" element={<ResumeView />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </Provider>



  );
}

export default App;
