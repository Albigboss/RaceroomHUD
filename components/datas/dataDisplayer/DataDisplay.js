import React, { useMemo } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const DataDisplay = ({ imageLayout, baseImageWidth, value, config: { position, textStyle, baseFontSize, backgroundColor = null } }) => {

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
            backgroundColor: backgroundColor!=null?`${backgroundColor}`:'none',
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
        valueToReturn = ((parseFloat(remainingFuel) / parseFloat(fuelPerLap)).toFixed(1))
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
    else {
        return (
            <LapTimeDisplay
                value={null}
                {...otherProps}
            />
        )
    }
}

export const TyreTempDisplay = ({ value, ...otherProps }) => {

    let valueToReturn = '---.-°C'

    if (value != null) {
        valueToReturn = value.toFixed(1) + '°C'
    }

    return (
        <DataDisplay
            value={valueToReturn}
            {...otherProps}
        />
    )
}

export const HeadLightDisplay = ({ imageLayout, value, config: { position, link } }) => {

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
        }
    }, [imageLayout, position])

    const getImageSource = (link) => {
        switch (link) {
            case 1:
                return require('../../../assets/images/otherImages/HeadLightporsche911GT3R.png');
            default:
                return null
        }
    };

    // Dans votre composant :
    const image = getImageSource(link);

    if (image == null || value == null || value == 0) {
        return null
    }

    return (

        <View style={dynamicViewStyle}>
            <Image source={image} style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
            }}
            />
        </View>
    );
}

export const BrakeDisplay = ({ value, optimalTemp, hotTemp, coldTemp, config, ...otherProps }) => {

    let r, g, b, configToReturn;

    // Définition des couleurs clés
    const coldColor = { r: 0, g: 0, b: 139 };      // Bleu foncé
    const optimalColor = { r: 0, g: 137, b: 0 }; // Vert clair
    const hotColor = { r: 255, g: 0, b: 0 };      // Rouge

    if (value == null) {
        r = 255
        g = 255
        b = 255
    }
    else if (value <= coldTemp) {
        // Si la température est inférieure ou égale à la température froide, on retourne le bleu foncé
        [r, g, b] = [coldColor.r, coldColor.g, coldColor.b];
    } else if (value >= hotTemp) {
        // Si la température est supérieure ou égale à la température chaude, on retourne le rouge
        [r, g, b] = [hotColor.r, hotColor.g, hotColor.b];
    } else if (value < optimalTemp) {
        // Calcul de l'interpolation entre la température froide et la température optimale
        const ratio = (value - coldTemp) / (optimalTemp - coldTemp);
        r = Math.round(coldColor.r + ratio * (optimalColor.r - coldColor.r));
        g = Math.round(coldColor.g + ratio * (optimalColor.g - coldColor.g));
        b = Math.round(coldColor.b + ratio * (optimalColor.b - coldColor.b));
    } else { // value >= optimalTemp
        // Calcul de l'interpolation entre la température optimale et la température chaude
        const ratio = (value - optimalTemp) / (hotTemp - optimalTemp);
        r = Math.round(optimalColor.r + ratio * (hotColor.r - optimalColor.r));
        g = Math.round(optimalColor.g + ratio * (hotColor.g - optimalColor.g));
        b = Math.round(optimalColor.b + ratio * (hotColor.b - optimalColor.b));
    }

    configToReturn = {
        ...config,
        textStyle: [config.textStyle, { color: `rgb(${r}, ${g}, ${b})` }],
    }

    return (
        <DataDisplay
            {...otherProps}
            value={(value != null) ? (value.toFixed(0) + '°C') : ('---°C')}
            config={configToReturn}
        />
    )
}

export const TyreTempDisplayWithColor = ({ value, optimalTemp, hotTemp, coldTemp, config, ...otherProps }) => {

    let r, g, b, configToReturn;

    // Définition des couleurs clés
    const coldColor = { r: 0, g: 0, b: 139 };      // Bleu foncé
    const optimalColor = { r: 0, g: 137, b: 0 }; // Vert clair
    const hotColor = { r: 255, g: 0, b: 0 };      // Rouge

    if (value == null) {
        r = 0
        g = 0
        b = 0

        configToReturn = {
            ...config,
            backgroundColor: null,
        }
    }
    else if (value <= coldTemp) {
        // Si la température est inférieure ou égale à la température froide, on retourne le bleu foncé
        [r, g, b] = [coldColor.r, coldColor.g, coldColor.b];
    } else if (value >= hotTemp) {
        // Si la température est supérieure ou égale à la température chaude, on retourne le rouge
        [r, g, b] = [hotColor.r, hotColor.g, hotColor.b];
    } else if (value < optimalTemp) {
        // Calcul de l'interpolation entre la température froide et la température optimale
        const ratio = (value - coldTemp) / (optimalTemp - coldTemp);
        r = Math.round(coldColor.r + ratio * (optimalColor.r - coldColor.r));
        g = Math.round(coldColor.g + ratio * (optimalColor.g - coldColor.g));
        b = Math.round(coldColor.b + ratio * (optimalColor.b - coldColor.b));
    } else { // value >= optimalTemp
        // Calcul de l'interpolation entre la température optimale et la température chaude
        const ratio = (value - optimalTemp) / (hotTemp - optimalTemp);
        r = Math.round(optimalColor.r + ratio * (hotColor.r - optimalColor.r));
        g = Math.round(optimalColor.g + ratio * (hotColor.g - optimalColor.g));
        b = Math.round(optimalColor.b + ratio * (hotColor.b - optimalColor.b));
    }

    if(value != null)
    {
        configToReturn = {
            ...config,
            backgroundColor: `rgb(${r}, ${g}, ${b})`,
        }
    }


    return(
        <TyreTempDisplay
            value={value}
            config={configToReturn}
            {...otherProps}
        />
    )
}






