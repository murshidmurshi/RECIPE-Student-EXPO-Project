import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { WindowWidth } from '../GlobalCSS'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Edit({ route, navigation }) {
    const { item, allRecipe } = route.params;
    console.log(allRecipe, 'AlllREcipeFrom Route');

    const [single, setSingle] = useState(item);

    const [method, setMethod] = useState('')
    const [image, setImage] = useState('')
    const [ingredients, setIngredients] = useState(single.ingredients)

    const [selectedDifficulty, setSelectedDifficulty] = useState(single.process);

    console.log(selectedDifficulty, 'selectedDifficulty');


    const handleChange = (type, value) => {
        setSingle({ ...single, [type]: value })

    }

    const AddIngredients = () => {
        if (method) {
            setIngredients([...ingredients, method])
            setMethod('')
        }
        console.log(ingredients);
    }

    const SubmitRecipe = async () => {
        single.process = selectedDifficulty
        let value = { ...single, image: image || single.image, ingredients }
        console.log(value, 999999);
        let index = allRecipe.findIndex((e) => e.id === single.id)
        console.log(index);
        await allRecipe.splice(index, 1, value)
        await AsyncStorage.setItem('Recipe', JSON.stringify(allRecipe))
        navigation.navigate('Home')
    }

    // image select
    const PickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            // videoQuality: 1,


        })
        console.log(result, 'ImageSelect');
        if (!result.canceled) {
            setImage(result.uri);
            console.log(result.uri);
        }


    }

    useEffect(() => {

        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log(status);
            if (status !== 'granted') {
                console.error('Permission to access media library denied');
            }

        })()
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView >

                <View style={styles.mainInsertDiv}>

                    <Text style={styles.insertRecipeHeader}>
                        Let's Edit a Recipe
                    </Text>

                    <View style={styles.InputParent}>

                        <View style={styles.inputDiv}>
                            <Text style={styles.RecipeLabel}>Recipe name</Text>
                            <TextInput style={styles.input} value={single.name} onChangeText={(name) => handleChange('name', name)} />
                        </View>

                        {/* 2 items */}
                        <View style={styles.TwoItems}>
                            <View style={styles.imageDiv}>

                                <TouchableOpacity onPress={PickImage} style={styles.PickImageDiv}>
                                    <Text style={styles.PickImageLabel}>Pick image</Text>
                                </TouchableOpacity>

                                {image ? (
                                    <Image source={{ uri: image }} style={styles.image} />

                                ) : (
                                    <Image source={{ uri: single.image }} style={styles.image} />
                                )}

                            </View>
                            <View style={styles.TimeDiv}>
                                <Text style={styles.RecipeLabel}>Total time</Text>
                                <TextInput keyboardType='numeric' value={single.time} style={styles.Timeinput} onChangeText={(time) => handleChange('time', time)} />

                            </View>
                        </View>
                        <View style={styles.inputDiv}>
                            <Text style={styles.RecipeLabel}>Recipe ingredients</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput value={method} style={styles.input} onChangeText={(method) => setMethod(method)} />

                                <View style={{ paddingHorizontal: 10 }}>
                                    <Ionicons name='add-circle-outline' color={'grey'} size={30} onPress={AddIngredients} />
                                </View>


                            </View>
                            {/* map the ingredients */}
                            <View style={styles.ingredientsMainDiv}>

                                <ScrollView nestedScrollEnabled={true}>

                                    {ingredients.map((item, index) => (

                                        <View key={index} style={styles.Allingredients}>
                                            <Text style={styles.ingredientsDot}></Text>
                                            <Text style={styles.ingredientsName}>{item}</Text>

                                        </View>

                                    ))}
                                </ScrollView>

                            </View>
                        </View>


                        <View style={styles.inputDiv}>
                            <Text style={styles.RecipeLabel}>Recipe calories</Text>
                            <TextInput keyboardType='numeric' value={single.calories} style={styles.input} onChangeText={(calories) => handleChange('calories', calories)} />
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={styles.RecipeLabel}>Recipe instruction</Text>
                            <TextInput style={styles.Instructioninput} value={single.instruction} multiline onChangeText={(instruction) => handleChange('instruction', instruction)} />
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={styles.RecipeLabel}>Is it easy to make?</Text>

                            <View style={styles.RecipeProcessOptionDiv}>
                                <TouchableOpacity onPress={() => setSelectedDifficulty('Easy')}>
                                    <Text style={[styles.Options, selectedDifficulty === 'Easy' && styles.Selected]}>Easy</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setSelectedDifficulty('Hard')}>
                                    <Text style={[styles.Options, selectedDifficulty === 'Hard' && styles.Selected]}>Hard</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={styles.RecipeLabel}>Recipe author</Text>
                            <TextInput style={styles.input} value={single.author} onChangeText={(author) => handleChange('author', author)} />
                        </View>

                    </View>

                    {/* button */}
                    <View style={styles.BtnMainDiv}>
                        <TouchableOpacity style={styles.BtnDiv} onPress={SubmitRecipe}>
                            <Text style={styles.BtnText}>Continue</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    RecipeProcessOptionDiv: {
        flexDirection: 'row',
        marginTop: 10,
    },
    Selected: {
        fontWeight: 'bold',
        backgroundColor: 'green'
    },
    Options: {
        paddingHorizontal: 10,
        backgroundColor: 'black',
        color: 'white',
        padding: 8,
        borderRadius: 10,
        margin: 5

    },
    mainInsertDiv: {
        // backgroundColor: 'yellow',
        flex: 1,
    },
    insertRecipeHeader: {
        fontSize: 30,
        fontWeight: '500',
        color: 'grey',
        padding: 15,
        paddingTop: 30
    },
    InputParent: {
        marginTop: 10,
        alignItems: 'center'
    },

    input: {
        backgroundColor: 'rgba(228, 236, 250, 0.696)',
        color: '#595c5b',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        flex: 1,

    },

    Instructioninput: {
        backgroundColor: 'rgba(228, 236, 250, 0.696)',
        minHeight: 50,
        maxHeight: 150,
        color: '#595c5b',
        borderRadius: 10,
        paddingHorizontal: 10,
        flex: 1,


    },
    inputDiv: {
        // backgroundColor: 'orange',
        padding: 5,
        paddingBottom: 0,
        width: WindowWidth - 20,

    },
    RecipeLabel: {
        padding: 5,
        color: 'grey'
    },
    BtnMainDiv: {
        alignItems: 'center',
        marginVertical: 30
    },
    BtnDiv: {
        backgroundColor: '#8fad4e',
        width: WindowWidth - 26,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        elevation: 2,


        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,



    },
    BtnText: {
        color: 'white',
        fontSize: 20,
        textTransform: 'uppercase'
    },
    ingredientsMainDiv: {
        marginVertical: 15,
        minHeight: 0,
        maxHeight: 150,
        backgroundColor: '#ebe9e8',
        borderRadius: 10



    },
    Allingredients: {
        padding: 4,
        margin: 4,

        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10


    },
    ingredientsDot: {
        height: 7,
        width: 7,
        marginLeft: 7,
        backgroundColor: 'orange',
        borderRadius: 200

    },
    ingredientsName: {
        fontSize: 15,
        paddingHorizontal: 10

    },
    TwoItems: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        width: WindowWidth - 20,
        justifyContent: "space-between",
        paddingHorizontal: 20


    },
    TimeDiv: {
        padding: 5,
        marginVertical: 10
    },
    Timeinput: {
        backgroundColor: 'rgba(228, 236, 250, 0.696)',
        color: '#595c5b',
        height: 50,
        width: 100,
        borderRadius: 10,
        paddingHorizontal: 10,

    },
    imageDiv: {
        // backgroundColor: 'red',
        padding: 5,
        // width: WindowWidth - 20,
        marginVertical: 10
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 15,
        marginVertical: 10
    },
    PickImageDiv: {
        fontSize: 18,
        backgroundColor: 'rgba(59, 124, 164, 0.521)144, 144, 144',
        padding: 10,
        borderRadius: 12,



    },
    PickImageLabel: {
        fontSize: 18,


    },


})






// import React, { useState, useEffect } from 'react';
// import { View, Image, Button } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const App = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       console.log(status);
//       if (status !== 'granted') {
//         console.error('Permission to access media library denied');
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.uri);
//     }

//   };

//   return (
//     <View>
//       <Button title="Pick Image" onPress={pickImage} />
//       {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
//     </View>
//   );
// };

// export default App;
