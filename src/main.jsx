import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // Nombre de tentatives en cas d'échec
            refetchOnWindowFocus: false, // Évite de re-fetch quand on change d'onglet
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
          <App />
    </QueryClientProvider>
  </React.StrictMode>
);

