import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColor, WindowHeight, WindowWidth } from '../GlobalCSS';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [allRecipe, setAllRecipe] = useState([])
    const [easyRecipe, setEasyRecipe] = useState([])

    const GetAllRecipe = async () => {
        let initialValue = await AsyncStorage.getItem('Recipe');
        let ParsedInitialValue = JSON.parse(initialValue) || []
        setAllRecipe(ParsedInitialValue)
        let EasyRecipes = ParsedInitialValue.filter((item) => (item.process).toLowerCase()=='easy')
        console.log(EasyRecipes,'EasyRecipes');
        setEasyRecipe(EasyRecipes)
        

    }
    console.log(allRecipe, 'ParsedInitialValue');

    useFocusEffect(
        useCallback(() => {
            GetAllRecipe()
        }, [])
    )

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView>

                    {/* top drawer Icons */}
                    <View style={styles.TopIconsDiv}>
                        <Ionicons style={styles.TopIcons} name='menu-outline' size={30} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />

                        <View style={{ flex: 1 }} />
                        <Ionicons style={styles.TopIcons} name='search-outline' onPress={() => navigation.navigate('Search', { allRecipe: allRecipe })} size={27} />

                    </View>



                    {/* topLabel */}
                    <View style={styles.topLabelView}>
                        <Text style={styles.topLabel}>
                            What would you
                        </Text>
                        <Text style={styles.topLabel}>
                            like to Cook?
                        </Text>
                    </View>




                    {/* all recipe  */}
                    <View style={styles.recipeDiv}>
                        <Text style={styles.RecipeText}>Top Recipes</Text>


                        {allRecipe.length === 0 ? (
                            <View style={styles.EmptyData}>
                                <Image style={styles.EmptyImage} source={{ uri: 'https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} />
                            </View>
                        ) : ''}

                        <FlatList
                            horizontal
                            data={allRecipe}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return (

                                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SingleView', { item: item, allRecipe: allRecipe })} style={styles.singleRecipe}>
                                        <Image style={styles.recipeImage} source={{ uri: item.image }} />


                                        {/* recipe Detail */}
                                        <View style={styles.recipeDetailDiv}>
                                            <Text style={styles.RecipeDetailText}>{item.name}</Text>

                                            {/* recipeActionForDetail */}
                                            <View style={styles.RecipeDetailInsideAction}>
                                                <Text style={styles.RecipeDetailActionText}>{item.time} MIN</Text>
                                                <Text style={{ color: 'yellow', height: 20 }}>|</Text>
                                                <Text style={styles.RecipeDetailActionText}>{item.process}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />



                    </View>



                    {/* Recommended for Begginner recipe  */}
                    <View style={{ alignItems: 'center' }}>

                        <View style={styles.recommendedDiv}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
                                <Text style={styles.RecipeText}> For beginner </Text>
                                <View style={{ flex: 1 }} />
                                {/* <Text style={styles.seeAll}>See All </Text> */}
                            </View>

                            {easyRecipe.length === 0 ? (
                                <View style={styles.EmptyData}>
                                    <Image style={styles.EmptyImage} source={{ uri: 'https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} />
                                </View>
                            ) : ''}

                            <FlatList
                                data={easyRecipe}
                                keyExtractor={(item) => item.id}

                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SingleView', { item: item, allRecipe: allRecipe })} style={styles.recommendedsingleRecipe}>
                                            <Image style={styles.recommendedrecipeImage} source={{ uri: item.image }} />

                                            <View style={styles.DivinsideRecommended}>


                                                <View >
                                                    <Text style={styles.RecipeName}>{item.name}</Text>

                                                </View>
                                                <View >
                                                    <Text style={styles.RecipeOwner}>By {item.author}</Text>
                                                </View>

                                                <View style={styles.RecipeActionDiv}>
                                                    <View style={styles.recipeTime}>
                                                        <Ionicons name='time-outline' color={'green'} size={20} />
                                                        <Text style={styles.timeText}>{item.time} Min</Text>

                                                    </View>
                                                    <View style={styles.recipeTime}>
                                                        <Text>😀</Text>
                                                        <Text style={styles.timeText}>{item.process}</Text>

                                                    </View>
                                                </View>


                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />



                        </View>

                    </View>



                </ScrollView>


            </SafeAreaView>
        </>


    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ThemeColor,
        flex: 1,
    },
    TopIconsDiv: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    EmptyData: {
        marginVertical: 10,
        paddingHorizontal: 10,
        width: WindowWidth - 20,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center'
    },
    EmptyImage: {
        height: 150,
        width: 150,
        borderRadius: 10
    },
    TopIcons: {
        marginVertical: 25,
        marginHorizontal: 18,

    },
    topLabelView: {
        // backgroundColor:'orange',
        marginHorizontal: 18,

    },
    topLabel: {
        // backgroundColor:'green',
        fontSize: 32,
        fontWeight: '400'
    },

    recipeDiv: {
        marginTop: 20,
        height: 250,
        marginLeft: 10
    },
    recipeDetailDiv: {

        backgroundColor: 'rgba(120, 93, 82, 0.684)',
        position: 'absolute',
        top: 10,
        left: 10,
        height: 90,
        width: 160,
        borderRadius: 15,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',

    },
    RecipeDetailInsideAction: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 100,
        alignItems: "center"

    },
    RecipeDetailText: {
        marginBottom: 8,
        color: 'white',
        fontWeight: '400',
        fontSize: 16

    },
    RecipeDetailActionText: {
        color: 'white'

    },
    recommendedDiv: {
        marginVertical: 20,
        width: WindowWidth,

    },
    RecipeText: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: '400'
    },


    singleRecipe: {
        margin: 8,
        width: 180,
        height: 200,

    },
    recommendedsingleRecipe: {
        flex: 1,
        margin: 8,
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 15,
        padding: 8,
        flexDirection: 'row',

        //for ios
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

    },
    recipeImage: {
        flex: 1,
        borderRadius: 15,
    },
    recommendedrecipeImage: {
        // flex:1,
        width: 120,
        height: 150,
        borderRadius: 15,
    },
    DivinsideRecommended: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-around'

    },
    RecipeName: {
        fontSize: 22,
        fontWeight: '400'
    },
    RecipeOwner: {
        fontSize: 15,
        color: 'grey'
    },
    RecipeActionDiv: {
        flexDirection: 'row'
    },
    recipeTime: {
        flexDirection: 'row',
    },
    timeText: {
        paddingHorizontal: 10
    },
})