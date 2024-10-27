import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Home from './MainScreen/Home';
import Insert from './MainScreen/Insert';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './MainScreen/CustomDrawer';
import SingleView from './MainScreen/SingleView';
import Edit from './MainScreen/Edit';
import Search from './MainScreen/Search';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

export default function AppNav() {

  const MyIcons = (route, focused) => {
    let icons;
    if (route.name === 'Home') {
      icons = focused ? (
        <Ionicons name='home-outline' size={30} />
      ) : (

        <Ionicons name='home-outline' size={20} />
      )

    }
    else if (route.name === 'Insert') {
      icons = focused ? (
        <Ionicons name='add-circle-outline' size={30} />
      ) : (

        <Ionicons name='add-circle-outline' size={20} />
      )
    }
    return (
      <View>
        {icons}
      </View>
    )

  }

  const TabNav = () => {
    return (
      <Tab.Navigator screenOptions={({ route }) => (
        {
          tabBarIcon: ({ focused }) => MyIcons(route, focused),
          headerShown: false,
          tabBarShowLabel: false
        }

      )}>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Insert' component={Insert} />

      </Tab.Navigator>
    )


  }

  const StackNav = () => {
    return (

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={TabNav} />
        <Stack.Screen name='Insert' component={Insert} />
        <Stack.Screen name='SingleView' component={SingleView} />
        <Stack.Screen name='Edit' component={Edit} />
        <Stack.Screen name='Search' component={Search} />
      </Stack.Navigator>
    )
  }

  return (
    <>
      <NavigationContainer>

        <Drawer.Navigator
        drawerContent={props =><CustomDrawer {...props} /> }
        screenOptions={{ headerShown: false }}>
          <Drawer.Screen name='Home' component={StackNav} />
          <Drawer.Screen name='Insert' component={Insert} />
        </Drawer.Navigator>


      </NavigationContainer>

    </>
  )
}

const styles = StyleSheet.create({})