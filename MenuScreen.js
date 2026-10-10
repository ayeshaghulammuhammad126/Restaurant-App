import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const SAMPLE_MENU = [
  { id: '1', name: 'Zinger Burger', price: '$5.99', category: 'Fast Food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
  { id: '2', name: 'Pepperoni Pizza', price: '$12.49', category: 'Italian', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200' },

  
  { id: '5', name: 'Chicken Biryani', price: '$6.50', category: 'Pakistani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200' },

  { id: '7', name: 'Club Sandwich', price: '$4.99', category: 'Fast Food', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200' },
 
  { id: '9', name: 'Chocolate Lava Cake', price: '$4.50', category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200' },
  { id: '10', name: 'Ice Cream Sundae', price: '$3.99', category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200' },
  
  { id: '12', name: 'Chicken Karahi', price: '$11.99', category: 'Pakistani', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200' },
  { id: '13', name: 'Hot Coffee', price: '$2.50', category: 'Beverages', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200' },
  { id: '14', name: 'Fresh Lime', price: '$1.75', category: 'Beverages', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200' },
  { id: '15', name: 'Cheese Burger', price: '$5.49', category: 'Fast Food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
  { id: '16', name: 'Chicken Alfredo', price: '$9.99', category: 'Italian', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=200' },
 
  { id: '18', name: 'Chicken Broast', price: '$6.99', category: 'Fast Food', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200' },
  { id: '19', name: 'Brownie', price: '$5.00', category: 'Desserts', image: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=200' },

];

export default function MenuScreen() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  };

  const decreaseQty = (id) => {
    setCartItems(prev => {
      return prev.map(i => {
        if (i.id === id) {
          if (i.qty === 1) return null; // delete if 1 se kam
          return { ...i, qty: i.qty - 1 };
        }
        return i;
      }).filter(Boolean);
    });
  };

  const deleteItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // PROFILE SCREEN
  if (currentScreen === 'profile') {
    return (
      <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <View style={[styles.header, isDarkMode ? styles.darkHeader : styles.lightHeader]}>
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('menu')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDarkMode ? styles.darkText : styles.lightText]}>User Profile</Text>
          <View style={{width: 60}} />
        </View>
        <View style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
          <Text style={[styles.name, isDarkMode ? styles.darkText : styles.lightText]}>Angelee</Text>
          <Text style={styles.email}>angelee1312@gmail.com</Text>
        </View>
        <View style={[styles.settingCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>{isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</Text>
            <Switch trackColor={{ false: '#767577', true: '#ff5722' }} thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'} onValueChange={() => setIsDarkMode(p => !p)} value={isDarkMode} />
          </View>
        </View>
      </View>
    );
  }

  // CART SCREEN
  if (currentScreen === 'cart') {
    return (
      <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <View style={[styles.header, isDarkMode ? styles.darkHeader : styles.lightHeader]}>
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('menu')}>
            <Text style={styles.buttonText}>Back to Menu</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDarkMode ? styles.darkText : styles.lightText]}>My Cart ({cartCount})</Text>
          <View style={{width: 60}} />
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}><Text style={styles.emptyText}>Cart is empty</Text></View>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <View style={[styles.cardItem, isDarkMode ? styles.darkCard : styles.lightCard]}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={[styles.itemName, isDarkMode ? styles.darkText : styles.lightText]}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price} x {item.qty} = ${(item.price * item.qty).toFixed(2)}</Text>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity style={styles.qtyButton} onPress={() => decreaseQty(item.id)}><Text style={styles.qtyText}>-</Text></TouchableOpacity>
                      <Text style={[styles.qtyCount, isDarkMode ? styles.darkText : styles.lightText]}>{item.qty}</Text>
                      <TouchableOpacity style={styles.qtyButton} onPress={() => increaseQty(item.id)}><Text style={styles.qtyText}>+</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
            <View style={[styles.totalCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
              <Text style={[styles.totalText, isDarkMode ? styles.darkText : styles.lightText]}>Total: ${totalPrice.toFixed(2)}</Text>
              <TouchableOpacity style={styles.confirmButton} onPress={() => {
                Alert.alert('Order Confirmed', `Your order of $${totalPrice.toFixed(2)} is confirmed!`);
                setCartItems([]);
                setCurrentScreen('menu');
              }}>
                <Text style={styles.buttonText}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }

  // MENU SCREEN
  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={[styles.header, isDarkMode ? styles.darkHeader : styles.lightHeader]}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/')}><Text style={styles.buttonText}>Logout</Text></TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode ? styles.darkText : styles.lightText]}>Restaurant Menu</Text>
        <View style={styles.rightNav}>
          <TouchableOpacity style={styles.profileButton} onPress={() => setCurrentScreen('profile')}><Text style={styles.buttonText}>Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={() => setCurrentScreen('cart')}><Text style={styles.buttonText}>Cart ({cartCount})</Text></TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={SAMPLE_MENU}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={[styles.cardItem, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={[styles.itemName, isDarkMode ? styles.darkText : styles.lightText]}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}><Text style={styles.buttonText}>Add</Text></TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  lightContainer: { backgroundColor: '#f9f9f9' },
  darkContainer: { backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingTop: 45, paddingBottom: 15, borderBottomWidth: 1 },
  lightHeader: { backgroundColor: '#fff', borderBottomColor: '#eee' },
  darkHeader: { backgroundColor: '#1e1e1e', borderBottomColor: '#333' },
  rightNav: { flexDirection: 'row', gap: 8 },
  logoutButton: { backgroundColor: '#6c757d', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  navButton: { backgroundColor: '#6c757d', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  profileButton: { backgroundColor: '#17a2b8', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  cartButton: { backgroundColor: '#dc3545', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  listContainer: { padding: 15, paddingBottom: 40 },
  cardItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 12, elevation: 2 },
  lightCard: { backgroundColor: '#fff' },
  darkCard: { backgroundColor: '#1e1e1e' },
  itemImage: { width: 65, height: 65, borderRadius: 8, marginRight: 15 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemCategory: { fontSize: 13, color: '#777', marginTop: 2 },
  itemPrice: { fontSize: 15, fontWeight: '600', color: '#ff5722', marginTop: 4 },
  addButton: { backgroundColor: '#28a745', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  card: { alignItems: 'center', padding: 20, borderRadius: 12, margin: 20, elevation: 2 },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#ff5722', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#888', marginTop: 4 },
  settingCard: { padding: 20, borderRadius: 12, marginHorizontal: 20 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingText: { fontSize: 16, fontWeight: '600' },
  lightText: { color: '#333' },
  darkText: { color: '#fff' },
  emptyCart: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#888' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  qtyButton: { backgroundColor: '#eee', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 18, fontWeight: 'bold' },
  qtyCount: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 4 },
  deleteButton: { backgroundColor: '#ff4444', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, marginLeft: 8 },
  totalCard: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#eee' },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  confirmButton: { backgroundColor: '#28a745', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
});