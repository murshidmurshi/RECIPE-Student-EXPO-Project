import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import AuthNav from './AuthNav'
import AppNav from './AppNav'
import { AuthContext } from './AuthContext'

export default function MainNav() {
    const { token, loading } = useContext(AuthContext)
    console.log(token, 'Inside Main Nav');
    return (
        <>
            {loading ? (
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator color={'grey'} size={38} />
                </View>
            ) : (
                token !== null ?
                    (<AppNav />)
                    :
                    (<AuthNav />)
            )}


        </>
    )
}

const styles = StyleSheet.create({})