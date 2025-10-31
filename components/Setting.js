import React from 'react'
import { Text, View, Button, TextInput, StyleSheet, Alert, Keyboard, TouchableOpacity } from 'react-native'

import { PortContext } from './context/PortContext'
import { useContext, useState, useEffect } from 'react';
import { NetworkInfo } from 'react-native-network-info';

export function Setting() {

    const { listeningPort, updateListeningPort } = useContext(PortContext)
    const [newPort, onChangePort] = React.useState('');

    const [ipAddress, setIpAddress] = useState(null);

    useEffect(() => {
        const fetchIp = async () => {
            try {
                // La fonction qui récupère l'adresse IPv4
                const ip = await NetworkInfo.getIPV4Address();
                setIpAddress(ip);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'IP :", error);
                setIpAddress("Non disponible");
            }
        };

        fetchIp();
    }, []);


    const savePort = () => {
        Keyboard.dismiss()

        if (!isNaN(newPort) && newPort >= 1024 && newPort <= 65535) {
            updateListeningPort(newPort)
            Alert.alert("Port d'écoute mis à jour")
        }
        else {
            Alert.alert("Erreur dans la mise à jour du port, il doit être compris entre 1024 et 65535.")
        }
    }

    return (
        <View style={styles.view}>
            <Text style={styles.title} adjustsFontSizeToFit={true}>Paramètres :</Text>
            <Text style={[styles.text, { top: '20%' }]}>Le port d'écoute est actuellement : <Text style={[styles.text,{fontWeight: 'bold'}]}>{listeningPort}</Text></Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePort}
                placeholder='ex de Port : 8888'
                keyboardType='numeric'
                onSubmitEditing={savePort}
                placeholderTextColor={'black'}
            />
            <TouchableOpacity
                style={styles.button} // Le style fonctionne sur TouchableOpacity !
                onPress={savePort}
            >
                <Text style={styles.buttonText}>Changer le port</Text>
            </TouchableOpacity>
            <Text style={[styles.text, { top: '65%', padding: 'none' }]} adjustsFontSizeToFit={true} numberOfLines={1}>Votre addresse IP sur le réseau est actuellement : <Text style={[styles.text,{fontWeight: 'bold'}]}>{ipAddress}</Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        height: 40,
        width: '40%',
        color: 'black',
        position: 'absolute',
        top: '35%'
    },

    view: {
        flex: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFF0',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        position: 'absolute',
        top: '5%',
    },

    text: {
        fontSize: 20,
        position: 'absolute',
    },

    button: {
        position: 'absolute',
        top: '50%',
        backgroundColor: '#e30303',
        borderRadius: 4,
        paddingHorizontal: 20
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFF0',

    }
})