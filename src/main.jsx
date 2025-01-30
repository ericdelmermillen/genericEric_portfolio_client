import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppContextProvider } from './contexts/AppContext.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);