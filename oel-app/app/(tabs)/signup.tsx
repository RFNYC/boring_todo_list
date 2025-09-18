import { useState } from 'react';
import { Text, View,  StyleSheet, TextInput, Pressable } from 'react-native';



export default function signup() {

    // takes frm .env file from OEL's root directory.
    const BETA = process.env.EXPO_PUBLIC_BETA;

    const [name, setName] = useState('Enter your name')
    const [email, setEmail] = useState('Enter your email address')
    const [password, setPassword] = useState('Enter your password')
    const [confirmPassword, setConfirm] = useState('Enter your confirmed password')

    const makeCreatePOSTcall = (user_name: string, email_address: string, my_password: string) => {
    // fetch takes two arguments but usually you only see one. You may add an object containing specific headers or even specify that you're
    // making a post request instead.
      return fetch(`http://192.168.${BETA}:5000/user`, {
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
            "name": user_name,
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

    const signUpPressed = () => {
      if (password == confirmPassword) {
        
      } else {
        console.log("Make sure your passwords match!")
      }

    }

  const InputBoxes = ({ setName, setEmail, setPassword, setConfirm }) => {
  return(
    <View>
      <TextInput
        style={styles.input}
        placeholder={name}
        onSubmitEditing={(event) => {setName(event.nativeEvent.text)}}
      />
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
      <TextInput
        style={styles.input}
        placeholder={confirmPassword}
        onSubmitEditing={(event) => {setConfirm(event.nativeEvent.text)}}
      />
    </View>
  )
}
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <InputBoxes setName={setName} setPassword={setPassword} setConfirm={setConfirm} setEmail={setEmail}/>
      <Pressable onPress={() => makeCreatePOSTcall(name, email, password)}>
        <Text>Sign up!</Text>
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

