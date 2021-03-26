export default class TaggedImage {
  constructor (imgMetadata, tags) {
    this.tags = tags
    this.imageMetadata = imgMetadata
  }

  get uri () {
    return this.imageMetadata.uri
  }

  get id () {
    return this.imageMetadata.uri
  }
}
