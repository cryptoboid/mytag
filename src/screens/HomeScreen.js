/* global Platform,alert:readonly */
import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'

import * as MediaLibrary from 'expo-media-library'

import ImageGrid from '../components/ImageGrid'

import { Picker } from '@react-native-picker/picker'

import { TagsContext } from '../utils/TagsContext'
import LoadingClassificationsBar from '../components/LoadingClassificationsBar'

export default function HomeScreen () {
  const [selectedCategoryIndx, setSelectedCategoryIndx] = useState(0)
  const [imagesForThisCategory, setImagesForThisCategory] = useState([])
  const [foundTagNames, setFoundTagNames] = useState([])
  const [taggedPercentage, setTaggedPercentage] = useState(0.0)
  const tagsCollection = useContext(TagsContext)

  const getImages = async (album) => {
    const imgData = await MediaLibrary.getAssetsAsync({
      // first: 10,
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

  useEffect(() => {
    setImagesForThisCategory(
      tagsCollection.getCollectionWithName(foundTagNames[selectedCategoryIndx])
    )
  }, [foundTagNames, selectedCategoryIndx])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Picker
          selectedValue={selectedCategoryIndx}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategoryIndx(itemValue)
          }
          mode="dialog"
          prompt="Select a Tag"
        >
          {foundTagNames.map((tag, indx) => (
            <Picker.Item label={tag} value={indx} key={tag} />
          ))}
        </Picker>
        <Text style={styles.text}>
          Found {foundTagNames.length} tags
        </Text>
      </View>
      <ImageGrid taggedImgs={imagesForThisCategory} />
      <SafeAreaView>
        <LoadingClassificationsBar completedPercentage={taggedPercentage} />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 18,
    margin: 10,
    alignSelf: 'center'
  }
})
