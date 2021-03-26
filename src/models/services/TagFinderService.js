import TaggedImage from '../TaggedImage'
import AutoTagService from './AutoTagService'
import TagsStorage from '../../persistence/TagsStorage'

export default class TagFinderService {
  constructor () {
    this.tagsStorage = new TagsStorage()
    this.autotagger = new AutoTagService()
  }

  async findTags (imgMetadata) {
    const storedTags = await this.tagsStorage.getTags(imgMetadata.uri)
    if (storedTags) {
      return new TaggedImage(imgMetadata, storedTags)
    }

    const taggedImage = await this.autotagger.generateTags(imgMetadata)
    this.tagsStorage.saveTags(taggedImage)
    return taggedImage
  }
}
