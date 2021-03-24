class PredictedImage {
  constructor (imgMetadata, predictionResult) {
    this.predictions = predictionResult
    this.imageMetadata = imgMetadata
  }

  get uri () {
    return this.imageMetadata.uri
  }

  get id () {
    return this.imageMetadata.uri
  }
}

export default PredictedImage
