import { Text, View,  StyleSheet, TextInput, Pressable, StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

//-------------------

const myTaskComponent = () => {

    
const CustomDivider = ({ color = '#ccc', thickness = 1, style }) => {
  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: color, height: thickness, alignSelf:"center" },
        style,
      ]}
    />
  );
};

    const Helloworld = () => {
        return(
            <View>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" />
                <View style={{flex:1}}>
                    <Text style={{fontSize:28, alignSelf:"center", marginTop:100}}>My Tasks</Text>
                    <Text style={{color:"#9E9E9E", fontSize:12, marginTop:5}}>Conditional: No overdue tasks</Text>
                </View>
                <View style={{flex:1}}>
                    <Image source={require('../../assets/images/menu-symbol-button.png')} style={{width:25, height:20, marginBottom: 10}}/>
                    <CustomDivider/>
                    <Text>Hello world!</Text>
                </View>
            </View>
        )
    }

  return (
    <>
      <View
        style={{
            backgroundColor:"#ffff",
            alignItems: "center",
        }}
      >
        <Helloworld/>
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
  divider: {
    width:"200%",
    height: "1%"
  }
});

export default myTaskComponent;