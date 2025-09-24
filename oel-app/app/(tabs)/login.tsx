import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View,  StyleSheet, TextInput, Pressable, StatusBar, Image } from 'react-native';



export default function login() {
    const router = useRouter();

    // takes frm .env file from OEL's root directory.
    const BETA = process.env.EXPO_PUBLIC_BETA;

    const [email, setEmail] = useState('Enter your email address')
    const [my_password, setPassword] = useState('Enter your password')

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

  const ConfirmationButton =  ( {text_placeholder, confirmFunc} ) => {
    return(
      <View>
        <Pressable style={({pressed}) => [
          styles.confirmButton,
          { backgroundColor: pressed ? "#376a8eff" :'#1e4663ff'}
        ]} 
        onPress={() => confirmFunc(email, my_password)}>
          <Text style={{color:"white"}}>{text_placeholder}</Text>
        </Pressable>
      </View>
    )
  }

  const PageRedirect = () => {
    return(
      <View style={{flex:0.10, flexDirection:"row", justifyContent:"center", marginBottom:30}}>
        <Text style={{fontWeight:"100"}}>Don't have an account?  </Text>
        <Pressable>
          <Link style={{ color: "#1e4663ff", fontWeight: "bold" }} href={'/signup'}>Create Account</Link>
        </Pressable>
      </View>
    )
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

  const InputBoxes = ({ setEmail, setPassword }) => {
  return(
    <View>
      <InputBox heading_placeholder={"Email"} text_placeholder={email} setFunc={setEmail}/>
      <InputBox heading_placeholder={'Password'} text_placeholder={my_password} setFunc={setPassword}/>
    </View>
  )
}
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" />
      <View>
        <Image source={require("../../assets/images/icon2.png")} style={styles.topImage}/>
      </View>
      <Text style={styles.text}>Sign into your account</Text>
      <InputBoxes setPassword={setPassword} setEmail={setEmail}/>
      <Pressable onPress={() => {console.log("forgot password pressed.")}}>
        <Text style={{color:"#7F7F7F"}}>Forgot Password?</Text>
      </Pressable>
      <ConfirmationButton text_placeholder={"Login"} confirmFunc={handleLogin} />
      <PageRedirect/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"space-evenly",
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  text: {
    color: '#1e4663ff',
    fontWeight:"medium",
    fontSize:26
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