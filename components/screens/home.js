// HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export function HomeScreen({ navigation }) {
    return (
        <View style={styles.view}>

            <Text style={styles.mainTitle}>
                Bienvenue sur RaceroomHUD
            </Text>
            <Button
                title="Porsche 911 GT3 R"
                onPress={() => navigation.navigate('Porsche911')}
                style={styles.buttons}
            />

        </View>
    );
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // Retire toute marge ou padding qui pourrait être là par défaut
    marginTop: 50,
    marginBottom: 50,
    padding: 0,
    textAlign: 'center',
  },

  view: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor: '#FFFFF0',
    flexDirection: 'columns',
  },

  buttons: {
    color: 'purple',
  },
});