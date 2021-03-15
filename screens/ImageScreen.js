import React from 'react';
import { useContext, useEffect, useState } from 'react';

import { Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import DetectedImage from '../components/DetectedImage';

// import ObjectDetector from '../models/ObjectDetector';
import { DetectorContext } from '../utils/DetectorContext';

export default function ImageScreen({route, navigation}) {

    const { uri } = route.params;
    const [predictions, setPredictions] = useState(null);
    const detector = useContext(DetectorContext);

    const classify = async () => {
        const preds = await detector.classifyImage(uri);
        setPredictions(preds);
    }

    useEffect(() => {
        classify();
    }, []);

    return (
        <View style={{flex:1}}>
            {predictions ?
                predictions.map(pred => <Text style={styles.text} key={pred.bbox[0]}>{pred.class}</Text>) :
                <ActivityIndicator color="#0000ff" style={{margin: 20}}/>
            }
            <DetectedImage img={uri} predictions={predictions}/>
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
        fontSize: 10,
        margin: 5
    }
})