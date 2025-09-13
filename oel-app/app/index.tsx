import { Pressable, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

const storeData = async (value: { task_name: string; desc: string; }) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-key', jsonValue);
  } catch (e) {
    // saving error
    console.log(e)
  }
  console.log("store button touched")
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    console.log(jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e)
  }
  console.log("get button touched")
};


const Index = () => {
  const [myVar, setVar] = useState("...");

  useEffect(() => {
    const fetchData = async () => {
      let info = await getData()

      setVar(info.task_name)
    }

    fetchData()
  }, [])
  
  return (
    <>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello world!</Text>
      <Pressable onPress={() => storeData({task_name:"migrate to react",desc:"provided by jay's annoying employer"})}>
        <Text>save</Text>
      </Pressable>
      <Pressable onPress={() => getData()}>
        <Text>get</Text>
      </Pressable>
      <Text>{myVar}</Text>
    </View>
  </>
  )
};

export default Index;