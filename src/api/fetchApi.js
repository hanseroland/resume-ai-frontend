// src/api/index.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const apiClient = async (endpoint, { method = 'GET', body = null } = {}) => {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Indispensable pour tes cookies HttpOnly
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    // On essaie de parser le JSON, mais on gère le cas où la réponse est vide (ex: logout)
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        // C'est ici que React Query détecte l'échec
        throw new Error(data.message || "Une erreur est survenue");
    }

    return data;
};