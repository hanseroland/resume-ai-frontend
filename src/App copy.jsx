import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { createCustomTheme } from "./themes";

// Composants
import LandingPage from './components/LandingPage';
import ContactDetail from './components/ContactDetailPage/ContactDetail';
import SignUpPage from './components/connectionPages/signup/SignupPage';
import SigninPage from './components/connectionPages/signin/SigninPage';
import NotFoundPage from './components/ErrorPage/NotFoundPage';
import MainLayout from './components/Layouts/MainLayout';
import SimpleLayout from './components/Layouts/SimpleLayout';
import DashboardLayout from './admin/components/DashboardLayout';
import HomePage from './admin/pages/HomePage';
import UserManagementPage from './admin/pages/UserManagementPage';
import NFCManagementPage from './admin/pages/NFCManagementPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProfilPage from './admin/pages/ProfilPage';

function App() {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createCustomTheme(mode);

  // Utiliser "/nfc" en production et "/" en local
  const basename = process.env.NODE_ENV === 'production' ? '/nfc' : '/';

  return (
    <Provider  store={store} >
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={basename} >
        <Routes>
          {/* Section publique */}
          <Route element={<MainLayout mode={mode} toggleTheme={toggleTheme} />}>
            <Route index element={<LandingPage mode={mode} />} />
          </Route>
          
          {/* Section simple (sans Navbar/Dashboard) */}
          <Route element={<SimpleLayout />}>
            <Route path="/contact-detail/:nfcId" element={<ContactDetail mode={mode} toggleTheme={toggleTheme} />} />
            <Route path="/inscription" element={<SignUpPage mode={mode} toggleTheme={toggleTheme} />} />
            <Route path="/connexion" element={<SigninPage mode={mode} toggleTheme={toggleTheme} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          
          {/* Section Admin */}
          <Route element={<DashboardLayout mode={mode} toggleTheme={toggleTheme} />}>
            <Route path="/admin" element={<HomePage />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/nfc" element={<NFCManagementPage />} />
            <Route path="/admin/profile" element={<ProfilPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
    </Provider>
   
  );
}

export default App;
