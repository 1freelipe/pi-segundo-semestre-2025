import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// eslint-disable-next-line
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('auth_user_data');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    localStorage.setItem('auth_user_data', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('auth_user_data');
    localStorage.removeItem('user_token');
    setUser(null);
  };
  return (
    // eslint-disable-next-line
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
