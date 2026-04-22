// src/api/index.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
// src/api/index.js

let refreshPromise = null; // Singleton pour éviter les refreshs parallèles

const attemptRefresh = () => {
    if (!refreshPromise) {
        refreshPromise = fetch(`${API_BASE_URL}/api/v1/auth/refresh-token`, {
            method: 'POST',
            credentials: 'include',
        }).finally(() => {
            refreshPromise = null; // Réinitialisation après succès ou échec
        });
    }
    return refreshPromise;
};

const PUBLIC_ROUTES = [
    '/auth/login',
    '/auth/register',
    '/auth/activate',
    '/auth/forgot-password',
    '/auth/reset-password',
];

export const apiClient = async (endpoint, { method = 'GET', body = null, isRetry = false } = {}) => {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    };

    // Correction : null check strict au lieu de falsiness
    if (body !== null) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, options);

    const isPublicRoute = PUBLIC_ROUTES.some(route => endpoint.startsWith(route));

    // Logique de refresh token
    if (response.status === 401 && !isRetry && !isPublicRoute) {
        try {
            const refreshRes = await attemptRefresh();

            if (refreshRes.ok) {
                // Retry de la requête originale après refresh réussi
                return apiClient(endpoint, { method, body, isRetry: true });
            }
        } catch (err) {
            console.error('Erreur critique lors du refresh :', err);
        }

        // Refresh échoué → on notifie l'app et on throw immédiatement
        // sans tenter de lire le body de la réponse 401 originale
        window.dispatchEvent(new Event('auth:logout'));

        const error = new Error('Session expirée, veuillez vous reconnecter.');
        error.status = 401;
        error.response = { data: {} };
        throw error;
    }

    // Lecture sécurisée du body
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(data.message || 'Une erreur est survenue');
        error.status = response.status;
        error.response = { data };
        throw error;
    }

    return data;
};