import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ImageItem from './ImageItem'

export default function ImageGrid ({ taggedImgs }) {
  const renderItem = ({ item }) => <ImageItem img={item} />
  return (
      <FlatList
        contentContainerStyle={styles.container}
        data={taggedImgs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40
  }
})
