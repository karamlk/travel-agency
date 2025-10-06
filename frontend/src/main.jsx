import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import router from './router';
import { ContextProvider } from './contexts/contextprovider';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ContextProvider><RouterProvider router={router} /></ContextProvider>
      <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>
);
