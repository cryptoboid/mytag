class PredictedImage {
    constructor(imgMetadata, predictionResult) {
        this.predictions = predictionResult;
        this.imageMetadata = imgMetadata;
    }
}

export default PredictedImage;