import Tag from '../../models/Tag'

export default class TaggedImageAdapter {
  static tagsToJSON (tags) {
    const array = []
    for (const tag of tags) {
      array.push({ name: tag.name, metadata: tag.metadata })
    }
    return JSON.stringify(array)
  }

  static jsonToTags (jsonValue) {
    const array = JSON.parse(jsonValue)
    const tags = []
    for (const obj of array) {
      const newTag = new Tag(obj.name, obj.metadata)
      tags.push(newTag)
    }

    return tags
  }
}
