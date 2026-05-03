/*import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { UserContext } from '../context/UserContext';

function EditScreen({ route, navigation }) {
  const { userId } = route.params;
  const { users, updateUser } = useContext(UserContext);

  const user = users.find((item) => item.id === userId);

  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const handleUpdate = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      name: name,
      email: email,
    };

    updateUser(updatedUser);
    navigation.goBack();
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Kullanıcı bulunamadı</Text>
        <Button title="Geri dön" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kullanıcı Düzenle</Text>

      <TextInput
        style={styles.input}
        placeholder="Ad girin"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-posta girin"
        value={email}
        onChangeText={setEmail}
      />

      <Button title="Kaydet" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },
});

export default EditScreen;

*/

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { UserContext } from '../context/UserContext'; // CRUD işlemleri için UserContext

function EditScreen({ route, navigation }) {
  // route.params üzerinden gelen veriyi kontrol ediyoruz
  const userToEdit = route.params?.user;
  const isEditMode = !!userToEdit; // Eğer user gelmişse 'Düzenle', gelmemişse 'Ekle' modundayız

  const { addUser, updateUser } = useContext(UserContext);

  // Ödev Maddesi: Ad, Soyad, Email, Telefon alanları için state'ler [cite: 27-31]
  const [firstName, setFirstName] = useState(
    isEditMode ? userToEdit.firstName : '',
  );
  const [lastName, setLastName] = useState(
    isEditMode ? userToEdit.lastName : '',
  );
  const [email, setEmail] = useState(isEditMode ? userToEdit.email : '');
  const [phone, setPhone] = useState(isEditMode ? userToEdit.phone : '');

  const handleSave = () => {
    // KURAL: Alanlardan biri boşsa kullanıcı eklenmemeli/güncellenmemeli [cite: 32, 33]
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    // KURAL: Email formatı kontrol edilmelidir [cite: 34]
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Hata', 'Geçerli bir email adresi giriniz.');
      return;
    }

    const userData = {
      id: isEditMode ? userToEdit.id : Math.random().toString(), // Yeni kullanıcı için geçici ID
      firstName,
      lastName,
      email,
      phone,
      image: isEditMode ? userToEdit.image : 'https://via.placeholder.com/150', // Varsayılan resim [cite: 36]
    };

    if (isEditMode) {
      updateUser(userData); // KURAL: Güncelle butonuna basınca ana listedeki kullanıcı güncellenmeli [cite: 47]
      Alert.alert('Başarılı', 'Kullanıcı güncellendi.');
    } else {
      addUser(userData); // KURAL: Ekle butonuna basınca yeni kullanıcı listeye eklenmeli [cite: 35]
      Alert.alert('Başarılı', 'Kullanıcı eklendi.');
    }

    // KURAL: İşlem sonrası ana ekrana dönülmelidir [cite: 48]
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        {isEditMode ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ad:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Soyad:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-posta:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefon:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={{ marginTop: 20, marginBottom: 40 }}>
        <Button
          title={isEditMode ? 'Güncelle' : 'Ekle'}
          onPress={handleSave}
          color="#2ecc71"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5, color: '#333', fontWeight: '600' },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default EditScreen;