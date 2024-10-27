import { StyleSheet, ImageBackground, View, Image, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../AuthContext'

export default function CustomDrawer(props) {
    const { Logout } = useContext(AuthContext)
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                
                contentContainerStyle={{ backgroundColor: 'white',flex:1, }}
            >
                <ImageBackground
                    source={{ uri: 'https://img.freepik.com/free-photo/top-view-delicious-food-table_23-2150857976.jpg' }}
                    style={{ padding: 20,marginTop:-10 }}
                >

                    <Image source={{ uri: 'https://img.freepik.com/free-photo/view-3d-businessman_23-2150709814.jpg' }}
                        style={styles.image}
                    />
                    <Text style={{ color: 'white', fontSize: 20, }}>Murshid</Text>


                </ImageBackground>
                <View style={styles.DrawerItems}>

                    <DrawerItemList {...props} />

                </View>
            </DrawerContentScrollView>

            {/* logout */}
            <View style={{ backgroundColor: 'white', padding: 20, borderTopWidth: 1, borderTopColor: 'grey' }}>
                <TouchableOpacity onPress={Logout}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='log-out-outline' size={22} />
                        <Text style={{ marginLeft: 10, fontWeight: 500 }}>Logout</Text>
                    </View>

                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 80,
        width: 80,
        borderRadius: 100,
        marginBottom: 10
    },
    DrawerItems: {
        paddingTop: 10
    }
})