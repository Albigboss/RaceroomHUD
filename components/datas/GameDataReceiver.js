// GameDataReceiver.js (ou temp.js)

import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native'; // On peut retirer View si on n'en a pas besoin
import dgram from 'react-native-udp';

const LISTEN_PORT = 8888;
const invisibleStyle = { display: 'none' };

// On déstructure les props pour récupérer chaque style individuellement
export default function GameDataReceiver({
    speedViewStyle = invisibleStyle,
    speedTextStyle = invisibleStyle,

    gearViewStyle = invisibleStyle,
    gearTextStyle = invisibleStyle,

    positionViewStyle = invisibleStyle,
    positionTextStyle = invisibleStyle,

    remainingFuelViewStyle = invisibleStyle,
    remainingFuelTextStyle = invisibleStyle,

    tcViewStyle = invisibleStyle,
    tcTextStyle = invisibleStyle,

    absViewStyle = invisibleStyle,
    absTextStyle = invisibleStyle,

    throttleViewStyle = invisibleStyle,
    throttleTextStyle = invisibleStyle,

    brakeViewStyle = invisibleStyle,
    brakeTextStyle = invisibleStyle,

    engineMapViewStyle = invisibleStyle,
    engineMapTextStyle = invisibleStyle,

    fuelPerLapViewStyle = invisibleStyle,
    fuelPerLapTextStyle = invisibleStyle,

    fuelCapacityViewStyle = invisibleStyle,
    fuelCapacityTextStyle = invisibleStyle,

    fuelLapViewStyle = invisibleStyle,
    fuelLapTextStyle = invisibleStyle,

    lapViewStyle = invisibleStyle,
    lapTextStyle = invisibleStyle,

    lapTimeViewStyle = invisibleStyle,
    lapTimeTextStyle = invisibleStyle,

    deltaBestLapViewStyle = invisibleStyle,
    deltaBestLapTextStyle = invisibleStyle,

    predTimeViewStyle = invisibleStyle,
    predTimeTextStyle = invisibleStyle,

    brakeBiasViewStyle = invisibleStyle,
    brakeBiasTextStyle = invisibleStyle,

    flTyrePressureViewStyle = invisibleStyle,
    flTyrePressureTextStyle = invisibleStyle,
    frTyrePressureViewStyle = invisibleStyle,
    frTyrePressureTextStyle = invisibleStyle,
    rlTyrePressureViewStyle = invisibleStyle,
    rlTyrePressureTextStyle = invisibleStyle,
    rrTyrePressureViewStyle = invisibleStyle,
    rrTyrePressureTextStyle = invisibleStyle,
    flTyreTemperatureViewStyle = invisibleStyle,
    flTyreTemperatureTextStyle = invisibleStyle,
    frTyreTemperatureViewStyle = invisibleStyle,
    frTyreTemperatureTextStyle = invisibleStyle,
    rlTyreTemperatureViewStyle = invisibleStyle,
    rlTyreTemperatureTextStyle = invisibleStyle,
    rrTyreTemperatureViewStyle = invisibleStyle,
    rrTyreTemperatureTextStyle = invisibleStyle,


}) {
    const [gameData, setGameData] = useState({
        speed: 0,
        gear: 'N',
        position: 0,
        remainingFuel: 999,
        tc: 12,
        abs: 12,
        throttle: 1,
        brake: 1,
        engineMap: 0,
        fuelPerLap: 9.99,
        fuelCapacity: 999,
        lap: 0,
        lapTime: 0,
        deltaBestLap: 0,
        bestLap: '--:--.---',
        brakeBias: 0,
        flTyrePressure: 9.99,
        flTyreTemperature: 999.9,
        frTyrePressure: 9.99,
        frTyreTemperature: 999.9,
        rlTyrePressure: 9.99,
        rlTyreTemperature: 999.9,
        rrTyrePressure: 9.99,
        rrTyreTemperature: 999.9,
    });

    useEffect(() => {
        const socket = dgram.createSocket('udp4');

        socket.on('message', (data, rinfo) => {
            const incomingMessage = data.toString().trim();
            try {
                const parsedData = JSON.parse(incomingMessage);
                setGameData(parsedData);
            } catch (e) {
                console.error("Erreur de parsing JSON:", e);
            }
        });

        socket.bind(LISTEN_PORT);
        return () => socket.close();
    }, []);

    // On retourne les éléments Text dans un "Fragment" (<>...</>)
    // Chacun utilise sa propre prop de style.
    return (
        <>
            <View style={speedViewStyle}>
                <Text style={speedTextStyle}>{gameData.speed}</Text>
            </View>
            <View style={gearViewStyle}>
                <Text style={gearTextStyle}>{(() => {
                    switch (gameData.gear) {
                        case -2:
                            return '-';
                        case -1:
                            return 'R';
                        case 0:
                            return 'N';
                        default:
                            return gameData.gear;
                    }
                })()}</Text>
            </View>
            <View style={positionViewStyle}>
                <Text style={positionTextStyle}>{gameData.position}</Text>
            </View>
            <View style={remainingFuelViewStyle}>
                <Text style={remainingFuelTextStyle} >{gameData.remainingFuel}</Text>
            </View>
            <View style={tcViewStyle}>
                <Text style={tcTextStyle} >{gameData.tc}</Text>
            </View>
            <View style={absViewStyle}>
                <Text style={absTextStyle} >{gameData.abs}</Text>
            </View>
            <View style={throttleViewStyle}>
                <Text style={throttleTextStyle} >{(((gameData.throttle) * 100).toFixed(0) || '--%')}</Text>
            </View>
            <View style={brakeViewStyle}>
                <Text style={brakeTextStyle} >{(((gameData.brake) * 100).toFixed(0) || '--%')}</Text>
            </View>
            <View style={engineMapViewStyle}>
                <Text style={engineMapTextStyle} >{gameData.engineMap}</Text>
            </View>
            <View style={fuelPerLapViewStyle}>
                <Text style={fuelPerLapTextStyle} >{gameData.fuelPerLap.toFixed(2)}</Text>
            </View>
            <View style={fuelCapacityViewStyle}>
                <Text style={fuelCapacityTextStyle} >{gameData.fuelCapacity.toFixed(0)}</Text>
            </View>
            <View style={fuelLapViewStyle}>
                <Text style={fuelLapTextStyle} >{((parseFloat(gameData.remainingFuel) / parseFloat(gameData.fuelPerLap)).toFixed(1)) + 'L'}</Text>
            </View>
            <View style={lapViewStyle}>
                <Text style={lapTextStyle} >{gameData.lap}</Text>
            </View>
            <View style={lapTimeViewStyle}>
                <Text style={lapTimeTextStyle} >{
                    (() => {
                        const duration = gameData.lapTime;
                        const minutes = Math.floor(duration / 60);
                        const seconds = Math.floor(duration % 60);
                        const milliseconds = Math.round((duration - Math.floor(duration)) * 1000);

                        // On formate avec des zéros devant si besoin
                        const mm = String(minutes).padStart(2, '0');
                        const ss = String(seconds).padStart(2, '0');
                        const mmm = String(milliseconds).padStart(3, '0');
                        return mm + ':' + ss + '.' + mmm;
                    })()
                }</Text>
            </View>
            <View style={deltaBestLapViewStyle}>
                <Text style={[deltaBestLapTextStyle, { color: parseFloat(gameData.deltaBestLap) > 0 ? 'red' : 'green' }]} >
                    {(parseFloat(gameData.deltaBestLap) < 0 ? '-' : '+') + gameData.deltaBestLap.toFixed(3)}
                </Text>
            </View>
            <View style={predTimeViewStyle}>
                <Text style={predTimeTextStyle} >{
                    isNaN(parseFloat(gameData.bestLap) + parseFloat(gameData.deltaBestLap)) ? '--:--.---' : (() => {
                        //parseFloat(gameData.bestLap) + parseFloat(gameData.deltaBestLap)
                        const predictedTime = gameData.bestLap + gameData.deltaBestLap;
                        const minutes = Math.floor(predictedTime / 60);
                        const seconds = Math.floor(predictedTime % 60);
                        const milliseconds = Math.round((predictedTime - Math.floor(predictedTime)) * 1000);

                        // On formate avec des zéros devant si besoin
                        const mm = String(minutes).padStart(2, '0');
                        const ss = String(seconds).padStart(2, '0');
                        const mmm = String(milliseconds).padStart(3, '0');
                        return mm + ':' + ss + '.' + mmm;
                    })()}
                </Text>
            </View>
            <View style={brakeBiasViewStyle}>
                <Text style={brakeBiasTextStyle} >{(gameData.brakeBias * 100).toFixed(0)}</Text>
            </View>

            <View style={flTyrePressureViewStyle}>
                <Text style={flTyrePressureTextStyle} >{gameData.flTyrePressure}</Text>
            </View>
            <View style={flTyreTemperatureViewStyle}>
                <Text style={flTyreTemperatureTextStyle} >{gameData.flTyreTemperature + '°C'}</Text>
            </View>

            <View style={frTyrePressureViewStyle}>
                <Text style={frTyrePressureTextStyle} >{gameData.frTyrePressure}</Text>
            </View>
            <View style={frTyreTemperatureViewStyle}>
                <Text style={frTyreTemperatureTextStyle} >{gameData.frTyreTemperature + '°C'}</Text>
            </View>

            <View style={rlTyrePressureViewStyle}>
                <Text style={rlTyrePressureTextStyle} >{gameData.rlTyrePressure}</Text>
            </View>
            <View style={rlTyreTemperatureViewStyle}>
                <Text style={rlTyreTemperatureTextStyle} >{gameData.rlTyreTemperature + '°C'}</Text>
            </View>

            <View style={rrTyrePressureViewStyle}>
                <Text style={rrTyrePressureTextStyle} >{gameData.rrTyrePressure}</Text>
            </View>
            <View style={rrTyreTemperatureViewStyle}>
                <Text style={rrTyreTemperatureTextStyle} >{gameData.rrTyreTemperature + '°C'}</Text>
            </View>
        </>
    );
}