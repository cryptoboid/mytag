import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import ImageGrid from '../components/ImageGrid'
import { TagsContext } from '../utils/TagsContext'
import toTitleCase from '../utils/ToTitleCase'

export default function BrowseImagesScreen ({ route, navigation }) {
  const { tagName } = route.params
  const [imagesForThisTag, setImagesForThisTag] = useState([])
  const tagsCollection = useContext(TagsContext)

  const notifyNewImages = (newImages) => {
    setImagesForThisTag(newImages)
  }

  useEffect(() => {
    const images = tagsCollection.getCollectionWithName(tagName)
    setImagesForThisTag(images)

    tagsCollection.setImageListenerForTag(tagName, notifyNewImages)
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({ title: toTitleCase(tagName) })
  }, [navigation])

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
