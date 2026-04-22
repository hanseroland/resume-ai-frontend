// src/api/index.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const apiClient = async (endpoint, { method = 'GET', body = null, isRetry = false } = {}) => {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Pour les cookies HttpOnly
    };


    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, options);

    // --- LOGIQUE DE REFRESH TOKEN ---
    // Si on reçoit une 401 et que ce n'est pas déjà une tentative de retry ou un login
    if (response.status === 401 && !isRetry && endpoint !== '/auth/login') {
        try {
            // 1. On appelle la route de rafraîchissement
            const refreshRes = await fetch(`${API_BASE_URL}/api/v1/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshRes.ok) {
                // 2. Si le rafraîchissement réussit, on rejoue la requête initiale
                // On passe isRetry: true pour éviter une boucle infinie
                return apiClient(endpoint, { method, body, isRetry: true });
            }
        } catch (error) {
            console.error("Erreur lors du silent refresh", error);
        }
        
        // 3. Si le refresh échoue (ex: Refresh Token expiré), on laisse l'erreur 401 passer
        // React Query ou le AuthContext redirigera vers /connexion
    }
    
    // On  parse le JSON, mais on gère le cas où la réponse est vide (ex: logout)
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        // React Query détecte l'échec
        throw new Error(data.message || "Une erreur est survenue");
    }

    return data;
};