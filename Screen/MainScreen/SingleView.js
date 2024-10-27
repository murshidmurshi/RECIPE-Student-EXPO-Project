import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { WindowHeight, WindowWidth } from '../GlobalCSS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function SingleView({ route, navigation }) {
  let { item,allRecipe } = route.params;
  const handleDelete=async()=>{
    let value=await allRecipe.filter((e)=>e!==item)
    await AsyncStorage.setItem('Recipe',JSON.stringify(value))
    console.log(value,'Remaining Recipe');
    navigation.goBack()

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Ionicons name='chevron-back-outline' size={25} color={'white'} style={styles.backIcon} onPress={() => navigation.goBack()} />
        <Feather name='edit-2' size={25} color={'white'} style={styles.EditIcon} onPress={() => navigation.navigate('Edit',{item:item,allRecipe:allRecipe})} />
        <Ionicons name='trash-outline' size={25} color={'white'} style={styles.DeleteIcon} onPress={handleDelete} />

        <Image resizeMode='cover' style={styles.image} source={{ uri: item.image }} />
      </View>


      <View style={styles.singleDetailDiv}>

        <ScrollView>

          <View style={styles.singleDetailDivInside}>


            <Text style={styles.RecipeName}>{item.name}</Text>


            <View style={styles.RecipeActions}>

              <View style={[styles.RecipeActionsInside, { backgroundColor: 'rgba(184, 252, 136, 0.684)' }]}>
                <Ionicons name='time-outline' size={50} color={'green'} />
                <Text style={styles.minuteText}>{item.time} MIN</Text>


              </View>
              <View style={[styles.RecipeActionsInside, { backgroundColor: 'rgba(240, 252, 136, 0.684)' }]}>
                <Feather name='smile' size={50} color={'black'} />
                <Text style={styles.AverageText}>{item.process}</Text>

              </View>
              <View style={[styles.RecipeActionsInside, { backgroundColor: 'rgba(136, 177, 252, 0.684)' }]}>
                <Ionicons name='flame-outline' size={50} color={'blue'} />
                <Text > {item.calories}</Text>
                <Text style={styles.ServeText}> cal/serving</Text>

              </View>
            </View>

            {/* ingredients */}

            <View style={styles.ingredients}>
              <Text style={styles.ingredientsHeader}>Ingredients :</Text>
              {/* all ingredients */}


              {item.ingredients.map((item) => {
                return (
                  <View style={styles.Allingredients}>
                    <Text style={styles.ingredientsDot}></Text>
                    <Text style={styles.ingredientsName}>{item}</Text>



                  </View>
                )
              })}

            </View>




            {/* instruction */}
            <View style={styles.instructionDiv}>
              <Text style={styles.instructionHeader}>Instructions :</Text>
              <Text>
                {item.instruction}
              </Text>


            </View>



          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: WindowWidth * 0.7
  },
  singleDetailDiv: {
    backgroundColor: 'white',
    flex: 1,
    elevation: 10,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -30,
    paddingTop: 5
  },
  singleDetailDivInside: {
    flex: 1,
    margin: 18
  },
  backIcon: {
    position: 'absolute',
    top: 18,
    left: 20,
    zIndex: 10
  },
  EditIcon: {
    position: 'absolute',
    top: 18,
    right: 70,
    zIndex: 10,
    backgroundColor: 'blue',
    padding:5,
    borderRadius: 100,

  },

  DeleteIcon: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 10,
    backgroundColor: 'red',
    padding:5,
    borderRadius: 100,

  },

  RecipeName: {
    fontSize: 30,
    fontWeight: '500',
    margin: 5
  },
  RecipeActions: {
    flexDirection: 'row',
    marginTop: 15,

  },

  RecipeActionsInside: {
    height: 120,
    width: 102,
    borderRadius: 15,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ServeText: {
    paddingHorizontal: 10,
    marginTop: -2
  },
  AverageText: {
    marginTop: 8
  },
  minuteText: {
    marginTop: 6
  },
  ingredients: {
    marginTop: 30
  },
  ingredientsHeader: {
    fontSize: 23,
    marginBottom: 10,


  },
  Allingredients: {
    padding: 4,
    alignItems: 'center',
    flexDirection: 'row'
  },
  ingredientsDot: {
    height: 7,
    width: 7,
    backgroundColor: 'orange',
    borderRadius: 200

  },
  ingredientsName: {
    fontSize: 15,
    paddingHorizontal: 10

  },
  instructionDiv: {
    paddingHorizontal: 2,
    marginBottom: 10,

  },
  instructionHeader: {
    fontSize: 23,
    marginVertical: 10,
  },

})