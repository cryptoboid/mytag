import React from 'react';
import {Text, FlatList, SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import ImageItem from './ImageItem';

export default function ImageGrid({inputData}) {
    const renderItem = ({ item }) => <ImageItem img={item.image}/>;
  
    return (
        <View style={{margin: 5, flex: 1}}>
            <FlatList contentContainerStyle={{paddingBottom: 40}} style={styles.container} data={inputData} renderItem={renderItem} keyExtractor={item => item.id} numColumns={3}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1
    }
});
  