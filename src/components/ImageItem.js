import React from 'react'
import { Image, Dimensions, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useNavigation } from '@react-navigation/native'

export default function ImageItem ({ img }) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Image', { taggedImg: img })}
    >
      <Image source={{ uri: img.uri }} style={styles.item} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    margin: 1.5,
    height: Dimensions.get('window').height / 4.85,
    aspectRatio: 4 / 5
  }
})
