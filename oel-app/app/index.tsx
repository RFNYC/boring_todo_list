import { Pressable, Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('my-key', value);
  } catch (e) {
    // saving error
  }
  console.log("store data touched.")
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    if (value !== null) {
      // value previously stored
      // We're expecting a string depicting an array of objects, this removes it from string form.
      let arrObjects = JSON.parse(value)
      return (arrObjects)
    }
  } catch (e) {
    // error reading value
  }
  console.log("get data touched.")
};


//-------------------

const Index = () => {

  const refill = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    }
  ];
  
  // After react mounts retrieve the data saved locally & set it.
  useEffect(() => {
    const fetchData = async () => {
      let DATA = await getData()

      setList(DATA)
    }

    fetchData()
  }, [])

  // For keeping track of To-Dos
  const [listData, setList] = useState('...');
  
  // For adding To-Dos
  const [task, setTask] = useState('')

  // variable handle delete is equal to a function that does ...
  const handleDelete = (title: string) => {
    const newData = listData.filter(item => item.title !== title)
    setList(newData)
    
    // If you console log listData it still returns all items even after deleting one.
    // to get around this we'll ignore the state var and save the newData var we just created.
    console.log(listData)
    
    storeData(JSON.stringify(newData))
  }

  const handleAdd = () => {
    // I have zero fucking clue why i had to stringify something thats already a string but if it works it works
    const currentData = JSON.parse(JSON.stringify(listData))
    let number_of_tasks = currentData.length

    // currentData is 0th indexed so just add to the end by taking the length of the array/object.
    currentData[number_of_tasks] = JSON.parse(task)
    storeData(JSON.stringify(currentData))
    console.log(currentData)

    console.log(task)
    setList(currentData)
  }


  const CreateTask = () => {
    return(
      <View>
        <TextInput
            style={styles.input}
            placeholder="add a task"
            onSubmitEditing={(event) => { console.log( event.nativeEvent.text), setTask(event.nativeEvent.text) } }
            enablesReturnKeyAutomatically={false}
          />
          <Pressable onPress={() => handleAdd()}>
            <Text>Add to list</Text>
          </Pressable>
      </View>
    )
  }

  return (
    <>
    <View
      style={{
        flex: .5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello world!</Text>
      <Pressable onPress={() => storeData(JSON.stringify(listData))}>
        <Text>save</Text>
      </Pressable>
      <Pressable onPress={() => getData()}>
        <Text>get</Text>
      </Pressable>
      <Text>-----------------------------------------</Text>
      <FlatList data={listData} renderItem={({item}) => (
        <View>
          <Text>{item.id}</Text>
          <Text>{item.title}</Text>
          <Pressable onPress={() => handleDelete(item.title)}>
            <Text>click to delete item</Text>
          </Pressable>
        </View>
      )}/>
      <Text>------------------------------------------</Text>
      <Pressable onPress={() => {setList(refill), storeData(JSON.stringify(refill))}}>
        <Text>Refill data</Text>
      </Pressable>
      <CreateTask></CreateTask>
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