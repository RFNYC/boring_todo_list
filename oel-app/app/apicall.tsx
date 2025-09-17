import { Pressable, Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

//-------------------

const apicall = () => {

  const makeGETcall = () => {
    // fetch takes two arguments but usually you only see one. You may add an object containing specific headers or even specify that you're
    // making a post request instead.
    return fetch('http://127.0.0.1:5000/assignments')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };

  makeGETcall()

  const makeCreatePOSTcall = () => {
    // fetch takes two arguments but usually you only see one. You may add an object containing specific headers or even specify that you're
    // making a post request instead.
    return fetch('http://127.0.0.1:5000/assignments', {
      method: "POST",
      headers: {
        // tells the server that react will only accept JSON as a response
        Accept: 'application/json',
        // indicates the exact format of the data we're requesting to send?
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request: "create",
        info: {
          task: "Move work from IOS to Electron and React Native",
          context: "The organization is under full reshaping and we need this info moved over.",
          assignor: "Jay's stupid ass job",
          assignee_name: "Jay Noppone",
          assignee_id: "68c059d795678aa6fe109086",
          date_assigned: "Monday, September 15, 2025"
        }
      })

    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        return json;
      })
      .catch(error => {
        console.error(error);
      });


  };

  const makeDeletePOSTcall = () => {
    // fetch takes two arguments but usually you only see one. You may add an object containing specific headers or even specify that you're
    // making a post request instead.
    return fetch('http://127.0.0.1:5000/assignments', {
      method: "POST",
      headers: {
        // tells the server that react will only accept JSON as a response
        Accept: 'application/json',
        // indicates the exact format of the data we're requesting to send?
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request: "delete",
        _id: "68c83c7a4cdf7d4d22a20976"
      })

    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        return json;
      })
      .catch(error => {
        console.error(error);
      });


  };

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
        <Pressable style={{ margin: 10 }} onPress={() => makeCreatePOSTcall()}>
          <Text>Press to make a create post call.</Text>
        </Pressable>
        <Pressable style={{ margin: 10 }} onPress={() => makeDeletePOSTcall()}>
          <Text>Press to make a delete post call.</Text>
        </Pressable>
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

export default apicall;