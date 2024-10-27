import { SafeAreaView, StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { WindowHeight, WindowWidth } from '../GlobalCSS'
import { AuthContent } from '../AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function Register({ navigation }) {
  const [register, setRegister] = useState({})
  // const [data, setData] = useState([])

  const [registerError, setRegisterError] = useState(false)




  const handleChange = (type, value) => {
    setRegisterError(false)
    setRegister({ ...register, [type]: value })
  }


  const Register = async () => {
    let initialValue = await AsyncStorage.getItem('Register');

    // Parse the JSON string
    let parsedInitialValue = JSON.parse(initialValue) || [];
    let id;
    if (parsedInitialValue.length == 0) {
      id = 101
    }
    else {
      id = parsedInitialValue[parsedInitialValue.length - 1].id + 1
    }

    let AllUserData = [...parsedInitialValue, { ...register, id }]




    let check = register.name && register.email && register.password;

    if (!check) {
      console.log('Input Cannot be Empty');
      setRegisterError(true);
    } else {
      // set Register Value to AsyncStorage
      console.log(AllUserData, 'only Storage');

      await AsyncStorage.setItem('Register', JSON.stringify(AllUserData));

      navigation.navigate('login');
      console.log('success');
    }
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* for Top Arrow Icon */}
      <View style={styles.IconDiv} >
        <Ionicons color={'white'} name='chevron-back-outline' size={25} onPress={() => navigation.goBack()} />
      </View>


      {/* for Image */}
      <View>

        <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-photo/view-3d-male-teacher_23-2150710024.jpg' }} />
      </View>

      {/* for Input */}

      <View style={styles.mainInputContainer}>

        {/* register Error handling--- */}
        {registerError ? (
          <View>
            <Text style={{ color: 'red' }}>Input Cannot be Empty !!</Text>
          </View>
        ) : ""
        }

        <View>
          <Text style={styles.inputLabel}>Full name</Text>
          <View style={styles.inputDiv}>
            <TextInput style={styles.input} placeholder='Enter your name' onChangeText={(name) => handleChange('name', name)} />
            <Ionicons color={'grey'} name='person-outline' size={20} />
          </View>
        </View>

        <View>
          <Text style={styles.inputLabel}>E-mail address</Text>
          <View style={styles.inputDiv}>
            <TextInput style={styles.input} placeholder='Enter your email address' onChangeText={(email) => handleChange('email', email)} />
            <Ionicons color={'grey'} name='mail-outline' size={20} />
          </View>
        </View>


        <View>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputDiv}>
            <TextInput style={styles.input} placeholder='Enter your password ' onChangeText={(password) => handleChange('password', password)} />
            <Ionicons color={'grey'} name='lock-closed-outline' size={20} />
          </View>
        </View>

      </View>

      {/* login Function */}

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={1} onPress={Register} >
          <View style={styles.loginBtn}>

            <View>
              <Text style={styles.BtnLabel}>Register</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>


      {/* for Register Screen */}
      <View style={styles.ForRegister}>
        <Text >Already have an account? <Text onPress={() => navigation.navigate('login')} style={styles.SignUp}>login</Text></Text>
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
    height: WindowWidth - 50,
    width: WindowWidth,
  },
  input: {
    margin: 10,
    borderRadius: 15,
    height: 50,
    flex: 1,
  },

  inputDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WindowWidth - 43,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#f7f2fa",
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
    paddingTop: 30
  },

  loginBtn: {
    backgroundColor: '#6b4980',
    width: WindowWidth - 33,
    borderRadius: 10,
    alignItems: 'center',
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
    marginTop: 40
  },
  SignUp: {
    textDecorationLine: 'underline',
    color: 'grey'
  },
  BtnLabel: {
    fontSize: 20,
    color: "white"
  },
  inputLabel: {
    color: 'grey',
    paddingHorizontal: 5
  }
})