import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// AuthContext'i içeri alıyoruz
import { AuthContext } from '../context/AuthContext';

function ProfileScreen({ navigation }) {
  // Giriş yapmış kullanıcıyı AuthContext'ten çekiyoruz
  const { currentUser } = useContext(AuthContext);

  // Eğer kullanıcı verisi henüz yüklenmediyse veya yoksa hata vermemesi için kontrol
  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Kullanıcı bulunamadı</Text>
        <Button title="Geri dön" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil Ekranı</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Ad:</Text>
        {/* DummyJSON API 'firstName' ve 'lastName' kullanır */}
        <Text style={styles.value}>{currentUser.firstName} {currentUser.lastName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Kullanıcı Adı:</Text>
        <Text style={styles.value}>{currentUser.username}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>E-Posta:</Text>
        <Text style={styles.value}>{currentUser.email}</Text>
      </View>

      {/* Düzenle Butonu */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Düzenle"
          onPress={() => navigation.navigate('Edit', { user: currentUser })}
        />
      </View>

      <View style={styles.buttonArea}>
        <Button title="Geri dön" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: 'gray',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  buttonArea: {
    marginTop: 20,
  },
});

export default ProfileScreen;