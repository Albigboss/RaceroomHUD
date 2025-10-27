// GameDataReceiver.js (ou temp.js)

import React, { useState, useEffect } from 'react';
import dgram from 'react-native-udp';
import DataDisplay from './dataDisplayer/DataDisplay'

const LISTEN_PORT = 8888;
const invisibleStyle = { display: 'none' };
const defaultConfig = {
    position: null, // Si la position est null, on ne l'affiche pas
    textStyle: {},
    baseFontSize: 0
};

// On déstructure les props pour récupérer chaque style individuellement
export default function GameDataReceiver({
    imageLayout,          // L'objet { x, y, width, height }
    baseImageWidth,

    speedConfig  = defaultConfig,
    gearConfig  = defaultConfig,
    positionConfig  = defaultConfig,
    remainingFuelConfig  = defaultConfig,
    tcConfig  = defaultConfig,
    absConfig  = defaultConfig,
    throttleConfig  = defaultConfig,
    brakeConfig  = defaultConfig,
    engineMapConfig  = defaultConfig,
    fuelPerLapConfig  = defaultConfig,
    fuelCapacityConfig  = defaultConfig,
    fuelLapConfig  = defaultConfig,
    lapConfig  = defaultConfig,
    lapTimeConfig  = defaultConfig,
    deltaBestLapConfig  = defaultConfig,
    predTimeConfig  = defaultConfig,
    brakeBiasConfig  = defaultConfig,
    flTyrePressureConfig  = defaultConfig,
    flTyreTemperatureConfig  = defaultConfig,
    frTyrePressureConfig  = defaultConfig,
    frTyreTemperatureConfig  = defaultConfig,
    rlTyrePressureConfig  = defaultConfig,
    rlTyreTemperatureConfig  = defaultConfig,
    rrTyrePressureConfig  = defaultConfig,
    rrTyreTemperatureConfig  = defaultConfig,


}) {
    const [gameData, setGameData] = useState({
        speed: 0,
        gear: 'N',
        position: 0,
        remainingFuel: 999,
        tc: 12,
        abs: 13,
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
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.speed}
                position={speedConfig.position}
                textStyle={speedConfig.textStyle}
                baseFontSize={speedConfig.baseFontSize}
            />
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={(() => {
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
                })()}
                position={gearConfig.position}
                textStyle={gearConfig.textStyle}
                baseFontSize={gearConfig.baseFontSize}
            />
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.position}
                position={positionConfig.position}
                textStyle={positionConfig.textStyle}
                baseFontSize={positionConfig.baseFontSize}
            />
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.remainingFuel}
                position={remainingFuelConfig.position}
                textStyle={remainingFuelConfig.textStyle}
                baseFontSize={remainingFuelConfig.baseFontSize}
            />
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.tc}
                position={tcConfig.position}
                textStyle={tcConfig.textStyle}
                baseFontSize={tcConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.abs}
                position={absConfig.position}
                textStyle={absConfig.textStyle}
                baseFontSize={absConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={(((gameData.throttle) * 100).toFixed(0) || '--%')}
                position={throttleConfig.position}
                textStyle={throttleConfig.textStyle}
                baseFontSize={throttleConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={(((gameData.brake) * 100).toFixed(0) || '--%')}
                position={brakeConfig.position}
                textStyle={brakeConfig.textStyle}
                baseFontSize={brakeConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.engineMap}
                position={engineMapConfig.position}
                textStyle={engineMapConfig.textStyle}
                baseFontSize={engineMapConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.fuelPerLap.toFixed(2)}
                position={fuelPerLapConfig.position}
                textStyle={fuelPerLapConfig.textStyle}
                baseFontSize={fuelPerLapConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.fuelCapacity.toFixed(0)}
                position={fuelCapacityConfig.position}
                textStyle={fuelCapacityConfig.textStyle}
                baseFontSize={fuelCapacityConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={((parseFloat(gameData.remainingFuel) / parseFloat(gameData.fuelPerLap)).toFixed(1)) + 'L'}
                position={fuelLapConfig.position}
                textStyle={fuelLapConfig.textStyle}
                baseFontSize={fuelLapConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.lap}
                position={lapConfig.position}
                textStyle={lapConfig.textStyle}
                baseFontSize={lapConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={
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
                }
                position={lapTimeConfig.position}
                textStyle={lapTimeConfig.textStyle}
                baseFontSize={lapTimeConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={(parseFloat(gameData.deltaBestLap) < 0 ? '' : '+') + gameData.deltaBestLap.toFixed(3)}
                position={deltaBestLapConfig.position}
                textStyle={[deltaBestLapConfig.textStyle, {color: parseFloat(gameData.deltaBestLap) > 0 ? 'red' : 'green' }]}
                baseFontSize={deltaBestLapConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={
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
                    })()
                }
                position={predTimeConfig.position}
                textStyle={predTimeConfig.textStyle}
                baseFontSize={predTimeConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={(gameData.brakeBias * 100).toFixed(0)}
                position={brakeBiasConfig.position}
                textStyle={brakeBiasConfig.textStyle}
                baseFontSize={brakeBiasConfig.baseFontSize}
            />

            {/*Fl tyre*/}
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.flTyrePressure.toFixed(2)}
                position={flTyrePressureConfig.position}
                textStyle={flTyrePressureConfig.textStyle}
                baseFontSize={flTyrePressureConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.flTyreTemperature.toFixed(1) + '°C'}
                position={flTyreTemperatureConfig.position}
                textStyle={flTyreTemperatureConfig.textStyle}
                baseFontSize={flTyreTemperatureConfig.baseFontSize}
            />

            {/*Fr tyre*/}
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.frTyrePressure.toFixed(2)}
                position={frTyrePressureConfig.position}
                textStyle={frTyrePressureConfig.textStyle}
                baseFontSize={frTyrePressureConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.frTyreTemperature.toFixed(1) + '°C'}
                position={frTyreTemperatureConfig.position}
                textStyle={frTyreTemperatureConfig.textStyle}
                baseFontSize={frTyreTemperatureConfig.baseFontSize}
            />

            {/*Rl tyre*/}
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rlTyrePressure.toFixed(2)}
                position={rlTyrePressureConfig.position}
                textStyle={rlTyrePressureConfig.textStyle}
                baseFontSize={rlTyrePressureConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rlTyreTemperature.toFixed(1) + '°C'}
                position={rlTyreTemperatureConfig.position}
                textStyle={rlTyreTemperatureConfig.textStyle}
                baseFontSize={rlTyreTemperatureConfig.baseFontSize}
            />

            {/*Rr tyre*/}
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rrTyrePressure.toFixed(2)}
                position={rrTyrePressureConfig.position}
                textStyle={rrTyrePressureConfig.textStyle}
                baseFontSize={rrTyrePressureConfig.baseFontSize}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rrTyreTemperature.toFixed(1) + '°C'}
                position={rrTyreTemperatureConfig.position}
                textStyle={rrTyreTemperatureConfig.textStyle}
                baseFontSize={rrTyreTemperatureConfig.baseFontSize}
            />


            
        </>
    );
}