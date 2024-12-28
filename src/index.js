 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import './styles/index.css';
 import AppRouter from './routes/AppRouter';
 import { FavoritesProvider } from './context/FavoritesContext';
 import { CompareProvider } from './context/CompareContext';
 
 
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
   <React.StrictMode>
       <CompareProvider>
          <FavoritesProvider>
             <AppRouter />
           </FavoritesProvider>
         </CompareProvider>
   </React.StrictMode>
 );