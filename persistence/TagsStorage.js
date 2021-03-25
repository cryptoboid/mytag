import AsyncStorage from '@react-native-async-storage/async-storage'
import TaggedImageAdapter from './adapters/TaggedImageAdapter'

export default class TagsStorage {
  async getTags (imgUri) {
    const jsonValue = await AsyncStorage.getItem(`tags_${imgUri}`)
    return jsonValue != null ? TaggedImageAdapter.jsonToTags(jsonValue) : null
  }

  async saveTags (taggedImg) {
    const json = TaggedImageAdapter.tagsToJSON(taggedImg.tags)
    await AsyncStorage.setItem(`tags_${taggedImg.uri}`, json)
  }
}
