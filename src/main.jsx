import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppContextProvider } from './contexts/AppContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient/queryClient.js';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const isDev = import.meta.env.VITE_NODE_ENV === "development";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>

      {isDev ? <ReactQueryDevtools /> : null}
      
    </QueryClientProvider>
  </React.StrictMode>,
);