import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataDisplay = ({ imageLayout, baseImageWidth, position, textStyle, baseFontSize, value }) => {
    
    // 1. Calcul du style pour la View (le conteneur)
    const dynamicViewStyle = useMemo(() => {
        if (!imageLayout || !position) return null;

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
        };
    }, [imageLayout, position]);

    // 2. Calcul du style pour le Text (la police)
    const finalTextStyle = useMemo(() => {
        if (!imageLayout || !baseImageWidth) return textStyle;

        const LINE_HEIGHT_RATIO = 0.9;

        const dynamicFontSize = (baseFontSize / baseImageWidth) * imageLayout.width;
        const dynamicLineHeight = dynamicFontSize * LINE_HEIGHT_RATIO;

        
        return [StyleSheet.flatten(textStyle), 
            { 
                fontSize: dynamicFontSize,
                lineHeight: dynamicLineHeight

            }];

    }, [imageLayout, baseImageWidth, textStyle, baseFontSize]);

    // 3. Rendu du composant
    // Si la valeur est nulle ou la position non définie, on n'affiche rien.
    if (value === undefined || value === null || !dynamicViewStyle) {
        return null;
    }

    return (
        <View style={dynamicViewStyle}>
            <Text style={finalTextStyle}>{value}</Text>
        </View>
    );
};

export default DataDisplay;