import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import ImageGrid from '../components/ImageGrid'

import { TagsContext } from '../utils/TagsContext'

export default function BrowseImagesScreen ({ route, navigation }) {
  const { tagName } = route.params
  const [imagesForThisTag, setImagesForThisTag] = useState([])
  const tagsCollection = useContext(TagsContext)

  const notifyNewImages = (newImages) => {
    setImagesForThisTag(newImages)
  }

  useEffect(() => {
    navigation.setOptions({ title: tagName })

    const images = tagsCollection.getCollectionWithName(tagName)
    setImagesForThisTag(images)

    tagsCollection.setImageListenerForTag(tagName, notifyNewImages)
  }, [])

  return (
    <View style={styles.container}>
      <ImageGrid taggedImgs={imagesForThisTag}/>
      {/* <SafeAreaView>
        <LoadingClassificationsBar completedPercentage={taggedPercentage} />
      </SafeAreaView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
