import React, { useEffect, useState, useRef } from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'

export default function DetectedImage ({ imgMetadata, tags }) {
  const [boxes, setBoxes] = useState([])
  const imageRef = useRef();
  console.log(imgMetadata)

  useEffect(() => {
    if (!tags) return
    const newBoxes = []
    for (const tag of tags) {
      for (const pred of tag.metadata) {
        const box = {}
        box.left = pred.bbox[0] /// image.current.offsetWidth * 250;
        box.top = pred.bbox[1] /// image.current.offsetWidth * 250;
        box.width = '100%'//pred.bbox[2] /// image.current.offsetWidth * 250;
        box.height = '100%'//pred.bbox[3] /// image.current.offsetWidth * 250;
        box.name = pred.class
        box.score = pred.score
        newBoxes.push(box)
      }
    }

    setBoxes(newBoxes)
  }, [tags])

  // useEffect(() => {
  //   console.log(imageRef.current)
  // }, [imageRef])

  return (
    <View style={{ flex: 1 }}>
    <Image
      source={{ uri: imgMetadata.uri }}
      resizeMode="contain"
      style={styles.imgBackground}
      // ref={imageRef}

      // onLayout={event => {
      //   event.target.measure(
      //     (x, y, width, height, pageX, pageY) => {
      //       console.log(x,y,width,height,pageX,pageY)
      //     },
      //   );
      // }}
    />

    {boxes.map((box) => (
      <View style={[styles.rectangle, box]} key={box.top + box.score}>
        <Text style={styles.boxText}>{box.name} ({box.score.toFixed(2)})</Text>
      </View>
    ))}
    </View>
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
  },
  imgBackground: {
    width: "100%",
    height: "100%"
    // flex: 1
  }
})
