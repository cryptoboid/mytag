import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native'

import * as MediaLibrary from 'expo-media-library';

import ImageGrid from '../components/ImageGrid';

import {Picker} from '@react-native-picker/picker';


function assetsToData(assets) {
    var data = [];
    var accum = 0;

    for (const asset of assets) {
        data.push({image: asset.uri, id: "imagen"+accum});
        accum++;
    }

    return data;
}


export default function HomeScreen() {
  
    const [data, setData] = useState([]);
    const [albumsInfo, setAlbumsInfo] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState("");

    const getAlbums = async () => {
        const albums = await MediaLibrary.getAlbumsAsync();
        setAlbumsInfo(albums);
    }
    
    const getImages = async () => {

        const imgData = await MediaLibrary.getAssetsAsync({
            first: 40,
            album: albumsInfo.find(item => item.id == selectedAlbum),
            mediaType: MediaLibrary.MediaType.photo
        })

        const imagenes = assetsToData(imgData.assets);
        setData(imagenes);
    }
  
    useEffect(() => {

        const getPermissionAsync = async () => {
            if (Platform.OS !== "web") {
                const permission = await MediaLibrary.requestPermissionsAsync();
                
                if (permission.status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                } else {
                    getAlbums();
                }
            }
        };

        getPermissionAsync();
    }, []);

    useEffect(() => {
        getImages();
    }, [albumsInfo, selectedAlbum]);

    return (
        <View style={styles.container}>
            <View style={{flexDirection:"row"}}>
                <Picker
                    selectedValue={selectedAlbum}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedAlbum(itemValue)
                    }
                    mode="dialog"
                    prompt="Select an Album"
                    >
                    
                    {albumsInfo.map((item) =>
                        <Picker.Item label={item.title} value={item.id} key={item.id} />
                    )}

                </Picker>
                <Text style={styles.text}>Hay {albumsInfo.length} albumes</Text>
            </View>
            <ImageGrid inputData={data} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    text: {
      fontSize: 18,
      margin: 10,
      alignSelf: 'center'
    }
  })

