import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import Onboarding from './AuthScreen/Onboarding'
import Login from './AuthScreen/Login'
import Register from './AuthScreen/Register'
export default function AuthNav() {
    return (
        <>
            <NavigationContainer >
                <Stack.Navigator initialRouteName='onboard' screenOptions={{headerShown:false}}>
                    <Stack.Screen name='onboard' component={Onboarding} />
                    <Stack.Screen name='login' component={Login} />
                    <Stack.Screen name='register' component={Register} />

                </Stack.Navigator>
            </NavigationContainer>
        

        </>
    )
}

const styles = StyleSheet.create({})