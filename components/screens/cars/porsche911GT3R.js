import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import GameDataReceiver from '../../datas/GameDataReceiver'; // Assurez-vous du bon chemin

export function Porsche911GT3R() {

    const image = require('../../../assets/images/hudImages/porsche911GT3R.png')


    return (
        <ImageBackground source={image} style={styles.imageBackground}>
            <GameDataReceiver
                speedViewStyle={styles.viewSpeed}
                speedTextStyle={styles.textSpeed}
                gearViewStyle={styles.viewGear}
                gearTextStyle={styles.textGear}
                positionViewStyle={styles.viewPosition}
                positionTextStyle={styles.textPosition}
                remainingFuelViewStyle={styles.viewRemainingFuel}
                remainingFuelTextStyle={styles.textRemainingFuel}
                tcViewStyle={styles.viewTc}
                tcTextStyle={styles.textTc}
                absViewStyle={styles.viewAbs}
                absTextStyle={styles.textAbs}
                throttleViewStyle={styles.viewThrottle}
                throttleTextStyle={styles.textThrottle}
                brakeViewStyle={styles.viewBrake}
                brakeTextStyle={styles.textBrake}
                engineMapViewStyle={styles.viewEngineMap}
                engineMapTextStyle={styles.textEngineMap}
                fuelPerLapViewStyle={styles.viewFuelPerLap}
                fuelPerLapTextStyle={styles.textFuelPerLap}
                fuelCapacityViewStyle={styles.viewFuelCapacity}
                fuelCapacityTextStyle={styles.textFuelCapacity}
                fuelLapViewStyle={styles.viewFuelLap}
                fuelLapTextStyle={styles.textFuelLap}
                lapViewStyle={styles.viewLap}
                lapTextStyle={styles.textLap}
                lapTimeViewStyle={styles.viewLapTime}
                lapTimeTextStyle={styles.textLapTime}
                deltaBestLapViewStyle={styles.viewDeltaBestLap}
                deltaBestLapTextStyle={styles.textDeltaBestLap}
                predTimeViewStyle={styles.viewPredTime}
                predTimeTextStyle={styles.textPredTime}
                brakeBiasViewStyle={styles.viewBrakeBias}
                brakeBiasTextStyle={styles.textBrakeBias}
                flTyrePressureViewStyle={styles.viewFlTyrePressure}
                flTyrePressureTextStyle={styles.textFlTyrePressure}
                frTyrePressureViewStyle={styles.viewFrTyrePressure}
                frTyrePressureTextStyle={styles.textFrTyrePressure}
                rlTyrePressureViewStyle={styles.viewRlTyrePressure}
                rlTyrePressureTextStyle={styles.textRlTyrePressure}
                rrTyrePressureViewStyle={styles.viewRrTyrePressure}
                rrTyrePressureTextStyle={styles.textRrTyrePressure}
                flTyreTemperatureViewStyle={styles.viewFlTyreTemperature}
                flTyreTemperatureTextStyle={styles.textFlTyreTemperature}
                frTyreTemperatureViewStyle={styles.viewFrTyreTemperature}
                frTyreTemperatureTextStyle={styles.textFrTyreTemperature}
                rlTyreTemperatureViewStyle={styles.viewRlTyreTemperature}
                rlTyreTemperatureTextStyle={styles.textRlTyreTemperature}
                rrTyreTemperatureViewStyle={styles.viewRrTyreTemperature}
                rrTyreTemperatureTextStyle={styles.textRrTyreTemperature}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    imageBackground: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },

    // --- Styles speed ---
    viewSpeed: {

        position: 'absolute',
        top: '11%',
        left: '40.8%',
        width: '19%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textSpeed: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },

    // --- Styles gear ---

    viewGear: {
        position: 'absolute',
        top: '24%',
        left: '40.8%',
        width: '19%',
        height: '38%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textGear: {
        color: 'white',
        fontSize: 150,
        fontWeight: 'bold',
        lineHeight: 150,

    },

    // --- Styles position ---

    viewPosition: {
        position: 'absolute',
        top: '54%',
        left: '12%',
        width: '5%',
        height: '8%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    textPosition: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        lineHeight: 25,
    },

    // --- remainingFuel position ---

    viewRemainingFuel: {
        position: 'absolute',
        top: '43%',
        left: '30.5%',
        width: '10%',
        height: '9.3%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    textRemainingFuel: {
        color: 'white',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: 'bold',
    },


    // --- Tc position ---

    viewTc: {
        position: 'absolute',
        top: '65%',
        left: '23%',
        width: '5%',
        height: '8.5%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textTc: {
        color: 'white',
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
    },

    // --- Abs position ---

    viewAbs: {
        position: 'absolute',
        top: '65%',
        left: '34.6%',
        width: '5%',
        height: '8.5%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textAbs: {
        color: 'white',
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
    },

    // --- Throttle position ---

    viewThrottle: {
        position: 'absolute',
        top: '44%',
        left: '12%',
        width: '5%',
        height: '8.5%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textThrottle: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },

    // --- Brake position ---

    viewBrake: {
        position: 'absolute',
        top: '34%',
        left: '12%',
        width: '5%',
        height: '8.5%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textBrake: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },

    // --- EngineMap position ---

    viewEngineMap: {
        position: 'absolute',
        top: '24%',
        left: '12%',
        width: '5%',
        height: '8.5%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textEngineMap: {
        color: 'white',
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
    },


    // --- FuelPerLap position ---

    viewFuelPerLap: {
        position: 'absolute',
        top: '33.5%',
        left: '30.5%',
        width: '10%',
        height: '9.3%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textFuelPerLap: {
        color: 'white',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: 'bold',
    },


    // --- FuelCapacity position ---

    viewFuelCapacity: {
        position: 'absolute',
        top: '53%',
        left: '30.5%',
        width: '10%',
        height: '9.3%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textFuelCapacity: {
        color: 'white',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: 'bold',
    },

    // --- FuelLap position ---

    viewFuelLap: {
        position: 'absolute',
        top: '23.6%',
        left: '30.5%',
        width: '10%',
        height: '9.3%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textFuelLap: {
        color: 'white',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: 'bold',
    },


    // --- Lap position ---

    viewLap: {
        position: 'absolute',
        top: '13.3%',
        left: '69.2%',
        width: '5.9%',
        height: '8.5%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textLap: {
        color: 'white',
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
    },

    // --- LapTime position ---

    viewLapTime: {
        position: 'absolute',
        top: '29.5%',
        left: '60.3%',
        width: '27%',
        height: '13.9%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textLapTime: {
        color: 'white',
        fontSize: 36,
        lineHeight: 35,
        fontWeight: 'bold',
    },

    // --- DeltaBestLap position ---

    viewDeltaBestLap: {
        position: 'absolute',
        top: '48.2%',
        left: '60.3%',
        width: '13.5%',
        height: '14%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textDeltaBestLap: {
        //color: 'white',
        fontSize: 21,
        lineHeight: 35,
        fontWeight: 'bold',
    },

    // --- PredTime position ---

    viewPredTime: {
        position: 'absolute',
        top: '48.2%',
        left: '74%',
        width: '13.5%',
        height: '14%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textPredTime: {
        color: 'white',
        fontSize: 21,
        lineHeight: 35,
        fontWeight: 'bold',
    },

    // --- BrakeBias position ---

    viewBrakeBias: {
        position: 'absolute',
        top: '71%',
        left: '77%',
        width: '9%',
        height: '8%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textBrakeBias: {
        color: 'white',
        fontSize: 23,
        lineHeight: 25,
        fontWeight: 'bold',
    },


    // --- FlTyre position ---

    viewFlTyrePressure: {
        position: 'absolute',
        top: '63.5%',
        left: '40.7%',
        width: '6%',
        height: '4%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textFlTyrePressure: {
        color: 'white',
        fontSize: 15,
        lineHeight: 13,
        fontWeight: 'bold',
    },

    viewFlTyreTemperature: {
        position: 'absolute',
        top: '68%',
        left: '40.7%',
        width: '9.5%',
        height: '6%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textFlTyreTemperature: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },


    // --- FrTyre position ---

    viewFrTyrePressure: {
        position: 'absolute',
        top: '63.5%',
        left: '53.7%',
        width: '6%',
        height: '4%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textFrTyrePressure: {
        color: 'white',
        fontSize: 15,
        lineHeight: 13,
        fontWeight: 'bold',
    },

    viewFrTyreTemperature: {
        position: 'absolute',
        top: '68%',
        left: '50.5%',
        width: '9.5%',
        height: '6%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textFrTyreTemperature: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },

    // --- RlTyre position ---

    viewRlTyrePressure: {
        position: 'absolute',
        top: '75%',
        left: '40.7%',
        width: '6%',
        height: '4%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textRlTyrePressure: {
        color: 'white',
        fontSize: 15,
        lineHeight: 13,
        fontWeight: 'bold',
    },

    viewRlTyreTemperature: {
        position: 'absolute',
        top: '80.5%',
        left: '40.7%',
        width: '9.5%',
        height: '6%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textRlTyreTemperature: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },

    // --- RrTyre position ---

    viewRrTyrePressure: {
        position: 'absolute',
        top: '75%',
        left: '53.7%',
        width: '6%',
        height: '4%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textRrTyrePressure: {
        color: 'white',
        fontSize: 15,
        lineHeight: 13,
        fontWeight: 'bold',
    },

    viewRrTyreTemperature: {
        position: 'absolute',
        top: '80.5%',
        left: '50.5%',
        width: '9.5%',
        height: '6%',
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textRrTyreTemperature: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },
});