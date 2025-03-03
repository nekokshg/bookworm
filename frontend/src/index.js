import React from 'react';
import ReactDOM from 'react-dom/client';  // Make sure to import from 'react-dom/client'
import App from './App';

// Create a root for the React app and render it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
