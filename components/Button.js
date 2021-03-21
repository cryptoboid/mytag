import React from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';

/* 
  handles sharing based on the asset provided https://docs.expo.io/versions/latest/sdk/asset 
  - Checks if sharing is available on the platform 
  - Moves the file from the global filesystem to a local document library
  - Initiates a file share 
*/
export const ShareButton = ({ asset, ...props }) => {
  const [loading, setLoading] = useState(false);
  const onShare = async () => {
    try {
      setLoading(true);
      const canShare = await Sharing.isAvailableAsync();

      if (!canShare) {
        // TODO: Notify user with a snackbar
        return;
      }

      const localImageDetails = await MediaLibrary.getAssetInfoAsync(
        asset.imageMetadata
      );

      let assetUriParts = localImageDetails.uri.split('/');
      let assetName = assetUriParts[assetUriParts.length - 1];
      let uri = `${FileSystem.documentDirectory}/${assetName}`;
      await FileSystem.copyAsync({
        from: asset.uri,
        to: uri,
      });

      await Sharing.shareAsync(uri);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // TODO: add a snackbar / toast to show a user sided error
      console.log({ err });
      Alert.alert('There was an error sharing file');
    }
  };
  return (
    <TouchableOpacity
      onPress={!loading ? onShare : () => {}}
      style={styles.iconContainer}
    >
      <Feather
        name={!loading ? 'share' : 'loader'}
        size={25}
        color="#fff"
      ></Feather>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 8,
  },
});
