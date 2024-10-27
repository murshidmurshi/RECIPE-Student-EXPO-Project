import { SafeAreaView, StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { WindowHeight, WindowWidth } from '../GlobalCSS'
import {AuthContext} from '../AuthContext'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function Login({ navigation }) {
  const { getItem, setToken,GetData } = useContext(AuthContext)
  const [login, setLogin] = useState({})
  const [loginError, setLoginError] = useState(false)


  useFocusEffect(
    useCallback(() => {

      GetData()
      console.log(getItem, 'GetItem inside Login Page');

    }, [])
  )

  const handleChange = (type, value) => {
    setLoginError(false)
    setLogin({ ...login, [type]: value })

  }
  const LoginBtn = async () => {
    let value;

    let check = login.email && login.password
    if (!check) {
      console.log('Input Cannot be Empty');
      setLoginError(true)
    }
    else {
      console.log('HEllo');
      value = await getItem?.filter((e) => {
        return e.email == login.email && e.password == login.password
      })
      console.log(value, 'FilterValue');
      if (value.length == 0) {
        console.log('Invalid');
        setLoginError(true)
      }
      else {
        console.log('Login successFull');
        let token = await value[0].id;
        console.log(token, 'Token .... ');
        await AsyncStorage.setItem('Token', JSON.stringify(token))
        setToken(JSON.stringify(token))

        navigation.navigate('Home')


      }


    }

  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* for Top Arrow Icon */}
      <View style={styles.IconDiv} >
        <Ionicons color={'white'} name='chevron-back-outline' size={25} onPress={() => navigation.goBack()} />
      </View>


      {/* for Image */}
      <View>

        <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-photo/view-3d-man-holding-laptop_23-2150709818.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} />
      </View>

      {/* for Input */}

      <View style={styles.mainInputContainer}>


        <View style={styles.welcomeHeader}>
          <Text style={styles.headerLabel}>
            Welcome Back
          </Text>
        </View>

        {/* login Error handling--- */}
        {loginError ? (
          <View style={{ paddingBottom: 10 }}>
            <Text style={{ color: 'red' }}>Incorrect email or password !!</Text>
          </View>
        ) : ""
        }

        <View>
          {/* <Text style={styles.inputLabel}>E-mail address</Text> */}
          <View style={styles.inputDiv}>
            <TextInput style={styles.input} placeholder='Enter your email address' onChangeText={(email) => handleChange('email', email)} />
            <Ionicons color={'grey'} name='mail-outline' size={20} />
          </View>
        </View>


        <View>
          {/* <Text style={styles.inputLabel}>Password</Text> */}
          <View style={styles.inputDiv}>
            <TextInput style={styles.input} placeholder='Enter your password ' onChangeText={(password) => handleChange('password', password)} />
            <Ionicons color={'grey'} name='lock-closed-outline' size={20} />
          </View>
        </View>

      </View>
      {/* <Text style={styles.forgotText}>Forgot the password ?</Text> */}

      {/* login Function */}

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={1} onPress={LoginBtn} >
          <View style={styles.loginBtn}>

            <View>
              <Text style={styles.BtnLabel}>Continue</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>


      {/* for Register Screen */}
      <View style={styles.ForRegister}>
        <Text >You don't have an account? <Text onPress={() => navigation.navigate('register')} style={styles.SignUp}>Sign Up</Text></Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  IconDiv: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1
  },
  image: {
    height: WindowHeight * 0.5,
    width: WindowWidth,
  },
  input: {
    margin: 10,
    borderRadius: 15,
    height: 50,
    flex: 1,
  },
  welcomeHeader: {
    paddingBottom: 20

  },
  headerLabel: {
    fontSize: 30,
    color: 'grey'

  },
  inputDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WindowWidth - 43,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: "#e9eff7",
    height: 50,
    paddingHorizontal: 12,
    elevation: 1,


    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  mainInputContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -WindowHeight * 0.1,

  },
  forgotText: {
    color: '#f2935c',
    paddingHorizontal: 25,
    marginVertical: -10
  },
  loginBtn: {
    backgroundColor: '#619ff2',
    width: WindowWidth - 33,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    elevation: 3,
    justifyContent: 'center',

    // shadow for ios
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,

  },
  ForRegister: {
    alignItems: 'center',
    marginTop: 43
  },
  SignUp: {
    textDecorationLine: 'underline',
    color: 'grey'
  },
  BtnLabel: {
    fontSize: 20,
    color: "white"
  }
})