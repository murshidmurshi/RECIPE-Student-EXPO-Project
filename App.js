import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, StatusBar } from 'react-native';
import {AuthProvider} from './Screen/AuthContext';
import MainNav from './Screen/MainNav';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#695549' />

      <AuthProvider>
       <MainNav />

      </AuthProvider>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
