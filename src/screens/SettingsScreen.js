import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>
        Ayarlar Ekranı
      </Text>

      <View style={styles.row}>
        <Text style={[styles.settingText, darkMode && styles.darkText]}>
          Karanlık Mod
        </Text>
        <Button
          title={darkMode ? 'Kapat' : 'Aç'}
          onPress={() => setDarkMode(!darkMode)}
        />
      </View>

      <View style={styles.row}>
        <Text style={[styles.settingText, darkMode && styles.darkText]}>
          Bildirimler
        </Text>
        <Button title="Değiştir" onPress={() => alert('Bildirim ayarı')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#222',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  darkText: {
    color: 'white',
  },
  row: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 18,
  },
});

export default SettingsScreen;