import React, { useEffect, useState } from 'react'
import { ImageBackground, View, Text, StyleSheet } from 'react-native'

export default function DetectedImage ({ img, tags }) {
  const [boxes, setBoxes] = useState([])
  // const image = useRef(null);

  useEffect(() => {
    if (!tags) return
    const newBoxes = []
    for (const tag of tags) {
      for (const pred of tag.metadata) {
        const box = {}
        box.left = pred.bbox[0] /// image.current.offsetWidth * 250;
        box.top = pred.bbox[1] /// image.current.offsetWidth * 250;
        box.width = pred.bbox[2] /// image.current.offsetWidth * 250;
        box.height = pred.bbox[3] /// image.current.offsetWidth * 250;
        box.name = pred.class
        box.score = pred.score
        newBoxes.push(box)
      }
    }

    setBoxes(newBoxes)
  }, [tags])

  return (
    <ImageBackground
      source={{ uri: img }}
      resizeMode="contain"
      style={{ flex: 1 }}
    >
      {boxes.map((box) => (
        <View style={[styles.rectangle, box]} key={box.top + box.left}>
          <Text style={styles.boxText}>{box.name} ({box.score.toFixed(2)})</Text>
        </View>
      ))}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  rectangle: {
    height: 128,
    width: 128,
    borderColor: 'aquamarine',
    borderWidth: 5,
    position: 'absolute',
    top: '0%',
    left: '0%'
  },
  boxText: {
    fontSize: 10,
    backgroundColor: 'aquamarine'
  }
})
