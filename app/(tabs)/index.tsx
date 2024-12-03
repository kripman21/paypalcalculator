import React, { useState } from 'react';
import { StyleSheet, TextInput, Image, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Collapsible } from '@/components/Collapsible';

export default function TabTwoScreen() {
  const [value, setValue] = useState('');
  const [commission, setCommission] = useState('0'); // Estado para la comisión
  const [total, setTotal] = useState('0');

  const handleChange = (text: string) => {
    // Permite números y un solo punto decimal
    const numericValue = text.replace(/[^0-9.]/g, ''); // Permite números y puntos
    const parts = numericValue.split('.');
    
    // Asegura que solo haya un punto decimal
    if (parts.length > 2) {
      return; // Ignora el texto si hay más de un punto decimal
    }

    // Actualiza el valor
    setValue(numericValue);

    // Calcula el 5.4% y actualiza el estado de la comisión
    const numericValueFloat = parseFloat(numericValue) || 0; // Convierte a número
    const calculatedCommission = 1 - 0.054; // Calcula el 5.4%
    const calculatedTotal = (numericValueFloat + 0.30) / calculatedCommission;
    setCommission(calculatedCommission.toFixed(2)); // Actualiza el estado con dos decimales
    setTotal(numericValue ? calculatedTotal.toFixed(2) : '0'); // Actualiza el estado con dos decimales
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="arrow.down"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Para Recibir</ThemedText>
      </ThemedView>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        keyboardType="decimal-pad" // Muestra el teclado para decimales
        placeholder="Ingresa un número"
      /> 
      <ThemedText type="subtitle">Debes Enviar</ThemedText>
      <TextInput
        style={styles.input}
        value={total}
        editable={false}
        onChangeText={handleChange}
        keyboardType="numeric" // Muestra el teclado numérico
        placeholder="Ingresa un número"
      />
      <Collapsible title='Sobre las comisiones'>
        <ThemedText>- Las Comisiones son calculadas en base a un 5.4% + 0.30$ estipulado por Paypal</ThemedText>
        <ThemedText>- Las Comisiones son cubiertas por el receptor, mas no por el emisor</ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  }
});
