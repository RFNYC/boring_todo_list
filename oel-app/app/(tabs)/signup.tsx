import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Text, View,  StyleSheet, TextInput, Pressable, Image, StatusBar } from 'react-native';

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
          console.log(error)
        });
      }

      const checkPassword = async (password: string, password2: string, user_name: string, email_address: string) => {
        if (password == password2){
          console.log("Passwords matched.")

          console.log(user_name, email_address, password)
          let result = await makeCreatePOSTcall(user_name, email_address, password)
          console.log(result)
          
          if (result['signUp'] == true){
            router.navigate('/')
          } else {
            console.log("Login unsuccesssful please try again.")
          }
        } else {
          console.log("Passwords didn't match, try again.")
        }
      }

const InputBox = ({ setFunc, text_placeholder, heading_placeholder }) => {
  return (
    // Space between full input box component (including the header) and other elements on the screen
    <View style={{margin:10}}>
      <Text style={styles.input_heading}>{heading_placeholder}</Text>
      <TextInput
        style={styles.input}
        onSubmitEditing={(event) => setFunc(event.nativeEvent.text)}
        placeholder={text_placeholder}
      />
    </View>
  );
};

const ConfirmationButton =  ( {text_placeholder, confirmFunc} ) => {
  return(
    <View>
      <Pressable style={styles.confirmButton} onPress={() => confirmFunc(my_password, confirmPassword, name, email)}>
        <Text style={{color:"white"}}>{text_placeholder}</Text>
      </Pressable>
    </View>
  )
}

const PageRedirect = () => {
  return(
    <View style={{flex:0.10, flexDirection:"row", justifyContent:"center"}}>
      <Text style={{fontWeight:"100"}}>Already have an account?  </Text>
      <Pressable>
        <Link style={{ color: "#1e4663ff", fontWeight: "bold" }} href={'/login'}>Back to Sign In</Link>
      </Pressable>
    </View>
  )
}

  const InputBoxes = ({ setName, setEmail, setPassword, setConfirm }) => {
  return(
    <View>
      <InputBox heading_placeholder={'Name'} text_placeholder={name} setFunc={setName}/>
      <InputBox heading_placeholder={"Email"} text_placeholder={email} setFunc={setEmail}/>
      <InputBox heading_placeholder={'Password'} text_placeholder={my_password} setFunc={setPassword}/>
      <InputBox heading_placeholder={'Confirm password'} text_placeholder={confirmPassword} setFunc={setConfirm}/>
    </View>
  )
}
  
  return (
    <View style={styles.container}>  
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" />
        <View style={styles.inputContainer}>
        <View>
          <Image source={require("../../assets/images/icon2.png")} style={styles.topImage}/>
        </View>
        <InputBoxes setName={setName} setPassword={setPassword} setConfirm={setConfirm} setEmail={setEmail}/>
      </View>
       <ConfirmationButton text_placeholder={"Sign up"} confirmFunc={checkPassword}/>
       <PageRedirect/>
    </View>
  );
}

// makeCreatePOSTcall(name, email, my_password)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  text: {
    color: '#000000ff',
  },
  inputContainer: {
    flex: 1,
    // space around an element
    justifyContent: "center",
    alignItems:"center",
    flexDirection: "column",
  },

  // text & input box styling
  input: {
    minWidth: "89%",
    // space around an input box
    borderWidth: 1,
    borderColor: '#9E9E9E',
    borderRadius: 8,
    // space inside an input box
    padding: "3.5%",
    color: "#C6C6C6",
    fontWeight: "medium"
  },
  input_heading: {
    fontWeight: "500",
    marginBottom: "1%"
  },
  // START MAKING SIGNUP/SIGN IN BUTTON HERE. | ALSO STOP USING LAPTOP FOR REFERENCE OUTSIDE OF MECHANICAL DEVELOPMENT. NO UI.
  // Also make the page scrollable so that when u pull up ur keyboard or something it doesnt block the view of what you're typing.
  confirmButton: {
    margin: "4%",
    marginTop: "20%",
    backgroundColor: "#1e4663ff",
    padding: "3.5%",
    minWidth: "87%",
    borderRadius: 30,
    justifyContent:"center",
    // puts text in the middle
    alignItems:"center"
  },
  topImage: {
    width: 200,
    height: 150,
  }
});