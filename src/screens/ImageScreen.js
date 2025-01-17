import React, { useLayoutEffect } from 'react'

import { Text, View, StyleSheet } from 'react-native'
import { ShareButton } from '../components/ShareButton'
import DetectedImage from '../components/DetectedImage'
import { useColorScheme } from 'react-native-appearance'
import { DarkTheme, LightTheme } from '../config/themes'

export default function ImageScreen ({ route, navigation }) {
  const { taggedImg } = route.params
  const colorScheme = useColorScheme()

  const getPredictionsText = (tagsArray) => {
    return tagsArray.map(tag => <Text style={getTextStyle(colorScheme)} key={tag.name}>{tag.name} (x{tag.metadata.length})</Text>)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: function share () { return <ShareButton asset={taggedImg}/> }
    })
  }, [navigation])

  return (
        <View style={{ flex: 1 }}>
            {taggedImg.tags
              ? getPredictionsText(taggedImg.tags)
              : <Text>NO PREDICTIONS FOUND!</Text>
            }
            <DetectedImage img={taggedImg.uri} tags={taggedImg.tags}/>
        </View>
  )
}

// Get dynamic text styling , separated to avoid adding everything inline in future
const getTextStyle = (colorScheme) => {
  const { colors } = colorScheme === 'light' || colorScheme === 'no-preference' ? LightTheme : DarkTheme
  return [
    styles.text,
    {
      color: colors.text
    }
  ]
}

const styles = StyleSheet.create({
  item: {
    margin: 1.5,
    // height: Dimensions.get('window').height / 4.85,
    aspectRatio: 4 / 5
  },
  text: {
    alignSelf: 'center',
    fontSize: 15,
    margin: 5
  }
})
