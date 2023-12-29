import React from 'react';
import {StyleSheet, View, Text, TextInput, ToastAndroid } from 'react-native';
import Button from '../Button';

import { useState } from 'react';
import { router } from 'expo-router';
import axios from 'axios';
// form type for app login
export default function LoginForm() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   return (  
      <View style={styles.formContainer}>
         <Text>This is the Login Form</Text>
         <TextInput placeholder="Username" 
            style={styles.formInput}
            onChangeText={setUsername}/>
         <TextInput placeholder="Password" 
            style={styles.formInput}
            onChangeText={setPassword}/>
         <Button label="Login" onPress={() => handleLogin(username, password)}/>
      </View>
   )
}

const handleLogin = async (user, pass) => {
   // set url for request
   const url = "http://localhost:4000/api/user/login"
   // set data for request
   let obj = { "username":user, "password":pass };
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
            ToastAndroid.show(res.error, ToastAndroid.SHORT);
         }
        else
        {
            console.log("Login Successful!");
            ToastAndroid.show("Login Successful!", ToastAndroid.SHORT);
        }
         router.replace('/')
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