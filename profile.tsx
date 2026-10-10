import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(previousState => !previousState);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {/* Header */}
      <View style={[styles.header, isDarkMode ? styles.darkHeader : styles.lightHeader]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode ? styles.darkText : styles.lightText]}>User Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <Text style={[styles.name, isDarkMode ? styles.darkText : styles.lightText]}>Angelee</Text>
        <Text style={styles.email}>angelee1312@gmail.com</Text>
      </View>

      {/* Theme Changing Switch Section */}
      <View style={[styles.settingCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>
            {isDarkMode ? '🌙 Dark Mode Active' : '☀️ Light Mode Active'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#ff5722' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  lightContainer: { backgroundColor: '#f5f5f5' },
  darkContainer: { backgroundColor: '#121212' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  lightHeader: { backgroundColor: '#fff', borderBottomColor: '#eee' },
  darkHeader: { backgroundColor: '#1e1e1e', borderBottomColor: '#333' },

  backButton: { backgroundColor: '#6c757d', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  backButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 20 },

  card: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  lightCard: { backgroundColor: '#fff' },
  darkCard: { backgroundColor: '#1e1e1e' },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#888', marginTop: 4 },

  settingCard: {
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: { fontSize: 16, fontWeight: '600' },

  lightText: { color: '#333' },
  darkText: { color: '#fff' },
});