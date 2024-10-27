import { StyleSheet, TextInput, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'

import { WindowHeight, WindowWidth } from '../GlobalCSS';

export default function Search({ route, navigation }) {
    const { allRecipe } = route.params;

    const [filteredRecipe, setFilteredRecipe] = useState(allRecipe)
    const handleSearch = (value) => {
        console.log(value);
        let vallue2 = allRecipe.filter((item) => (item.name).toLowerCase().includes(value.toLowerCase()))
        setFilteredRecipe(vallue2)
        console.log(vallue2);
    }
    return (
        <>
            <View style={{ backgroundColor: 'white', }}>
                <View style={styles.TopHeader}>
                    <Ionicons name='chevron-back-outline' size={25} color={'white'} style={styles.backIcon} onPress={() => navigation.goBack()} />
                    <Text style={styles.TopHeaderText}>Search</Text>
                </View>


                <View style={styles.AllSearchDiv}>
                    {/* search bar */}
                    <View style={styles.mainSearchDiv}>
                        <View style={styles.searchDiv}>
                            <Ionicons name='search-outline' size={27} />
                            <TextInput onChangeText={handleSearch} style={styles.searchInput} placeholder='Search for your query' />
                        </View>
                    </View>


                    {/* search data View */}
                    <View style={styles.mainDataContainer}>
                        <View style={styles.MainDataInside}>
                            <ScrollView>

                                {filteredRecipe?.map((item, index) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.8} style={styles.singleData} onPress={() => navigation.navigate('SingleView', { item: item, allRecipe: allRecipe })}>

                                            <Image style={styles.Image} source={{ uri: item.image }} />



                                            <View>
                                                <Text style={styles.RecipeName}>{item.name}</Text>
                                                <View style={styles.Actions}>
                                                    <View style={[styles.ActionInside,]}>
                                                        <Ionicons name='time-outline' size={20} color={'green'} />
                                                        <Text style={styles.actionText}>{item.time} MIN</Text>



                                                    </View>
                                                    <View style={[styles.ActionInside,]}>
                                                        <Feather name='smile' size={20} color={'black'} />
                                                        <Text style={styles.actionText}>{item.process}</Text>


                                                    </View>
                                                    <View style={[styles.ActionInside,]}>
                                                        <Ionicons name='flame-outline' size={20} color={'blue'} />
                                                        <Text>{item.calories} cal</Text>

                                                    </View>

                                                </View>
                                            </View>




                                        </TouchableOpacity>
                                    )
                                })}


                            </ScrollView>

                        </View>
                    </View>
                </View>


            </View>
        </>
    )
}

const styles = StyleSheet.create({
    searchDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        width: WindowWidth - 35,
        borderRadius: 15,
        backgroundColor: "#f7f9fa",
        height: 58,
        paddingHorizontal: 12,
        marginVertical: 10,
        elevation: 2


    },
    searchInput: {
        margin: 10,
        borderRadius: 15,
        height: 50,
        flex: 1,
    },
    mainSearchDiv: {
        alignItems: 'center',
        marginTop: 20,
    },
    backIcon: {
        marginHorizontal: 20
    },
    AllSearchDiv: {
        backgroundColor: 'white',
        top:-20,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
    TopHeader: {
        backgroundColor: 'rgba(59, 124, 164, 0.521)144, 144, 144',
        paddingVertical: 20,
        paddingBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TopHeaderText: {
        fontSize: 22
    },
    mainDataContainer: {
        alignItems: 'center',


    },
    MainDataInside: {
        height: WindowHeight - 20,
        width: WindowWidth - 20,
        borderRadius: 15,
        padding: 5,
        alignItems: 'center',



    },
    Image: {
        width: 90,
        height: 80,
        borderRadius: 20,
        marginHorizontal: 15

    },
    singleData: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        // elevation:5,
        backgroundColor: '#f7f9fa',
        borderRadius: 50

    },
    RecipeName: {
        fontSize: 18,

    },
    Actions: {
        flexDirection: 'row',
        width: WindowWidth,
        // marginVertical: 10
    },
    ActionInside: {
        // height: 40,
        width: 50,
        borderRadius: 15,
        marginLeft: 8,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        fontSize: 12,
        paddingVertical: 5
    }
})