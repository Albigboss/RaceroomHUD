import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native'
import GameDataReceiver from '../../datas/GameDataReceiver'; // Assurez-vous du bon chemin
import React, { useState, useEffect, useMemo } from 'react'

export function Porsche911GT3R() {

    const image = require('../../../assets/images/hudImages/porsche911GT3R.png')

    // État pour stocker la taille du conteneur
    const [containerLayout, setContainerLayout] = useState(null);
    // État pour stocker la taille de l'image source
    const [imageDimensions, setImageDimensions] = useState(null);

    const DESIGN_IMAGE_WIDTH = 1088; // La largeur de votre design


    // 1. Obtenir les dimensions de l'image source une seule fois
    useEffect(() => {
        const source = Image.resolveAssetSource(image);
        if (source) {
            setImageDimensions({ width: source.width, height: source.height });
        }
    }, []);

    // 2. Calculer la disposition de l'image visible chaque fois que la taille du conteneur change
    const imageLayout = useMemo(() => {
        if (!containerLayout || !imageDimensions) {
            return null; // On attend d'avoir toutes les infos
        }

        const { width: containerWidth, height: containerHeight } = containerLayout;
        const { width: imgWidth, height: imgHeight } = imageDimensions;

        const containerRatio = containerWidth / containerHeight;
        const imageRatio = imgWidth / imgHeight;

        let finalWidth, finalHeight, offsetX, offsetY;

        // Si le conteneur est plus "large" que l'image -> letterboxing (bandes haut/bas)
        if (containerRatio > imageRatio) {
            finalHeight = containerHeight;
            finalWidth = containerHeight * imageRatio;
            offsetX = (containerWidth - finalWidth) / 2;
            offsetY = 0;
        } else { // Si le conteneur est plus "haut" que l'image -> pillarboxing (bandes côté)
            finalWidth = containerWidth;
            finalHeight = containerWidth / imageRatio;
            offsetY = (containerHeight - finalHeight) / 2;
            offsetX = 0;
        }

        return {
            width: finalWidth,
            height: finalHeight,
            x: offsetX,
            y: offsetY,
        };
    }, [containerLayout, imageDimensions]);

    return (

        <View
            style={styles.screenContainer}
            // 3. Mesurer le conteneur avec onLayout
            onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                setContainerLayout({ width, height });
            }}
        >

            {/* 2. On force l'image à remplir cette View avec un style absolu */}
            <ImageBackground
                source={image}
                style={styles.imageBackground}
                resizeMode="contain" // resizeMode est mieux en prop qu'en style

            >
                {/* 3. Le contenu est centré par l'ImageBackground comme avant */}
                {imageLayout && (<GameDataReceiver
                    // NOUVEAU : On passe l'objet de disposition calculé
                    imageLayout={imageLayout}

                    baseImageWidth={DESIGN_IMAGE_WIDTH}

                    speedConfig={{
                        position: { top: 17.4, left: 39.6, width: 20.5, height: 10, },
                        textStyle: styles.textSpeed,
                        baseFontSize: 60
                    }}

                    gearConfig={{
                        position: { top: 28.5, left: 39.6, width: 20.6, height: 33, },
                        textStyle: styles.textGear,
                        baseFontSize: 200
                    }}

                    positionConfig={{
                        position: { top: 54, left: 10, width: 4, height: 7.3, },
                        textStyle: styles.textPosition,
                        baseFontSize: 30
                    }}

                    remainingFuelConfig={{
                        position: { top: 45, left: 28.7, width: 10.5, height: 8, },
                        textStyle: styles.textRemainingFuel,
                        baseFontSize: 40
                    }}

                    tcConfig={{
                        position: { top: 63, left: 21, width: 5, height: 8, },
                        textStyle: styles.textTc,
                        baseFontSize: 35
                    }}

                    absConfig={{
                        position: { top: 63, left: 33.5, width: 5, height: 8, },
                        textStyle: styles.textAbs,
                        baseFontSize: 35
                    }}

                    throttleConfig={{
                        position: { top: 37, left: 9.5, width: 4.8, height: 7.3, },
                        textStyle: styles.textThrottle,
                        baseFontSize: 25
                    }}

                    brakeConfig={{
                        position: { top: 45.5, left: 9.5, width: 4.8, height: 7.3, },
                        textStyle: styles.textBrake,
                        baseFontSize: 25
                    }}

                    engineMapConfig={{
                        position: { top: 28.5, left: 10, width: 4, height: 7.3, },
                        textStyle: styles.textEngineMap,
                        baseFontSize: 30
                    }}

                    fuelPerLapConfig={{
                        position: { top: 36.7, left: 28.7, width: 10.5, height: 8, },
                        textStyle: styles.textFuelPerLap,
                        baseFontSize: 40
                    }}

                    fuelCapacityConfig={{
                        position: { top: 53.2, left: 28.7, width: 10.5, height: 8, },
                        textStyle: styles.textFuelCapacity,
                        baseFontSize: 40
                    }}

                    fuelLapConfig={{
                        position: { top: 28.2, left: 28.7, width: 10.5, height: 8, },
                        textStyle: styles.textFuelLap,
                        baseFontSize: 30
                    }}

                    lapConfig={{
                        position: { top: 19.3, left: 70, width: 6.5, height: 7.5, },
                        textStyle: styles.textLap,
                        baseFontSize: 30
                    }}

                    lapTimeConfig={{
                        position: {top: 33, left: 60.3, width: 29, height: 12,},
                        textStyle: styles.textLapTime,
                        baseFontSize: 45
                    }}

                    deltaBestLapConfig={{
                        position: {top: 49, left: 60.3, width: 14, height: 12.4,},
                        textStyle: styles.textDeltaBestLap,
                        baseFontSize: 35
                    }}

                    predTimeConfig={{
                        position: {top: 49, left: 74.3, width: 15.2, height: 12.5,},
                        textStyle: styles.textPredTime,
                        baseFontSize: 35
                    }}

                    brakeBiasConfig={{
                        position: {top: 68.5, left: 78.5, width: 9.3, height: 7.2,},
                        textStyle: styles.textBrakeBias,
                        baseFontSize: 30
                    }}

                    flTyrePressureConfig={{
                        position: {top: 62, left: 39.5, width: 6.5, height: 4,},
                        textStyle: styles.textFlTyrePressure,
                        baseFontSize: 20
                    }}

                    flTyreTemperatureConfig={{
                        position: {top: 65.9, left: 39.5, width: 10.2, height: 6,},
                        textStyle: styles.textFlTyreTemperature,
                        baseFontSize: 25
                    }}

                    frTyrePressureConfig={{
                        position: {top: 62, left: 53.5, width: 6.5, height: 4,},
                        textStyle: styles.textFrTyrePressure,
                        baseFontSize: 20
                    }}

                    frTyreTemperatureConfig={{
                        position: {top: 65.9, left: 50, width: 10.2, height: 6,},
                        textStyle: styles.textFrTyreTemperature,
                        baseFontSize: 25
                    }}


                    rlTyrePressureConfig={{
                        position: {top: 72, left: 39.5, width: 6.5, height: 4,},
                        textStyle: styles.textRlTyrePressure,
                        baseFontSize: 20
                    }}

                    rlTyreTemperatureConfig={{
                        position: {top: 76, left: 39.5, width: 10.2, height: 6,},
                        textStyle: styles.textRlTyreTemperature,
                        baseFontSize: 25
                    }}


                    rrTyrePressureConfig={{
                        position: {top: 72, left: 53.5, width: 6.5, height: 4,},
                        textStyle: styles.textRrTyrePressure,
                        baseFontSize: 20
                    }}

                    rrTyreTemperatureConfig={{
                        position: {top: 76, left: 50, width: 10.2, height: 6,},
                        textStyle: styles.textRrTyreTemperature,
                        baseFontSize: 25
                    }}

                    headLightConfig={{
                        position: {top: 64, left: 9, width: 5, height: 6, },
                        link: 1
                    }}

                />)}
            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({

    // NOUVEAU STYLE pour le conteneur de l'écran
    screenContainer: {
        flex: 1,
        backgroundColor: '#1c1d21',
    },

    // STYLE MODIFIÉ pour l'image de fond
    imageBackground: {
        // Ce raccourci magique le force à remplir son parent (la View)
        ...StyleSheet.absoluteFillObject,

        // On garde le centrage pour le contenu (GameDataReceiver)
        justifyContent: 'center',
        alignItems: 'center',
    },

    // --- Styles speed ---

    textSpeed: {
        color: 'white',
        fontSize: 30,
        lineHeight: 30,
        fontWeight: 'bold',
    },

    // --- Styles gear ---
    textGear: {
        color: 'white',
        fontSize: 140,
        fontWeight: 'bold',
        lineHeight: 140,

    },

    // --- Styles position ---

    textPosition: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        lineHeight: 25,
    },

    // --- remainingFuel  ---

    textRemainingFuel: {
        color: 'white',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: 'bold',
    },


    // --- Tc  ---

    textTc: {
        color: 'white',
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
    },

    // --- Abs position ---

    textAbs: {
        color: 'white',
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
    },

    // --- Throttle position ---

    textThrottle: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },

    // --- Brake position ---

    textBrake: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },

    // --- EngineMap position ---

    textEngineMap: {
        color: 'white',
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
    },


    // --- FuelPerLap position ---

    textFuelPerLap: {
        color: 'white',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: 'bold',
    },


    // --- FuelCapacity position ---

    textFuelCapacity: {
        color: 'white',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: 'bold',
    },

    // --- FuelLap position ---

    textFuelLap: {
        color: 'white',
        fontSize: 28,
        lineHeight: 35,
        fontWeight: 'bold',
    },


    // --- Lap position ---

    textLap: {
        color: 'white',
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
    },

    // --- LapTime position ---

    textLapTime: {
        color: 'white',
        fontSize: 36,
        lineHeight: 35,
        fontWeight: 'bold',
    },

    // --- DeltaBestLap position ---

    textDeltaBestLap: {
        //color: 'white',
        fontSize: 21,
        lineHeight: 35,
        fontWeight: 'bold',
    },

    // --- PredTime position ---

    textPredTime: {
        color: 'white',
        fontSize: 21,
        lineHeight: 35,
        fontWeight: 'bold',
    },

    // --- BrakeBias position ---

    textBrakeBias: {
        color: 'white',
        fontSize: 23,
        lineHeight: 25,
        fontWeight: 'bold',
    },


    // --- FlTyre position ---

    textFlTyrePressure: {
        color: 'white',
        fontSize: 15,
        lineHeight: 13,
        fontWeight: 'bold',
    },

    textFlTyreTemperature: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },


    // --- FrTyre position ---

    textFrTyrePressure: {
        color: 'white',
        fontSize: 15,
        lineHeight: 13,
        fontWeight: 'bold',
    },

    textFrTyreTemperature: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },

    // --- RlTyre position ---

    textRlTyrePressure: {
        color: 'white',
        fontSize: 15,
        lineHeight: 13,
        fontWeight: 'bold',
    },

    textRlTyreTemperature: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },

    // --- RrTyre position ---

    textRrTyrePressure: {
        color: 'white',
        fontSize: 15,
        lineHeight: 13,
        fontWeight: 'bold',
    },

    textRrTyreTemperature: {
        color: 'white',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },
});