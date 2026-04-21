import { apiClient } from "./fetchApi";

// Créer un nouvel utilisateur
export const RegisterUser = (userData) => 
    apiClient('/auth/register', {method:'POST', body:userData});
    

// Se connecter avec un utilisateur
export const LoginUser =  (loginData) => 
     apiClient('/auth/login', {method:'POST', body:loginData});


// Activer le compte utilisateur
export const activateUserAccount = async (token) =>  apiClient(`/auth/activate/${token}`);
   

// mot de passe oublié
export const ForgotPasswordRequest =  (userData) => 
      apiClient('/auth/forgot-password', {method:'POST', body:userData});
  

//Reset mot de passe oublié 
export const ResetUserPassword = (token, userData) => 
       apiClient(`/auth/reset-password/${token}`, {method:'PUT', body:userData});
 

// Se déconnecter 
export const LogoutUser = () =>  apiClient('/auth/logout', {method:'POST'});
  

// refresh token
export const refreshToken = () => 
    apiClient('/auth/refresh-token', { method: 'POST' });