import React, { useEffect, useRef, useState } from 'react'
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  PixelRatio
} from 'react-native'

export default function DetectedImage ({ img, tags }) {
  const [boxes, setBoxes] = useState([])
  const image = useRef(null)

  useEffect(() => {
    if (!tags) return
    // Get the image size that's being rendered
    Image.getSize(img, (imageWidth, imageHeight) => {
      let newBoxes = []
      // go through the tag and each tag's metadata asynchronously
      //  to avoid having to deal with the callbacks internally
      // eg: image.current.measure in the renderImageWithBox function
      const allBoxPromises = tags.map(async (tag) => {
        return Promise.all(
          tag.metadata.map((prediction) =>
            renderImageWithBox(prediction, imageWidth, imageHeight)
          )
        ).then((boxes) => {
          newBoxes = newBoxes.concat(boxes)
        })
      })

      // Run all the promises at once to keep the speed intact
      Promise.all(allBoxPromises).then((_) => {
        setBoxes(newBoxes)
      })
    })
  }, [tags])

  // Takes in the prediction values, the original image width and height and returns a box element
  async function renderImageWithBox (prediction, imageWidth, imageHeight) {
    const box = {}

    const [boxLeft, boxTop, boxWidth, boxHeight] = prediction.bbox

    const deviceDimensions = Dimensions.get('window')

    // Image boundary after getting contained which is going to be less than
    // the image container thus giving us the needed constraints to calculate
    // the top offset

    const actualImageBoundary = {
      width: deviceDimensions.width,
      height: (deviceDimensions.width / imageWidth) * imageHeight
    }

    const renderedImageBoundary = await new Promise((resolve, reject) => {
      image.current.measure((x, y, width, height) => {
        resolve({ x, y, width, height })
      })
    })

    // Random error offset just there in case of padded or white bordered images
    const horizontalErrorOffset = 35
    const verticalErrorOffset = 10
    /**
     * section is divided in 3 parts, 2 parts without a value and 1 part being
     *  the actual image
     *  so part1 + part2 + imageHeight = fullSectionHeight
     *  assuming part1 and part2 to be x
     *  2x + imageHeight = fullSectionHeight
     *  x =( fullSectionHeight - imageHeight )/ 2
     *  x now represents the top of the image as that's where part 1 ends.
     */

    let imageTop =
      (renderedImageBoundary.height - actualImageBoundary.height) / 2

    // In case the image is already bigger than the container then just use the container top
    if (actualImageBoundary.height > renderedImageBoundary.height) {
      imageTop = 0
    }

    const minimumBoxHeight = 50
    const minimumBoxWidth = 50
    const topOffset = PixelRatio.roundToNearestPixel(
      boxTop + imageTop + verticalErrorOffset
    )
    const leftOffset = PixelRatio.roundToNearestPixel(
      boxLeft + horizontalErrorOffset
    )

    box.left = leftOffset
    box.top = topOffset
    box.width = boxWidth < minimumBoxWidth ? minimumBoxWidth : boxWidth
    box.height = boxHeight < minimumBoxHeight ? minimumBoxHeight : boxHeight
    box.name = prediction.class
    box.score = prediction.score
    return box
  }

  return (
    <ImageBackground
      source={{ uri: img }}
      resizeMode="contain"
      imageRef={image}
      style={{
        flex: 1
      }}
    >
      {boxes.map((box, index) => (
        <View style={[styles.rectangle, box]} key={box.top + box.left + index}>
          <Text style={styles.boxText}>
            {box.name} ({box.score.toFixed(2)})
          </Text>
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
