import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native'

import * as MediaLibrary from 'expo-media-library';

import ImageGrid from '../components/ImageGrid';

import {Picker} from '@react-native-picker/picker';

import { CategoriesContext } from '../utils/CategoriesContext';

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
    
    const [selectedCategoryIndx, setSelectedCategoryIndx] = useState(0);
    const [imagesForThisCategory, setImagesForThisCategory]  = useState([]);
    const [foundCategories, setFoundCategories]  = useState([]);
    const categoriesGrouper = useContext(CategoriesContext);

    
    const getImages = async (album) => {
        const imgData = await MediaLibrary.getAssetsAsync({
            first: 10,
            album: album.id,
            mediaType: MediaLibrary.MediaType.photo
        })

        return imgData.assets;
    }

    const getAlbums = async () => {
        const albums = await MediaLibrary.getAlbumsAsync();
        let allImages = [];
        for (const album of albums) {
            allImages = allImages.concat(await getImages(album));
        }
        categoriesGrouper.useImages(allImages, setFoundCategories);
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
        setImagesForThisCategory(categoriesGrouper.getForCategory(foundCategories[selectedCategoryIndx]));
    }, [foundCategories]);

    return (
        <View style={styles.container}>
            <View style={{flexDirection:"row"}}>
                <Picker
                    selectedValue={selectedCategoryIndx}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCategoryIndx(itemValue)
                    }
                    mode="dialog"
                    prompt="Select a Category"
                    >
                    
                    {foundCategories.map((categ, indx) =>
                        <Picker.Item label={categ} value={indx} key={categ} />
                    )}

                </Picker>
                <Text style={styles.text}>Encontre {foundCategories.length} categorias </Text>
            </View>
            <ImageGrid predImages={imagesForThisCategory} />
        </View>
    )
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

