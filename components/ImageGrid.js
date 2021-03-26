import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ImageItem from './ImageItem'

export default function ImageGrid ({ taggedImgs }) {
  const renderItem = ({ item }) => <ImageItem img={item} />
  return (
    <View style={{ margin: 5, flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 40 }}
        style={styles.container}
        data={taggedImgs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
