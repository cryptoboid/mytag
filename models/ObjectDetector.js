import * as ImageManipulator from "expo-image-manipulator";

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as cocossd from '@tensorflow-models/coco-ssd'
import * as jpeg from 'jpeg-js'

import * as FileSystem from 'expo-file-system';

import PredictedImage from "./PredictedImage";

export default class ObjectDetector {
    constructor() {
        this.model = null;
        this.backendReady = false;
        this.DETECTION_CACHE = {};
        this.initBackend();
    }

    async initBackend() {
      await tf.ready();
      console.log("Finished loading TF");
      
      this.model = await cocossd.load();
      console.log("Finished loading COCO");

      this.backendReady = true;
    }

    _isDetectorReady() {
      return this.backendReady && this.model;
    }

    async classifyImage(image) {
        if (this.DETECTION_CACHE[image.uri] != null) {
          return this.DETECTION_CACHE[image.uri];
        }

        if (!this._isDetectorReady()) return {};

        const imageTensor = await _uriToTensor(image.uri);
        const predictions = await this.model.detect(imageTensor);

        // console.log("PRED", predictions);
        this.DETECTION_CACHE[image.uri] = predictions;

        let result = new PredictedImage(image, predictions);
        return result;
    }
}


async function _uriToTensor(uri) {

    const manipResponse = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 400 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
        
    const imgB64 = await FileSystem.readAsStringAsync(manipResponse.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const rawImageData = new Uint8Array(imgBuffer);

    const TO_UINT8ARRAY = true
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3)
    let offset = 0 // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset]
      buffer[i + 1] = data[offset + 1]
      buffer[i + 2] = data[offset + 2]

      offset += 4
    }

    // this.setState( {imgWidth: width, imgHeight: height} )

    return tf.tensor3d(buffer, [height, width, 3]);
}