import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import BASE_URL from '../api/config';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, getTotalPrice, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          menuItemId: item._id,
          quantity: item.quantity,
        })),
        orderType: 'Dine-in',
      };

      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Order Placed!', 'Your order was submitted successfully.', [
          { text: 'OK', onPress: () => { clearCart(); navigation.navigate('Menu'); } }
        ]);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to place order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart Items</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Rs. {item.price * item.quantity}</Text>
            </View>
            <View style={styles.qtyContainer}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item._id, -1)}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{item.quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item._id, 1)}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: Rs. {getTotalPrice()}</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f8f9fa' },
  header: { fontSize: 22, fontWeight: 'bold', marginTop: 35, marginBottom: 15 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#e63946', marginTop: 4 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { backgroundColor: '#ddd', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  qtyText: { fontSize: 18, fontWeight: 'bold' },
  qtyNum: { marginHorizontal: 10, fontSize: 16, fontWeight: 'bold' },
  footer: { borderTopWidth: 1, borderColor: '#eee', paddingTop: 15, marginTop: 10 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  checkoutBtn: { backgroundColor: '#e63946', padding: 15, borderRadius: 8, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});