import { apiClient } from "./fetchApi";



/***
 * 
 * STATS
 */


// Obtenir tous les utilisateurs
export const GetGlobalStats =  () =>  apiClient("/users/stats/global", {method:'GET'});
    


// Obtenir tous les utilisateurs
export const GetTotalUsers =  () =>  apiClient("/users/count", {method:'GET'});
    

// Obtenir tous les récents
export const GetTotalRecentUsers =  () => apiClient("/users/recent", {method:'GET'});
    


// Obtenir tous les utilisateurs
export const GetTotalAdmins =  () =>  apiClient("/users/count/admins", {method:'GET'});
    


// Obtenir tous les utilisateurs
export const GetTotalStandard =  () => apiClient("/users/count/standard", {method:'GET'});
    





// Obtenir les informations d'un utilisateur par son email
export const GetUserByEmail =  (email) =>  apiClient(`/users/email/${email}`,{method:'GET'});
    




// Obtenir les informations de l'utilisateur en cours
export const GetCurrentUser =  () =>  apiClient("/users/current-user", {method:"GET"});




/****************
 * CRUD NORMAL
 ***************/

// Obtenir tous les utilisateurs
export const GetAllUsers =  () => apiClient("/users", {method:'GET'});
    



// Ajouter des informations à un utilisateur existant
export const AddUserInfo =  (userData) =>  apiClient("/", {method:'POST', body:userData});
    


// Obtenir les informations d'un utilisateur par son ID
export const GetUserById =  (userId) =>  apiClient(`/users/${userId}`, {method:'GET'});
    


// Mettre à jour les informations d'un utilisateur
export const UpdateUser =  (userId, updates) =>  apiClient(`/users/${userId}`, {method:'PUT',body:updates});
    



// Supprimer un utilisateur
export const DeleteUser =  (userId) =>  apiClient(`/users/${userId}`,{method:'DELETE'});
    


/***
 * UPLOAD FICHIERS
 */

// Mettre à jour la photo de profil d'un utilisateur
export const UpdateProfilePicture =  (userId, photo) => 

     apiClient(`/users/update-picture/${userId}`, {method:'PUT', body:photo});
    


