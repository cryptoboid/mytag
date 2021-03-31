import React from 'react'
import { Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function ImageItem ({ img }) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Image', { taggedImg: img })}
      style={styles.item}
    >
      <Image source={{ uri: img.uri }} style={styles.imgItem} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: { padding: 0.75, aspectRatio: 4 / 5, width: Dimensions.get('window').width / 3 },
  imgItem: {
    backgroundColor: '#ffffff',
    flex: 1
  }
})
