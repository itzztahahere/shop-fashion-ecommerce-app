import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { CartProvider } from './context/Cart';
import App from './App';
import { UserAuthProvider } from './context/userAuth'; // Correct import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider> {/* Only wrap App with Router here */}
        <UserAuthProvider>
          <App />
        </UserAuthProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>
);
