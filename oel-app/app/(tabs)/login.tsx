import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View,  StyleSheet, TextInput, Pressable } from 'react-native';



export default function login() {
    const router = useRouter();

    // takes frm .env file from OEL's root directory.
    const BETA = process.env.EXPO_PUBLIC_BETA;

    const [email, setEmail] = useState('Enter your email address')
    const [password, setPassword] = useState('Enter your password')

    const makeCreatePOSTcall = (email_address: string, my_password: string) => {
      return fetch(`http://192.168.${BETA}:5000/user`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request: "login",
          info: {
            "email-address": email_address,
            "password": my_password
          }
        })

        })
        .then(response => response.json())
        .then(json => {
          console.log(json)
          return json;
        })
        .catch(error => {
          // console.error(error);
          console.log("...")
        });
      }
    
  // this func ordinarilly returns a promise so you need to make it asynchronous and await that response before printing
  const handleLogin = async (email_address: string, my_password: string) => {
    let result = await makeCreatePOSTcall(email_address, my_password)
    if (result['login'] == true){
      router.navigate('/')
    } else {
      console.log("Login unsuccesssful please try again.")
    }
  }

  const InputBoxes = ({ setEmail, setPassword }) => {
  return(
    <View>

      <TextInput
        style={styles.input}
        placeholder={email}
        onSubmitEditing={(event) => {setEmail(event.nativeEvent.text)}}
      />
      <TextInput
        style={styles.input}
        placeholder={password}
        onSubmitEditing={(event) => {setPassword(event.nativeEvent.text)}}
      />

    </View>
  )
}
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <InputBoxes setPassword={setPassword} setEmail={setEmail}/>
      <Pressable onPress={() => handleLogin(email, password)}>
        <Text>Login!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaeaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000000ff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

