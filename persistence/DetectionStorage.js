import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DetectionStorage {
    async getPredictions(imgUri) {
        const jsonValue = await AsyncStorage.getItem(`prediction_${imgUri}`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }

    async savePredictions(imgUri, predictions) {
        const jsonValue = JSON.stringify(predictions);
        await AsyncStorage.setItem(`prediction_${imgUri}`, jsonValue);
    }
}