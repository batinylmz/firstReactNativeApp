import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read: API'den 20 kullanıcı çekme
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=20')
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map(u => ({
          id: u.login.uuid,
          firstName: u.name.first,
          lastName: u.name.last,
          email: u.email,
          phone: u.phone,
          image: u.picture.large,
        }));
        setUsers(formatted);
        setLoading(false);
      })
      .catch(() => Alert.alert('Hata', 'Kullanıcılar yüklenemedi'));
  }, []);

  // Create: Yeni kullanıcı ekleme
  const addUser = newUser => setUsers([newUser, ...users]);

  // Update: Kullanıcı güncelleme
  const updateUser = updated => {
    setUsers(users.map(u => (u.id === updated.id ? updated : u)));
  };

  // Delete: Kullanıcı silme
  const deleteUser = id => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <UserContext.Provider
      value={{ users, loading, addUser, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
