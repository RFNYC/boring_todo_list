import { Text, View,  StyleSheet, TextInput, Pressable, StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

//-------------------

const myTaskComponent = () => {

    
const CustomDivider = ({ color = '#b7b7b7ff', thickness = 1, style }) => {
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
            <View style={{width: '100%', flex: .7}}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" />
                {/* Content above the divider - set flex: 0.8 for half screen */}
                <View style={{width: '100%', alignItems: 'center', paddingTop: 100, paddingBottom: 20, flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize:28}}>My Tasks</Text>
                    <Text style={{color:"#9E9E9E", fontSize:12, marginTop:5}}>No overdue tasks</Text>
                </View>
                <Image source={require('../../assets/images/menu-symbol-button.png')} style={{width:25, height:17, marginBottom: 15, marginLeft:21}}/>

                <CustomDivider/>
                
                {/* Content below the divider - set flex: 1 for the other half screen */}
                <View style={{width: '100%', alignItems: 'center', paddingBottom: 20, flex: 1.1, justifyContent: 'center'}}>
                    <Text style={{color:"#b7b7b7ff", fontSize: 20, fontWeight:"300", paddingBottom:10}}>Nothing here yet...</Text>
                    <Text style={{width:"50%", textAlign:"center", color:"#c0bbbbff", fontSize:11}}>Tap the 3 lines to pull up the menu and add add a new task.</Text>
                </View>
            </View>
        )
    }

  return (
    <>
      <View
        style={{
            flex: 1,
            backgroundColor:"#ffff",
            alignItems: 'center'
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
    width:"90%",
    height: 1
  }
});

export default myTaskComponent;