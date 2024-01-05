import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import axios from 'axios';

import styles from './loginform.style'
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
         <TouchableOpacity onPress={() => handleLogin(username, password)}>
            <Text>Login</Text>
         </TouchableOpacity>
      </View>
   )
}

// REQUIRED: must have "EXPO_PUBLIC_API_URL=(your ipv4 address)" in .env file in root directory.
// function to handle login
const handleLogin = async (username, password) => {
   // set url for request
   const url = `http://${process.env.EXPO_PUBLIC_API_URL}:4000/api/user/login`;
   // set data for request
   let obj = { "username":username, "password":password };
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
   };
   // call axios with data to url
   axios(config)
      .then((response) => {
         let res = response.data;
         if (res.error) {
            console.log(res.error);
         }
         else {
            console.log("Login Successful! User's Token: " + res.token);
        }
      })
      .catch((error) => {
          console.log(error)
      });
}
