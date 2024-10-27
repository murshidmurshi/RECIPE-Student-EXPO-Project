import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ThemeColor, WindowHeight } from '../GlobalCSS'
import { WindowWidth } from '../GlobalCSS'

export default function Onboarding({navigation}) {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View>
                <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-photo/view-3d-man-dish-washing_23-2150709890.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} />
            </View>

            <View style={styles.boardHeader}>
                <Text style={styles.label}>It's </Text>
                <Text style={styles.label}>Cooking </Text>
                <Text style={[styles.label, { marginBottom: 10 }]}>Time! </Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.StartedBtn} onPress={()=>navigation.navigate('login')}>
                <Text style={styles.BtnLabel}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: WindowHeight,
        width: WindowWidth,
        backgroundColor: '#b89f8f'
    },
    image: {
        height: WindowHeight * 0.5,
        width: WindowWidth ,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 10,
    },
    boardHeader: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 10
    },
    label: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: -10,
        // fontFamily:'Poppins-Black'
    },
    StartedBtn: {
        backgroundColor: '#85a839',
        width: 180,
        padding: 20,
        borderRadius: 200,
        margin: 15,
        alignItems: 'center',
        elevation:2,

        // Shadow  for ios
        shadowColor:'black',
        shadowOpacity:0.2,
        shadowOffset:{width:0,height:0.2},
        shadowRadius:2


    },
    BtnLabel: {
        fontSize: 20,
        color: 'white'
    }
})