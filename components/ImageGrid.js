import { input } from '@tensorflow/tfjs';
import React from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import ImageItem from './ImageItem';

export default function ImageGrid({ predImages }) {
  const renderItem = ({ item }) => <ImageItem predImg={item} />;

  return (
    <View style={{ margin: 5, flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 40 }}
        style={styles.container}
        data={predImages}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + '-' + index}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
