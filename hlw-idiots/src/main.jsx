import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import Router from './Routes/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Providers/AuthProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={Router} />
                </QueryClientProvider>
            </AuthProvider>
        </HelmetProvider>
    </React.StrictMode>
)