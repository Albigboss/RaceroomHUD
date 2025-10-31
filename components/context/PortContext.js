import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//créer le context
export const PortContext = createContext();

//créer le provider
export const PortProvider = ({ children }) => {
    const [listeningPort, setListeningPort] = useState(8888);

    useEffect(() => {
        const loadPort = async () => {
            try {
                const savedPort = await AsyncStorage.getItem('listeningPort');
                if (savedPort !== null) {
                    setListeningPort(parseInt(savedPort, 10));
                }
            } catch (e) {
                console.error("Failed to load port from storage", e);
            }
        };

        loadPort();
    }, []);

    const updateListeningPort = async (newPort) => {
        const portNumber = parseInt(newPort, 10);
        if (!isNaN(portNumber)) {
            setListeningPort(portNumber);
        }
    }

    // On utilise useMemo pour l'optimisation
    const value = useMemo(() => ({
        listeningPort,
        updateListeningPort,
    }), [listeningPort]);

    return (
        <PortContext.Provider value={value}>
            {children}
        </PortContext.Provider>
    )

}
