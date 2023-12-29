import { StyleSheet, View, Text, TextInput} from 'react-native';
import Button from '../Button';

import { useState } from 'react';
import axios from 'axios';
// form type for user registration
export default function RegisterForm() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   return (
      <View style={styles.formContainer}>
         <Text>This is the Register Form</Text>
         <TextInput placeholder="First Name" 
            style={styles.formInput} 
            onChangeText={setFirstName}/>
         <TextInput placeholder="Last Name" 
            style={styles.formInput} 
            onChangeText={setLastName}/>
         <TextInput placeholder="Username" 
            style={styles.formInput} 
            onChangeText={setUsername}/>
         <TextInput placeholder="Password" 
            style={styles.formInput} 
            onChangeText={setPassword}/>
         <Button label="Register" onPress= {() => handleRegister(firstName, lastName, username, password)}/>
      </View>
   ) 
}
const handleRegister = async (first, last, user, pass) => {
   // set url for request
   const url = "http://localhost:4000/api/user/register"
   // set data for request
   let obj = { "firstName":first, "lastName":last, "username":user, "password":pass };
   // turn request into json objet
   let js = JSON.stringify(obj);

   // create configuration for request
   let config = {
      method: "post",
      url: url,
      headers: {
         "Content-Type": "application/json",
      },
      data: js,
   }
   // call axios with data to url
   axios(config)
      .then((response) => {
         let res = response.data;
         if (res.error)
         {
            console.log(res.error);
         }
         console.log(res.message)
      })
      .catch((error) => {
         console.log(error);
      });
   
} 
const styles = StyleSheet.create({
   formContainer: {
      padding:20,
      flexDirection:"column",
      alignItems:"center",
      gap:10,
      width:"100%"
   },
   formInput: {
      width:"100%",
      borderWidth:3,
      borderStyle:"solid",
      borderColor:"black",
   }
})