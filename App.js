import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LogBox } from "react-native";//remove later
//Screens
import Header from './Shared/Header';
import ProductContainer from './Screens/Products/ProductContainer';

LogBox.ignoreAllLogs(true);


export default function App() { 
  return (
    <View style={styles.container}>
        <Header></Header>
        <ProductContainer></ProductContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