export const EngineDamageDisplay = ({ imageLayout, value, config: {position} }) => {

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
        }
    }, [imageLayout, position])

    const getImageSource = (value) => {

        if(value == -1.0 || value == null)
        {
            return require('../../../assets/images/otherImages/engineDamageWhite.png');
        }
        else if(value < 0.33)
        {
            return require('../../../assets/images/otherImages/engineDamageGreen.png');
        }
        else if(value < 0.66)
        {
            return require('../../../assets/images/otherImages/engineDamageYellow.png');
        }
        else if(value <= 1.0)
        {
            return require('../../../assets/images/otherImages/engineDamageRed.png');
        }
        else 
        {
            return require('../../../assets/images/otherImages/engineDamageBlack.png');
        }
    };

    // Dans votre composant :
    const image = getImageSource(value);

    if (image == null) {
        return null
    }

    return (

        <View style={dynamicViewStyle}>
            <Image source={image} style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
            }}
            />
        </View>
    );
}

export const GearBoxDamageDisplay = ({ imageLayout, value, config: {position} }) => {

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
        }
    }, [imageLayout, position])

    const getImageSource = (value) => {

        if(value == -1.0 || value == null)
        {
            return require('../../../assets/images/otherImages/gearboxDamageWhite.png');
        }
        else if(value < 0.33)
        {
            return require('../../../assets/images/otherImages/gearboxDamageGreen.png');
        }
        else if(value < 0.66)
        {
            return require('../../../assets/images/otherImages/gearboxDamageYellow.png');
        }
        else if(value <= 1.0)
        {
            return require('../../../assets/images/otherImages/gearboxDamageRed.png');
        }
        else 
        {
            return require('../../../assets/images/otherImages/gearboxDamageBlack.png');
        }
    };

    // Dans votre composant :
    const image = getImageSource(value);

    if (image == null) {
        return null
    }

    return (

        <View style={dynamicViewStyle}>
            <Image source={image} style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
            }}
            />
        </View>
    );
}

export const AerodynamicDamageDisplay = ({ imageLayout, value, config: {position} }) => {

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
        }
    }, [imageLayout, position])

    const getImageSource = (value) => {

        if(value == -1.0 || value == null)
        {
            return require('../../../assets/images/otherImages/aeroDamageWhite.png');
        }
        else if(value < 0.33)
        {
            return require('../../../assets/images/otherImages/aeroDamageGreen.png');
        }
        else if(value < 0.66)
        {
            return require('../../../assets/images/otherImages/aeroDamageYellow.png');
        }
        else if(value <= 1.0)
        {
            return require('../../../assets/images/otherImages/aeroDamageRed.png');
        }
        else 
        {
            return require('../../../assets/images/otherImages/aeroDamageBlack.png');
        }
    };

    // Dans votre composant :
    const image = getImageSource(value);

    if (image == null) {
        return null
    }

    return (

        <View style={dynamicViewStyle}>
            <Image source={image} style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
            }}
            />
        </View>
    );
}

export const SuspensionDamageDisplay = ({ imageLayout, value, config: {position} }) => {

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
        }
    }, [imageLayout, position])

    const getImageSource = (value) => {

        if(value == -1.0 || value == null)
        {
            return require('../../../assets/images/otherImages/suspensionDamageWhite.png');
        }
        else if(value < 0.33)
        {
            return require('../../../assets/images/otherImages/suspensionDamageGreen.png');
        }
        else if(value < 0.66)
        {
            return require('../../../assets/images/otherImages/suspensionDamageYellow.png');
        }
        else if(value <= 1.0)
        {
            return require('../../../assets/images/otherImages/suspensionDamageRed.png');
        }
        else 
        {
            return require('../../../assets/images/otherImages/suspensionDamageBlack.png');
        }
    };

    // Dans votre composant :
    const image = getImageSource(value);

    if (image == null) {
        return null
    }

    return (

        <View style={dynamicViewStyle}>
            <Image source={image} style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
            }}
            />
        </View>
    );
}