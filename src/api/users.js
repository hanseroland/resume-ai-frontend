import { axiosInstance, axiosInstanceUploade } from ".";

// Obtenir tous les utilisateurs
export const GetAllUsers = async () => {
    const response = await axiosInstance("get", "/users");
    return response;
};

// Obtenir tous les utilisateurs
export const GetTotalUsers = async () => {
    const response = await axiosInstance("get", "/users/count");
    return response;
};


// Obtenir tous les utilisateurs
export const GetTotalAdmins = async () => {
    const response = await axiosInstance("get", "/users/count/admins");
    return response;
};


// Obtenir tous les utilisateurs
export const GetTotalStandard = async () => {
    const response = await axiosInstance("get", "/users/count/standard");
    return response;
};

// Obtenir tous les récents
export const GetTotalRecentUsers = async () => {
    const response = await axiosInstance("get", "/users/recent");
    return response;
};

// Obtenir les informations d'un utilisateur par son ID
export const GetUserById = async (userId) => {
    const response = await axiosInstance("get", `/users/${userId}`);
    return response;
};

// Obtenir les informations d'un utilisateur par son email
export const GetUserByEmail = async (email) => {
    const response = await axiosInstance("get", `/users/email/${email}`);
    return response;
};

// Obtenir les informations de l'utilisateur en cours
export const GetCurrentUser = async () => {
    const response = await axiosInstance("get", "/users/current-user");
    return response;
};

// Mettre à jour les informations d'un utilisateur
export const UpdateUser = async (userId, updates) => {
    const response = await axiosInstance("put", `/users/${userId}`, updates);
    return response;
};

// Supprimer un utilisateur
export const DeleteUser = async (userId) => {
    const response = await axiosInstance("delete", `/users/${userId}`);
    return response;
};

// Ajouter des informations à un utilisateur existant
export const AddUserInfo = async (userData) => {
    const response = await axiosInstance("post", "/users", userData);
    return response;
};


// Ajouter des informations à un utilisateur existant 
export const AdminAddUser = async (userData) => {
    const response = await axiosInstance("post", "/users/add", userData);
    return response;
};

// Mettre à jour la photo de profil d'un utilisateur
export const UpdateProfilePicture = async (userId, photo) => {

    const response = await axiosInstanceUploade("put", `/users/update-picture/${userId}`, photo);
    return response;
};


