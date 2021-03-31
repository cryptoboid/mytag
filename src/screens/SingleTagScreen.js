// /* global Platform,alert:readonly */
// import React, { useEffect, useState, useContext } from 'react'
// import { StyleSheet, View, Text, SafeAreaView } from 'react-native'

// import * as MediaLibrary from 'expo-media-library'

// import ImageGrid from '../components/ImageGrid'

// import { Picker } from '@react-native-picker/picker'

// import { TagsContext } from '../utils/TagsContext'
// import LoadingClassificationsBar from '../components/LoadingClassificationsBar'

// export default function SingleTagScreen () {
//   const [selectedCategoryIndx, setSelectedCategoryIndx] = useState(0)
//   const [imagesForThisCategory, setImagesForThisCategory] = useState([])
//   const [foundTagNames, setFoundTagNames] = useState([])
//   const [taggedPercentage, setTaggedPercentage] = useState(0.0)
//   const tagsCollection = useContext(TagsContext)

//   useEffect(() => {
//     setImagesForThisCategory(
//       tagsCollection.getCollectionWithName(foundTagNames[selectedCategoryIndx])
//     )
//   }, [foundTagNames, selectedCategoryIndx])

//   return (
//     <View style={styles.container}>
//       <View style={{ flexDirection: 'row' }}>
//         <Picker
//           selectedValue={selectedCategoryIndx}
//           style={{ height: 50, width: 150 }}
//           onValueChange={(itemValue, itemIndex) =>
//             setSelectedCategoryIndx(itemValue)
//           }
//           mode="dialog"
//           prompt="Select a Tag"
//         >
//           {foundTagNames.map((tag, indx) => (
//             <Picker.Item label={tag} value={indx} key={tag} />
//           ))}
//         </Picker>
//         <Text style={styles.text}>
//           Found {foundTagNames.length} tags
//         </Text>
//       </View>
//       <ImageGrid taggedImgs={imagesForThisCategory} />
//       <SafeAreaView>
//         <LoadingClassificationsBar completedPercentage={taggedPercentage} />
//       </SafeAreaView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   text: {
//     fontSize: 18,
//     margin: 10,
//     alignSelf: 'center'
//   }
// })
