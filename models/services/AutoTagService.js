import ObjectDetector from '../ObjectDetector'
import TaggedImage from '../TaggedImage'
import Tag from '../Tag'

export default class AutoTagService {
  constructor () {
    this.detector = new ObjectDetector()
  }

  async generateTags (img) {
    const predictions = await this.detector.classifyImage(img.uri)
    const tags = this._predictionsToTags(predictions)
    return new TaggedImage(img, tags)
  }

  _predictionsToTags (preds) {
    const tags = []

    if (preds.length === 0) {
      return [new Tag('unknown')]
    }

    for (const pred of preds) {
      let res = tags.find((tag) => tag.name === pred.class)
      if (!res) {
        res = new Tag(pred.class)
        tags.push(res)
      }

      res.addMetadata(pred)
    }

    return tags
  }
}
