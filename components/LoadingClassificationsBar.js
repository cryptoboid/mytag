import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Progress from 'expo-progress';

export default function LoadingClassificationsBar({completedPercentage}) {
    const [message, setMessage] = useState("Loading AI, please wait...");

    useEffect(() => {
        if (0 < completedPercentage && completedPercentage < 1) {
            setMessage(`Already classified ${(completedPercentage*100.0).toFixed(2)}% of images`);
        } else if (completedPercentage == 1) {
            setMessage("Done! :)");
        }
    }, [completedPercentage]);

    return (
        <View>
            <Text style={styles.text}>{message}</Text>
            {completedPercentage < 1 ? 
                <Progress.Bar
                    isIndeterminate={!completedPercentage}
                    progress={completedPercentage || 0.5}
                    color="#7fe7cc"/>
                : <View/>
            }
        </View> 
    );
}


const styles = StyleSheet.create({
    text: {
      textAlign: "center",
      fontStyle: 'italic'
    }
});
  