/**
 * mainMVVM.jsx - Entry point para aplicação MVVM
 * Inicializa a aplicação React com arquitetura MVVM
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppMVVM from './AppMVVM.jsx';
import './styles.css';

// Validação da arquitetura MVVM em desenvolvimento
if (process.env.NODE_ENV === 'development') {
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppMVVM />
  </React.StrictMode>,
);