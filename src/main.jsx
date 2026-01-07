import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, ThemeProvider, DashboardProvider } from './context';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </ThemeProvider>
  </AuthProvider>
);
