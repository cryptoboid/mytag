export default class Tag {
  constructor (name, metadata) {
    this.name = name
    this.metadata = metadata || []
  }

  addMetadata (newMeta) {
    this.metadata.push(newMeta)
  }
}
