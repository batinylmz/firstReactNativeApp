/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import EditScreen from './src/screens/EditScreen';
import { UserProvider } from './src/context/UserContext';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{ title: 'Ana Sayfa' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} 
        options={{ title: 'Profil' }} />
        <Stack.Screen name="Settings" component={SettingsScreen}
        options={{ title: 'Ayarlar' }} />
        <Stack.Screen name="Edit" component={EditScreen}
        options={{ title: 'Kullanıcı Düzenle' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
export default App;
*/
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context'ler
import { AuthProvider, AuthContext } from './src/context/AuthContext';

import { FavoritesProvider } from './src/context/FavoritesContext';

// Ekranlar
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import EditScreen from './src/screens/EditScreen';
import { UserProvider } from './src/context/UserContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Giriş' }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Kullanıcı Yönetim Paneli' }}
            />

            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{ title: 'Favorilerim' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Profil' }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: 'Ayarlar' }}
            />
            <Stack.Screen
              name="Edit" // <-- Bu isim "Yeni Ekle" butonunda kullanacağımız isimdir
              component={EditScreen}
              options={{ title: 'Kullanıcı Düzenle' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <AuthProvider>

        <UserProvider>
          <FavoritesProvider>
            <AppNavigator />
          </FavoritesProvider>
        </UserProvider>

    </AuthProvider>
  );
}

export default App;