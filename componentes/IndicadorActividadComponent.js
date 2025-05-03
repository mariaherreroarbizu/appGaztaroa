import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { colorGaztaroaOscuro } from '../comun/comun';
import { stylesIndicadorActividad } from './StyleComponents.js';

export const IndicadorActividad = () => {
    return(
        <View style={stylesIndicadorActividad.indicadorView} >
            <ActivityIndicator size="large" color={colorGaztaroaOscuro} />
            <Text style={stylesIndicadorActividad.indicadorText} >En proceso . . .</Text>
        </View>
    );
};
