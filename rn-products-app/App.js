import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  useEffect(() => {
    axios.get('http://192.168.1.33:4000/products')
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ürün Listesi</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price} ₺</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontFamily: 'Inter_700Bold', fontSize: 24, marginBottom: 12 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12
  },
  name: { fontFamily: 'Inter_700Bold', fontSize: 18 },
  price: { fontFamily: 'Inter_400Regular', fontSize: 16, marginVertical: 4 },
  desc: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#555' }
});
