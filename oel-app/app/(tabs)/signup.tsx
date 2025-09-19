import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View,  StyleSheet, TextInput, Pressable } from 'react-native';

// **before doing UI design ensure you have password confirmation/deny working.

export default function signup() {
    // Allows us to call router and its methods
    const router = useRouter();

    // takes frm .env file from OEL's root directory.
    const BETA = process.env.EXPO_PUBLIC_BETA;

    const [name, setName] = useState('Enter your name')
    const [email, setEmail] = useState('Enter your email address')
    const [my_password, setPassword] = useState('Enter your password')
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

      const checkPassword = async (password: string, password2: string, user_name: string, email_address: string) => {
        if (password == password2){
          console.log("Passwords matched.")

          let result = await makeCreatePOSTcall(user_name, email_address, password)
          if (result['signUp'] == true){
            router.navigate('/')
          } else {
            console.log("Login unsuccesssful please try again.")
          }
        } else {
          console.log("Passwords didn't match, try again.")
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
        placeholder={my_password}
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
      <Pressable onPress={() => checkPassword(my_password, confirmPassword, name, email)}>
        <Text>Sign up!</Text>
      </Pressable>
    </View>
  );
}

// makeCreatePOSTcall(name, email, my_password)

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

