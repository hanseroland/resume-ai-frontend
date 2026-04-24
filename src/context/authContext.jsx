// src/context/AuthContext.js
import { createContext, useContext, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginUser, LogoutUser } from '../api/auth';
import { useUser } from '../hooks/useUser';

 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user, isLoading, isAuthenticated, clearUser } = useUser();


    // Mutation pour le Login
    const loginMutation = useMutation({
        mutationFn: LoginUser,
         onSuccess : async (response) => {
            // On met à jour le cache manuellement avec les données reçues
            queryClient.setQueryData(['authUser'], response.user || response);

            await queryClient.invalidateQueries({ queryKey: ['authUser'] });
            await queryClient.invalidateQueries();
            navigate('/');
        }
    });
    
   // Mutation pour le Logout
    const logoutMutation = useMutation({
        mutationFn: LogoutUser,
        onSettled: () => {
            clearUser(); // Vide le cache
            navigate('/connexion');
        }
    });



    const login = useCallback(async (data) => {
        return loginMutation.mutateAsync(data);
    }, [loginMutation]);

    const logout = useCallback(() => {
        logoutMutation.mutate();
    }, [logoutMutation]);

    return (
        <AuthContext.Provider
            value={{ 
                currentUser:user, 
                isAuthenticated, 
                loading:isLoading, 
                login, 
                logout,
                loginError: loginMutation.error
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
