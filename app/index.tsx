import React, { useEffect } from 'react'; // 1. On importe useEffect
import * as ScreenOrientation from 'expo-screen-orientation';
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { useKeepAwake } from 'expo-keep-awake';

import { PortProvider } from '../components/context/PortContext';
import  {Setting}  from '../components/Setting'

//gestion de l'import des écrans :
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../components/screens/home';
import { Porsche911GT3R } from '../components/screens/cars/porsche911GT3R'

const Stack = createNativeStackNavigator();


export default function Index() {

  //useEffect pout lancer le code au chargement
  useEffect(() => {

    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }

    changeScreenOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    }

  }, []);// le tableau vide pour lancer l'effet qu'une seule fois

  useKeepAwake();

  return (
    <PortProvider>
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <Stack.Navigator initialRouteName="Home"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Porsche911" component={Porsche911GT3R} />
          <Stack.Screen name="Settings" component={Setting} />
        </Stack.Navigator>
      </View>
    </PortProvider>
  );
}

const styles = StyleSheet.create({
  // Le conteneur qui prend tout l'écran
  container: {
    flex: 1, // TRÈS IMPORTANT: prend toute la hauteur disponible
  },
});