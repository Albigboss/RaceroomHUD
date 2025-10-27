import React, { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

/*const DataDisplay = ({ imageLayout, baseImageWidth, position, textStyle, baseFontSize, value }) => {
    
    // 1. Calcul du style pour la View (le conteneur)
    const dynamicViewStyle = useMemo(() => {
        if (!imageLayout || !position) return null

        return {
            position: 'absolute',
            top: imageLayout.y + (imageLayout.height * position.top / 100),
            left: imageLayout.x + (imageLayout.width * position.left / 100),
            width: imageLayout.width * (position.width / 100),
            height: imageLayout.height * (position.height / 100),
            // On peut ajouter ici des styles par défaut si besoin
            justifyContent: 'center',
            alignItems: 'center',
            //borderColor: 'red',
            //borderWidth: 1,
        }
    }, [imageLayout, position])

    // 2. Calcul du style pour le Text (la police)
    const finalTextStyle = useMemo(() => {
        if (!imageLayout || !baseImageWidth) return textStyle

        const LINE_HEIGHT_RATIO = 0.9

        const dynamicFontSize = (baseFontSize / baseImageWidth) * imageLayout.width
        const dynamicLineHeight = dynamicFontSize * LINE_HEIGHT_RATIO

        
        return [StyleSheet.flatten(textStyle), 
            { 
                fontSize: dynamicFontSize,
                lineHeight: dynamicLineHeight

            }]

    }, [imageLayout, baseImageWidth, textStyle, baseFontSize])

    // 3. Rendu du composant
    // Si la valeur est nulle ou la position non définie, on n'affiche rien.
    if (value === undefined || value === null || !dynamicViewStyle) {
        return null
    }

    return (
        <View style={dynamicViewStyle}>
            <Text style={finalTextStyle}>{value}</Text>
        </View>
    )
}*/



const DataDisplay = ({ imageLayout, baseImageWidth, value, config: { position, textStyle, baseFontSize } }) => {

    // 1. Calcul du style pour la View (le conteneur)
    const dynamicViewStyle = useMemo(() => {
        if (!imageLayout || !position) return null

        return {
            position: 'absolute',
            top: imageLayout.y + (imageLayout.height * position.top / 100),
            left: imageLayout.x + (imageLayout.width * position.left / 100),
            width: imageLayout.width * (position.width / 100),
            height: imageLayout.height * (position.height / 100),
            // On peut ajouter ici des styles par défaut si besoin
            justifyContent: 'center',
            alignItems: 'center',
            //borderColor: 'red',
            //borderWidth: 1,
        }
    }, [imageLayout, position])

    // 2. Calcul du style pour le Text (la police)
    const finalTextStyle = useMemo(() => {
        if (!imageLayout || !baseImageWidth) return textStyle

        const LINE_HEIGHT_RATIO = 0.9

        const dynamicFontSize = (baseFontSize / baseImageWidth) * imageLayout.width
        const dynamicLineHeight = dynamicFontSize * LINE_HEIGHT_RATIO


        return [StyleSheet.flatten(textStyle),
        {
            fontSize: dynamicFontSize,
            lineHeight: dynamicLineHeight

        }]

    }, [imageLayout, baseImageWidth, textStyle, baseFontSize])

    // 3. Rendu du composant
    // Si la valeur est nulle ou la position non définie, on n'affiche rien.
    if (value === undefined || !dynamicViewStyle) {
        return null
    }

    return (
        <View style={dynamicViewStyle}>
            <Text style={finalTextStyle}>{value == null ? '---' : value}</Text>
        </View>
    )
}

export default DataDisplay


export const GearDisplay = ({ value, ...otherProps }) => {

    let gearValue = 'X'

    switch (value) {
        case -2:
            gearValue = '-'
            break
        case -1:
            gearValue = 'R'
            break
        case 0:
            gearValue = 'N'
            break
        case null:
            gearValue = '-'
            break
        default:
            gearValue = value
    }

    return (
        <DataDisplay
            {...otherProps}
            value={gearValue}
        />
    )
}

export const PercentageDisplay = ({ value, ...otherProps }) => {

    let percentageValue = '--%'

    if (value != null) {
        percentageValue = (value * 100).toFixed(0)
    }

    return (
        <DataDisplay
            {...otherProps}
            value={percentageValue}
        />
    )
}

export const ToFixedDisplay = ({ value, postComaDigits = 0, ...otherProps }) => {

    return (
        <DataDisplay
            {...otherProps}
            value={(value == null) ? '---' : value.toFixed(postComaDigits)}
        />
    )

}

export const FuelLapRemaining = ({ remainingFuel = null, fuelPerLap = null, ...otherProps }) => {

    let valueToReturn = '---'

    if (remainingFuel != null && fuelPerLap != null) {
        valueToReturn = ((parseFloat(gameData.remainingFuel) / parseFloat(gameData.fuelPerLap)).toFixed(1))
    }

    return (
        <DataDisplay
            {...otherProps}
            value={valueToReturn}
        />
    )

}

export const LapTimeDisplay = ({ value, ...otherProps }) => {

    if (value != null) {
        const duration = value
        const minutes = Math.floor(duration / 60)
        const seconds = Math.floor(duration % 60)
        const milliseconds = Math.round((duration - Math.floor(duration)) * 1000)

        // On formate avec des zéros devant si besoin
        const mm = String(minutes).padStart(2, '0')
        const ss = String(seconds).padStart(2, '0')
        const mmm = String(milliseconds).padStart(3, '0')

        return (
            <DataDisplay
                {...otherProps}
                value={mm + ':' + ss + '.' + mmm}
            />
        )
    }
    else {
        return (
            <DataDisplay
                {...otherProps}
                value={'--:--.---'}
            />
        )
    }
}

export const DeltaBestLapTimeDisplay = ({ value, config, ...otherProps }) => {

    let valueToReturn
    let configToReturn

    if (value != null) {

        valueToReturn = (value < 0 ? '' : '+') + value.toFixed(3)

        configToReturn = {
            ...config,
            textStyle: [config.textStyle, { color: parseFloat(value) < 0 ? 'green' : 'red' }]
        }
    }
    else {
        valueToReturn = '+-.---'
        configToReturn = {
            ...config,
            textStyle: [config.textStyle, { color: 'white' }]
        }
    }

    return (
        <DataDisplay
            {...otherProps}
            value={valueToReturn}
            config={configToReturn}
        />
    )
}

export const PredictedTimeDisplay = ({ bestLap, deltaBestLap, ...otherProps }) => {

    if (bestLap != null && deltaBestLap != null) {
        const predictedTime = bestLap + deltaBestLap;
        const minutes = Math.floor(predictedTime / 60);
        const seconds = Math.floor(predictedTime % 60);
        const milliseconds = Math.round((predictedTime - Math.floor(predictedTime)) * 1000);

        // On formate avec des zéros devant si besoin
        const mm = String(minutes).padStart(2, '0');
        const ss = String(seconds).padStart(2, '0');
        const mmm = String(milliseconds).padStart(3, '0');

        return (
            <LapTimeDisplay
                value={predictedTime}
                {...otherProps}
            />
        )
    }
    else
    {
        return (
            <LapTimeDisplay
                value={null}
                {...otherProps}
            />
        )
    }
}

export const TyreTempDisplay = ({ value, ...otherProps}) => {

    let valueToReturn = '---.-°C'

    if(value != null)
    {
        valueToReturn = value.toFixed(1) + '°C'
    }

    return (
        <DataDisplay
            value={valueToReturn}
            {...otherProps}
        />
    )
}