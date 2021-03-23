import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Button } from 'react-native'

import * as MediaLibrary from 'expo-media-library';

import ImageGrid from '../components/ImageGrid';

import PickerModal from 'react-native-picker-modal-view';

import { CategoriesContext } from '../utils/CategoriesContext';
import LoadingClassificationsBar from '../components/LoadingClassificationsBar';
import toTitleCase from '../utils/to-title-case';





export default function HomeScreen() {
    
    const [selectedCategory, setSelectedCategory] = useState({});
    const [imagesForThisCategory, setImagesForThisCategory]  = useState([]);
    const [foundCategories, setFoundCategories]  = useState([]);
    const [classifiedPercentage, setClassifiedPercentage] = useState(0.0);
    const categoriesGrouper = useContext(CategoriesContext);

    
    const getImages = async (album) => {
        const imgData = await MediaLibrary.getAssetsAsync({
            // first: 10,
            album: album.id,
            mediaType: MediaLibrary.MediaType.photo
        })

        return imgData.assets;
    }

    const notifyCategories = (newFoundCategories, newPercentage) => {
        setFoundCategories(newFoundCategories);
        setClassifiedPercentage(newPercentage);
    }

    const getAlbums = async () => {
        const albums = await MediaLibrary.getAlbumsAsync();
        let allImages = [];

        for (const album of albums) {
            allImages = allImages.concat(await getImages(album));
        }

        categoriesGrouper.useImages(allImages, notifyCategories);
    }

    useEffect(() => {
        const getPermissionAsync = async () => {
            if (Platform.OS !== "web") {
                const permission = await MediaLibrary.requestPermissionsAsync();
                if (permission.status !== "granted") {
                    alert("Sorry, we need media permissions to make this work!");
                } else {
                    getAlbums();
                }
            }
        };

        getPermissionAsync();
    }, []);

    useEffect(() => {
        setImagesForThisCategory(categoriesGrouper.getForCategory(foundCategories[selectedCategory.Id]));
    }, [foundCategories, selectedCategory]);

    return (
        <View style={styles.container}>
            <View style={{flexDirection:"row"}}>
        
                <PickerModal
					renderSelectView={(disabled, selected, showModal) => 
                        <View style={styles.pickerContainer}>
                            <Button disabled={disabled} onPress={showModal} title={`Found ${foundCategories.length} categories`}></Button>
                        </View>
					}
					onSelected={(item)=>{
                        setSelectedCategory(item)
                    }}
					items={foundCategories.map((catg,index)=>(
                        {
                            Id:index,
                            Name:toTitleCase(catg)
                        }
                    ))}
					sortingLanguage={'tr'}
					showToTopButton={true}
					selected={selectedCategory}
					showAlphabeticalIndex={true}
					autoGenerateAlphabeticalIndex={true}
					selectPlaceholderText={'Choose one...'}
					searchPlaceholderText={'Search...'}
					requireSelection={false}
					autoSort={false}
				/>
            </View>
            <ImageGrid predImages={imagesForThisCategory} />
            <SafeAreaView>
                <LoadingClassificationsBar completedPercentage={classifiedPercentage} />
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      fontSize: 18,
      margin: 10,
      alignSelf: 'center'
    },
    pickerContainer:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    }
  })

