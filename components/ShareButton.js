import React, { useState } from 'react'
import { Alert, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import * as Sharing from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

/*
  handles sharing based on the asset provided https://docs.expo.io/versions/latest/sdk/asset
  - Checks if sharing is available on the platform
  - Moves the file from the global filesystem to a local document library
  - Initiates a file share
*/
export function ShareButton ({ asset, ...props }) {
  const shareIcon = Platform.OS === 'ios' ? 'share-outline' : 'share-social-sharp'
  const [loading, setLoading] = useState(false)
  const onShare = async () => {
    try {
      setLoading(true)
      const canShare = await Sharing.isAvailableAsync()

      if (!canShare) {
        // TODO: Notify user with a snackbar
        return
      }

      const localImageDetails = await MediaLibrary.getAssetInfoAsync(
        asset.imageMetadata
      )

      const assetUriParts = localImageDetails.uri.split('/')
      const assetName = assetUriParts[assetUriParts.length - 1]
      const uri = `${FileSystem.documentDirectory}/${assetName}`
      await FileSystem.copyAsync({
        from: asset.uri,
        to: uri
      })

      await Sharing.shareAsync(uri)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      // TODO: add a snackbar / toast to show a user sided error
      console.log({ err })
      Alert.alert('There was an error sharing the file')
    }
  }
  return (
    <TouchableOpacity
      onPress={!loading ? onShare : () => {}}
      style={styles.iconContainer}
    >
      {loading
        ? <ActivityIndicator size='small' color='black'/>
        : <Ionicons
        name={shareIcon}
        size={25}
        color="rgb(28, 28, 30)"
      />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 10
  }
})
