/* global Platform,alert:readonly */
import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'

import * as MediaLibrary from 'expo-media-library'

import ImageGrid from '../components/ImageGrid'

import { Picker } from '@react-native-picker/picker'

import { CategoriesContext } from '../utils/CategoriesContext'
import LoadingClassificationsBar from '../components/LoadingClassificationsBar'

export default function HomeScreen () {
  const [selectedCategoryIndx, setSelectedCategoryIndx] = useState(0)
  const [imagesForThisCategory, setImagesForThisCategory] = useState([])
  const [foundCategories, setFoundCategories] = useState([])
  const [classifiedPercentage, setClassifiedPercentage] = useState(0.0)
  const categoriesGrouper = useContext(CategoriesContext)

  const getImages = async (album) => {
    const imgData = await MediaLibrary.getAssetsAsync({
      // first: 10,
      album: album.id,
      mediaType: MediaLibrary.MediaType.photo
    })

    return imgData.assets
  }

  const notifyCategories = (newFoundCategories, newPercentage) => {
    setFoundCategories(newFoundCategories)
    setClassifiedPercentage(newPercentage)
  }

  const getAlbums = async () => {
    const albums = await MediaLibrary.getAlbumsAsync()
    let allImages = []

    for (const album of albums) {
      allImages = allImages.concat(await getImages(album))
    }

    categoriesGrouper.useImages(allImages, notifyCategories)
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
      categoriesGrouper.getForCategory(foundCategories[selectedCategoryIndx])
    )
  }, [foundCategories, selectedCategoryIndx])

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
          prompt="Select a Category"
        >
          {foundCategories.map((categ, indx) => (
            <Picker.Item label={categ} value={indx} key={categ} />
          ))}
        </Picker>
        <Text style={styles.text}>
          Found {foundCategories.length} categories
        </Text>
      </View>
      <ImageGrid predImages={imagesForThisCategory} />
      <SafeAreaView>
        <LoadingClassificationsBar completedPercentage={classifiedPercentage} />
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
