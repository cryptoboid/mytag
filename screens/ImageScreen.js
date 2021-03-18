import React from 'react';
import { useContext, useEffect, useState } from 'react';

import { Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import DetectedImage from '../components/DetectedImage';

export default function ImageScreen({route, navigation}) {

    const { predImg } = route.params;

    return (
        <View style={{flex:1}}>
            {predImg.predictions ?
                predImg.predictions.map(pred => <Text style={styles.text} key={pred.bbox[0]}>{pred.class} ({pred.score.toFixed(3)})</Text>) :
                <Text>NO PREDICTIONS FOUND!</Text>
            }
            <DetectedImage img={predImg.uri} predictions={predImg.predictions}/>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#ffffff',
        margin: 1.5,
        // height: Dimensions.get('window').height / 4.85,
        aspectRatio: 4/5,
      },
    text: {
        alignSelf: 'center',
        fontSize: 15,
        margin: 5
    }
})