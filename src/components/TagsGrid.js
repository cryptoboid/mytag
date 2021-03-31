import React, { useContext } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import { TagsContext } from '../utils/TagsContext'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import toTitleCase from '../utils/ToTitleCase'

export default function TagsGrid ({ foundTagNames }) {
  const tagsCollection = useContext(TagsContext)
  const navigation = useNavigation()

  const renderItem = ({ item }) => {
    const img = tagsCollection.getCoverImageForTag(item)

    if (!img) return <View/>

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('BrowseImages', { tagName: item })}
        style={styles.item}
      >
        <ImageBackground source={{ uri: img.uri }} style={styles.imgItem} imageStyle={styles.imgContainer}>
          <LinearGradient
            style={styles.overImgContainer}
            colors={['#201f1f3b', '#201f1fd9']}
            start={{ x: 0.5, y: 0.55 }}
            end={{ x: 0.5, y: 1 }}
          >
            <Text style={styles.tagText}>{toTitleCase(item)}</Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={foundTagNames}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      numColumns={2}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingTop: 6
    // alignItems: 'center',
  },
  item: {
    margin: 10,
    width: Dimensions.get('window').width / 2,
    aspectRatio: 1,
    flex: 1
  },
  imgItem: {
    // width: Dimensions.get('window').width / 2.35,
    // aspectRatio: 1,
    flex: 1
  },
  imgContainer: {
    borderRadius: 20,
    justifyContent: 'center'
    // flex: 1
  },
  overImgContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    borderRadius: 20

  },
  tagText: {
    color: 'white',
    paddingBottom: 10,
    fontWeight: 'bold'
  }
})
