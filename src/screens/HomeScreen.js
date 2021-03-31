/* global Platform,alert:readonly */
import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'

import * as MediaLibrary from 'expo-media-library'

import { TagsContext } from '../utils/TagsContext'
import LoadingClassificationsBar from '../components/LoadingClassificationsBar'
import TagsGrid from '../components/TagsGrid'

export default function HomeScreen () {
  const [foundTagNames, setFoundTagNames] = useState([])
  const [taggedPercentage, setTaggedPercentage] = useState(0.0)
  const tagsCollection = useContext(TagsContext)

  const getImages = async (album) => {
    const imgData = await MediaLibrary.getAssetsAsync({
      album: album.id,
      mediaType: MediaLibrary.MediaType.photo
    })

    return imgData.assets
  }

  const notifyTags = (newFoundNames, newPercentage) => {
    setFoundTagNames(newFoundNames)
    setTaggedPercentage(newPercentage)
  }

  const getAlbums = async () => {
    const albums = await MediaLibrary.getAlbumsAsync()
    let allImages = []

    for (const album of albums) {
      allImages = allImages.concat(await getImages(album))
    }

    tagsCollection.useImages(allImages, notifyTags)
  }

  useEffect(() => {
    const getPermissionAsync = async () => {
      if (Platform.OS !== 'web') {
        const permission = await MediaLibrary.requestPermissionsAsync()
        if (permission.status !== 'granted') {
          alert('Sorry, we need media permissions to make this work!')
        } else {
          getAlbums()
        }
      }
    }

    getPermissionAsync()
  }, [])

  return (
    <View style={styles.container}>
      <TagsGrid
        foundTagNames={foundTagNames}
      />
      <SafeAreaView>
        <LoadingClassificationsBar completedPercentage={taggedPercentage} />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
