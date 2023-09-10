import React from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';
import AppRotas from './src/rotas/AppRotas.js';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <AppRotas />
    </SafeAreaView>
  );
}
