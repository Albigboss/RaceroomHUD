// GameDataReceiver.js (ou temp.js)

import React, { useState, useEffect, useContext } from 'react';
import dgram from 'react-native-udp';
import DataDisplay, {
    GearDisplay,
    PercentageDisplay,
    ToFixedDisplay,
    FuelLapRemaining,
    LapTimeDisplay,
    DeltaBestLapTimeDisplay,
    PredictedTimeDisplay,
    TyreTempDisplay,
    TyreTempDisplayWithColor,
    HeadLightDisplay,
    BrakeDisplay,
    EngineDamageDisplay,
    GearBoxDamageDisplay,
    AerodynamicDamageDisplay,
    SuspensionDamageDisplay
} from './dataDisplayer/DataDisplay'

import { PortContext } from '../context/PortContext';


const defaultConfig = {
    position: null, // Si la position est null, on ne l'affiche pas
    textStyle: {},
    baseFontSize: 0
};

// On déstructure les props pour récupérer chaque style individuellement
export default function GameDataReceiver({
    imageLayout,          // L'objet { x, y, width, height }
    baseImageWidth,
    tyreDesign,

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
    headLightConfig = {
        position: null, // Si la position est null, on ne l'affiche pas
        link: null,
    },
    flBrakeTempConfig = defaultConfig,
    frBrakeTempConfig = defaultConfig,
    rlBrakeTempConfig = defaultConfig,
    rrBrakeTempConfig = defaultConfig,

    flTyreWearConfig = defaultConfig,
    frTyreWearConfig = defaultConfig,
    rlTyreWearConfig = defaultConfig,
    rrTyreWearConfig = defaultConfig,


    engineDamageConfig = defaultConfig,
    gearBoxDamageConfig = defaultConfig,
    aerodynamicDamageConfig = defaultConfig,
    suspensionDamageConfig = defaultConfig,
}) {

    const { listeningPort } = useContext(PortContext)

    const LISTEN_PORT = listeningPort;

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

        //fl tyre
        flTyrePressure: null,
        flTyreTemperature: null,
        flTyreOptimalTemp: null,
        flTyreHotTemp: null,
        flTyreColdTemp: null,

        //fr tyre
        frTyrePressure: null,
        frTyreTemperature: null,
        frTyreOptimalTemp: null,
        frTyreHotTemp: null,
        frTyreColdTemp: null,

        //rl tyre
        rlTyrePressure: null,
        rlTyreTemperature: null,
        rlTyreOptimalTemp: null,
        rlTyreHotTemp: null,
        rlTyreColdTemp: null,

        //rr tyre
        rrTyrePressure: null,
        rrTyreTemperature: null,
        rrTyreOptimalTemp: null,
        rrTyreHotTemp: null,
        rrTyreColdTemp: null,


        headLight: null,

        //flBrake
        flBrakeTemp: null,
        flBrakeOptimalTemp: null,
        flBrakeColdTemp: null,
        flBrakeHotTemp: null,

        //frBrake
        frBrakeTemp: null,
        frBrakeOptimalTemp: null,
        frBrakeColdTemp: null,
        frBrakeHotTemp: null,

        //rlBrake
        rlBrakeTemp: null,
        rlBrakeOptimalTemp: null,
        rlBrakeColdTemp: null,
        rlBrakeHotTemp: null,

        //rrBrake
        rrBrakeTemp: null,
        rrBrakeOptimalTemp: null,
        rrBrakeColdTemp: null,
        rrBrakeHotTemp: null,

        flTyreWear: null,
        frTyreWear: null,
        rlTyreWear: null,
        rrTyreWear: null,


        engineDamage: null,
        gearBoxDamage: null,
        aeroDamage: null,
        suspensionDamage: null,
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





            {tyreDesign == 1 ? (

                <TyreTempDisplay
                    imageLayout={imageLayout}
                    baseImageWidth={baseImageWidth}
                    value={gameData.flTyreTemperature}
                    config={flTyreTemperatureConfig}
                />) :

                (<TyreTempDisplayWithColor
                    imageLayout={imageLayout}
                    baseImageWidth={baseImageWidth}
                    value={gameData.flTyreTemperature}
                    config={flTyreTemperatureConfig}
                    optimalTemp={gameData.flTyreOptimalTemp}
                    hotTemp={gameData.flTyreHotTemp}
                    coldTemp={gameData.flTyreColdTemp} />)
            }




            {/* */}

            <ToFixedDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.frTyrePressure}
                postComaDigits={2}
                config={frTyrePressureConfig}
            />

            {tyreDesign == 1 ? (

                <TyreTempDisplay
                    imageLayout={imageLayout}
                    baseImageWidth={baseImageWidth}
                    value={gameData.frTyreTemperature}
                    config={frTyreTemperatureConfig}
                />) :

                (<TyreTempDisplayWithColor
                    imageLayout={imageLayout}
                    baseImageWidth={baseImageWidth}
                    value={gameData.frTyreTemperature}
                    config={frTyreTemperatureConfig}
                    optimalTemp={gameData.frTyreOptimalTemp}
                    hotTemp={gameData.frTyreHotTemp}
                    coldTemp={gameData.frTyreColdTemp} />)
            }

            <ToFixedDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rlTyrePressure}
                postComaDigits={2}
                config={rlTyrePressureConfig}
            />

            {tyreDesign == 1 ? (

                <TyreTempDisplay
                    imageLayout={imageLayout}
                    baseImageWidth={baseImageWidth}
                    value={gameData.rlTyreTemperature}
                    config={rlTyreTemperatureConfig}
                />) :

                (<TyreTempDisplayWithColor
                    imageLayout={imageLayout}
                    baseImageWidth={baseImageWidth}
                    value={gameData.rlTyreTemperature}
                    config={rlTyreTemperatureConfig}
                    optimalTemp={gameData.rlTyreOptimalTemp}
                    hotTemp={gameData.rlTyreHotTemp}
                    coldTemp={gameData.rlTyreColdTemp} />)
            }

            <ToFixedDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rrTyrePressure}
                postComaDigits={2}
                config={rrTyrePressureConfig}
            />

            {tyreDesign == 1 ? (

                <TyreTempDisplay
                    imageLayout={imageLayout}
                    baseImageWidth={baseImageWidth}
                    value={gameData.rrTyreTemperature}
                    config={rrTyreTemperatureConfig}
                />) :

                (<TyreTempDisplayWithColor
                    imageLayout={imageLayout}
                    baseImageWidth={baseImageWidth}
                    value={gameData.rrTyreTemperature}
                    config={rrTyreTemperatureConfig}
                    optimalTemp={gameData.rrTyreOptimalTemp}
                    hotTemp={gameData.rrTyreHotTemp}
                    coldTemp={gameData.rrTyreColdTemp} />)
            }

            <HeadLightDisplay
                imageLayout={imageLayout}
                value={gameData.headLight}
                config={headLightConfig}
            />


            <BrakeDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.flBrakeTemp}
                config={flBrakeTempConfig}
                optimalTemp={gameData.flBrakeOptimalTemp}
                hotTemp={gameData.flBrakeHotTemp}
                coldTemp={gameData.flBrakeColdTemp}
            />

            <BrakeDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.frBrakeTemp}
                config={frBrakeTempConfig}
                optimalTemp={gameData.frBrakeOptimalTemp}
                hotTemp={gameData.frBrakeHotTemp}
                coldTemp={gameData.frBrakeColdTemp}
            />

            <BrakeDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rlBrakeTemp}
                config={rlBrakeTempConfig}
                optimalTemp={gameData.rlBrakeOptimalTemp}
                hotTemp={gameData.rlBrakeHotTemp}
                coldTemp={gameData.rlBrakeColdTemp}
            />

            <BrakeDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rrBrakeTemp}
                config={rrBrakeTempConfig}
                optimalTemp={gameData.rrBrakeOptimalTemp}
                hotTemp={gameData.rrBrakeHotTemp}
                coldTemp={gameData.rrBrakeColdTemp}
            />

            <PercentageDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.flTyreWear}
                config={flTyreWearConfig}
            />

            <PercentageDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.frTyreWear}
                config={frTyreWearConfig}
            />

            <PercentageDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rlTyreWear}
                config={rlTyreWearConfig}
            />

            <PercentageDisplay
                imageLayout={imageLayout}
                baseImageWidth={baseImageWidth}
                value={gameData.rrTyreWear}
                config={rrTyreWearConfig}
            />

            <EngineDamageDisplay
                imageLayout={imageLayout}
                value={gameData.engineDamage}
                config={engineDamageConfig}
            />

            <GearBoxDamageDisplay
                imageLayout={imageLayout}
                value={gameData.gearBoxDamage}
                config={gearBoxDamageConfig}
            />

            <AerodynamicDamageDisplay
            
                imageLayout={imageLayout}
                value={gameData.aeroDamage}
                config={aerodynamicDamageConfig}
            />

            <SuspensionDamageDisplay
                imageLayout={imageLayout}
                value={gameData.suspensionDamage}
                config={suspensionDamageConfig}
            />

        </>
    );
}