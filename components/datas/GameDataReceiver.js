// GameDataReceiver.js (ou temp.js)

import React, { useState, useEffect } from 'react';
import dgram from 'react-native-udp';
import DataDisplay, {GearDisplay, 
    PercentageDisplay, 
    ToFixedDisplay, 
    FuelLapRemaining,
    LapTimeDisplay,
    DeltaBestLapTimeDisplay,
    PredictedTimeDisplay,
    TyreTempDisplay
} from './dataDisplayer/DataDisplay'

const LISTEN_PORT = 8888;
const defaultConfig = {
    position: null, // Si la position est null, on ne l'affiche pas
    textStyle: {},
    baseFontSize: 0
};

// On déstructure les props pour récupérer chaque style individuellement
export default function GameDataReceiver({
    imageLayout,          // L'objet { x, y, width, height }
    baseImageWidth,

    speedConfig = defaultConfig,
    gearConfig = defaultConfig,
    positionConfig = defaultConfig,
    remainingFuelConfig = defaultConfig,
    tcConfig = defaultConfig,
    absConfig = defaultConfig,
    throttleConfig = defaultConfig,
    brakeConfig = defaultConfig,
    engineMapConfig = defaultConfig,
    fuelPerLapConfig = defaultConfig,
    fuelCapacityConfig = defaultConfig,
    fuelLapConfig = defaultConfig,
    lapConfig = defaultConfig,
    lapTimeConfig = defaultConfig,
    deltaBestLapConfig = defaultConfig,
    predTimeConfig = defaultConfig,
    brakeBiasConfig = defaultConfig,
    flTyrePressureConfig = defaultConfig,
    flTyreTemperatureConfig = defaultConfig,
    frTyrePressureConfig = defaultConfig,
    frTyreTemperatureConfig = defaultConfig,
    rlTyrePressureConfig = defaultConfig,
    rlTyreTemperatureConfig = defaultConfig,
    rrTyrePressureConfig = defaultConfig,
    rrTyreTemperatureConfig = defaultConfig,


}) {
    const [gameData, setGameData] = useState({
        speed: null,
        gear: null,
        position: null,
        remainingFuel: null,
        tc: null,
        abs: null,
        throttle: null,
        brake: null,
        engineMap: null,
        fuelPerLap: null,
        fuelCapacity: null,
        lap: null,
        lapTime: null,
        deltaBestLap: null,
        bestLap: null,
        brakeBias: null,
        flTyrePressure: null,
        flTyreTemperature: null,
        frTyrePressure: null,
        frTyreTemperature: null,
        rlTyrePressure: null,
        rlTyreTemperature: null,
        rrTyrePressure: null,
        rrTyreTemperature: null,
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
                config={speedConfig}
            />


            <GearDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.gear}
                config={gearConfig}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.position}
                config={positionConfig}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.remainingFuel}
                config={remainingFuelConfig}
            />
            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.tc}
                config={tcConfig}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.abs}
                config={absConfig}
            />

            <PercentageDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.throttle}
                config={throttleConfig}
            />

            <PercentageDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.brake}
                config={brakeConfig}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.engineMap}
                config={engineMapConfig}
            />

            <ToFixedDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.fuelPerLap}
                config={fuelPerLapConfig}
                postComaDigits={2}
            />

            <ToFixedDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.fuelCapacity}
                config={fuelCapacityConfig}
                postComaDigits={0}
            />

            <FuelLapRemaining
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                remainingFuel={gameData.remainingFuel}
                fuelPerLap={gameData.fuelPerLap}
                config={fuelLapConfig}
            />

            <DataDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.lap}
                config={lapConfig}
            />

            <LapTimeDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.lapTime}
                config={lapTimeConfig}
            />

            
            <DeltaBestLapTimeDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.deltaBestLap}
                config={deltaBestLapConfig}
            />

            <PredictedTimeDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                bestLap={gameData.bestLap}
                deltaBestLap={gameData.deltaBestLap}
                config={predTimeConfig}
            />

            <PercentageDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.brakeBias}
                config={brakeBiasConfig}
            />

            {/* Pneus */}
            <ToFixedDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.flTyrePressure}
                postComaDigits={2}
                config={flTyrePressureConfig}
            />

            <TyreTempDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.flTyreTemperature}
                config={flTyreTemperatureConfig}
            />

            <ToFixedDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.frTyrePressure}
                postComaDigits={2}
                config={frTyrePressureConfig}
            />

            <TyreTempDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.frTyreTemperature}
                config={frTyreTemperatureConfig}
            />

            <ToFixedDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rlTyrePressure}
                postComaDigits={2}
                config={rlTyrePressureConfig}
            />

            <TyreTempDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rlTyreTemperature}
                config={rlTyreTemperatureConfig}
            />

            <ToFixedDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rrTyrePressure}
                postComaDigits={2}
                config={rrTyrePressureConfig}
            />

            <TyreTempDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rrTyreTemperature}
                config={rrTyreTemperatureConfig}
            />



        </>
    );
}