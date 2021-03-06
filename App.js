import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { LogBox } from "react-native";//remove later
import { NavigationContainer } from '@react-navigation/native';
//redux
import {Provider} from 'react-redux';
import store from './Redux/store';
//Navigators
import Main from './Navigators/Main';

//Screens
import Header from './Shared/Header';
//import ProductContainer from './Screens/Products/ProductContainer';

LogBox.ignoreAllLogs(true);


export default function App() { 
  return (
    <Provider store={store}>


    <NavigationContainer>
          
          <Header />
          <Main />
    </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
