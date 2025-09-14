import { Pressable, Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

//-------------------

const Index = () => {
  
    const makeAPIcall = () => {
  return fetch('')
    .then(response => response.json())
    .then(json => {
        console.log(json)
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

    makeAPIcall()

  return (
    <>
    <View
      style={{
        flex: .8,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Text>Hello World!</Text>
    </View>
  </>
  )
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Index;