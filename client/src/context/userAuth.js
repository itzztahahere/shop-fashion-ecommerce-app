import React, { createContext, useContext, useState, useEffect } from 'react';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  const login = (userDetails) => {
    setIsLoggedIn(true);
    setUser(userDetails);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('user', JSON.stringify(userDetails));
  };

  

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    // Optional: Validate session or user role on first render
  }, []);

  return (
    <UserAuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUser = () => useContext(UserAuthContext);
