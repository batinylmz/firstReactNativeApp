/*
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      setCurrentUser({ username: 'admin' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
*/

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // KULLANICIYI GÜNCELLEYEN FONKSİYON
  const updateUser = updatedData => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      ...updatedData, // Yeni gelen bilgileri eskilerin üzerine yazar
    }));
  };
  const login = async (username, password) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data?.message || 'Giriş başarısız.',
        };
      }

      setIsLoggedIn(true);
      setCurrentUser(data);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Sunucuya bağlanılamadı.',
      };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        setCurrentUser,
        setIsLoggedIn,
        updateUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
