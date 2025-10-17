import { Text, View,  StyleSheet, TextInput, Pressable, StatusBar, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import React from 'react';
import { IconButton, MD3Colors, List } from 'react-native-paper';

//-------------------

const myTaskComponent = () => {

  const EXTRA_DATA = [
    {
      "id": "Task1",
      "desc": "From placeholder data",
      "date": "10/4/2025" 
    },
    {
      "id": "Task2",
      "desc": "From placeholder data",
      "date": "10/4/2025" 
    },
    {
      "id": "Task3",
      "desc": "From placeholder data",
      "date": "10/4/2025" 
    },
  ]
    
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


  const [logged, setLogged] = useState(false);

  const changeLogState = () => {
    // set the current bool value to the value that is NOT the current bool value.
    setLogged(previousState => !previousState)
  }


  const NoTasks = () => {
      return(
          <View style={{width: '100%', flex: .7}}>
              <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" />
              {/* Content above the divider - set flex: 0.8 for half screen */}
              <View style={{width: '100%', alignItems: 'center', paddingTop: 100, paddingBottom: 20, flex: 1, justifyContent: 'center'}}>
                  <Text style={{fontSize:28}}>My Tasks</Text>
                  <Text style={{color:"#9E9E9E", fontSize:12, marginTop:5}}>No overdue tasks</Text>
              </View>
              <Image source={require('../../assets/images/menu-symbol-button.png')} style={{width:25, height:17, marginBottom: 15, marginLeft:21}}/>

              <CustomDivider style={undefined}/>
              
              {/* Content below the divider - set flex: 1 for the other half screen */}
              <View style={{width: '100%', alignItems: 'center', paddingBottom: 20, flex: 1.1, justifyContent: 'center'}}>
                  <Text style={{color:"#b7b7b7ff", fontSize: 20, fontWeight:"300", paddingBottom:10}}>Nothing here yet...</Text>
                  <Text style={{width:"50%", textAlign:"center", color:"#c0bbbbff", fontSize:11}}>Tap the 3 lines to pull up the menu and add add a new task.</Text>
                  <Pressable onPress={changeLogState}>
                    <Text>Press to change state.</Text>
                  </Pressable>
              </View>
          </View>
      )
  }

  const WithTasks = () => {

        /**
   * @param {{isExpanded: boolean, children: React.ReactNode}} props
   */
  const AnimatedAccordionContent = ({ isExpanded, children }) => {
    // 1. Animated.Value to control the height
    const animatedHeight = React.useRef(new Animated.Value(0)).current;
    const [contentHeight, setContentHeight] = React.useState(0);
  
    React.useEffect(() => {
      if (contentHeight > 0) {
        Animated.timing(animatedHeight, {
          toValue: isExpanded ? contentHeight : 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    }, [isExpanded, contentHeight, animatedHeight]);
  
    const onLayout = React.useCallback((event) => {
      if (contentHeight === 0) {
        setContentHeight(event.nativeEvent.layout.height);
      }
    }, [contentHeight]);
  
    return (
      <Animated.View style={[styles.animatedWrapper, { height: animatedHeight }]}>
        <View onLayout={onLayout} style={styles.contentContainer}>
          {children}
        </View>
      </Animated.View>
    );
  };
  
  const ButtonComponent = ({listItem}) => (
    <IconButton
      // originates from "react native *material icons* "
      icon="crop-square"
      iconColor={MD3Colors.error0}
      size={20}
      onPress={() => handleDelete(listItem.id)}
    />
  );
  
  const ListComponent = ({listItem}) => {
    const [expanded, setExpanded] = React.useState(false);
  
    const handlePress = () => setExpanded(!expanded);
  
    return (
        <List.Accordion
          title= {listItem.id}
          left={props => <List.Icon {...props} icon="folder"/>}
          description={listItem.date}
          expanded={expanded}
          onPress={handlePress}
        >
          <AnimatedAccordionContent isExpanded={expanded}>
            <List.Item
              title={"Instructions:"}
              left={props => <ButtonComponent listItem={listItem}/>}
              descriptionNumberOfLines={10}
              description={listItem.desc}
            />
          </AnimatedAccordionContent>
        </List.Accordion>
    );
  };  

      return(
          <View style={{width: '100%', flex: .7}}>
              <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" />
              {/* Content above the divider - set flex: 0.8 for half screen */}
              <View style={{width: '100%', alignItems: 'center', paddingTop: 100, paddingBottom: 20, flex: 1, justifyContent: 'center'}}>
                  <Text style={{fontSize:28}}>My Tasks</Text>
                  <Text style={{color:"#9E9E9E", fontSize:12, marginTop:5}}>No overdue tasks</Text>
              </View>
              <Image source={require('../../assets/images/menu-symbol-button.png')} style={{width:25, height:17, marginBottom: 15, marginLeft:21}}/>

              <CustomDivider style={undefined}/>
              
              {/* Content below the divider - set flex: 1 for the other half screen */}
              <View style={{width: '100%', alignItems: 'center', paddingBottom: 20, flex: 1.1, justifyContent: 'center'}}>
                  <Pressable onPress={changeLogState}>
                  </Pressable>
                  <FlatList data={EXTRA_DATA} style={{width:"100%"}} renderItem={({item}) => (
                          <View>
                            <ListComponent listItem={item}/>
                          </View>
                  )}/>
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
        { logged ? <NoTasks/> : <WithTasks/> }
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
  },
  container: {
      paddingTop: 40,
      flex: 1, // 
  },
  header: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingHorizontal: 16,
  },
  animatedWrapper: {
      overflow: 'hidden', 
  },
  contentContainer: {
      position: 'absolute', 
      top: 0, 
      width: '100%',
  }
});

export default myTaskComponent;