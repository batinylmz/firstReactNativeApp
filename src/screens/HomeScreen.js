/*
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { UserContext } from '../context/UserContext';

function HomeScreen({ navigation }) {
  const { users, loading } = useContext(UserContext);
  const [searchText, setSearchText] = useState('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Profile', { userId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.company?.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API'den Gelen Kullanıcılar</Text>

      <TextInput
        style={styles.input}
        placeholder="Kullanıcı ara..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Eşleşen kullanıcı bulunamadı.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: 'gray',
  },
});

export default HomeScreen;
*/
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';

function HomeScreen({ navigation }) {
  const { users, deleteUser } = useContext(UserContext);
  const { logout } = useContext(AuthContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const [search, setSearch] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  // Arama ve Sıralama (A-Z) kurallarını uyguluyoruz [cite: 54, 55, 56, 57]
  const filteredUsers = users
    .filter(u =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (!isSorted) return 0;
      return a.firstName.localeCompare(b.firstName);
    });

  const confirmDelete = id => {
    Alert.alert('Onay', 'Kullanıcı silinecektir. Emin misiniz?', [
      { text: 'Vazgeç', style: 'cancel' },
      { text: 'Sil', onPress: () => deleteUser(id), style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Toplam Kullanıcı Sayısı [cite: 39] */}
      <Text style={styles.headerTitle}>
        Toplam Kullanıcı: {filteredUsers.length}
      </Text>

      {/* Arama Alanı [cite: 55] */}
      <TextInput
        style={styles.searchInput}
        placeholder="Ad veya soyada göre ara..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.topButtons}>
        <Button
          title={isSorted ? 'Sıralamayı Kaldır' : 'A-Z Sırala'}
          onPress={() => setIsSorted(!isSorted)}
        />
        <Button
          title={`Favorilerim (${favorites.length})`}
          onPress={() => navigation.navigate('Favorites')}
          color="#f1c40f"
        />
        <Button
          title="Yeni Ekle"
          color="#2ecc71"
          onPress={() => navigation.navigate('Edit')}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isFav = favorites.find(f => f.id === item.id);
          return (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={styles.cardInfo}>
                <Text style={styles.userName}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text>{item.email}</Text>
                <Text>{item.phone}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <Text style={{ fontSize: 24 }}>{isFav ? '⭐' : '☆'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Edit', { user: item })}
                >
                  <Text style={styles.editLink}>Düzenle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <Text style={styles.deleteLink}>Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Çıkış Yap </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f0f2f5' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  avatar: { width: 55, height: 55, borderRadius: 27.5, marginRight: 12 },
  cardInfo: { flex: 1 },
  userName: { fontWeight: 'bold', fontSize: 16 },
  cardActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 70,
  },
  editLink: { color: '#3498db', fontWeight: 'bold' },
  deleteLink: { color: '#e74c3c', fontWeight: 'bold' },
  logoutBtn: {
    backgroundColor: '#34495e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});

export default HomeScreen;