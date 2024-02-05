import React from 'react';
import { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { isValidUsername, isValidPassword} from '../validation';

import styles from './loginform.style'

import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import axios from 'axios';

// form type for app login

export default function LoginForm() {
   const router = useRouter();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const [usernameError, setUsernameError] = useState([]);
   const [passwordError, setPasswordError] = useState([]);

   // REQUIRED: must have "EXPO_PUBLIC_API_URL=(your ipv4 address)" in .env file in root directory.
   // function to handle login
   const handleLogin = () => {
      const usernameTest = isValidUsername(username);
      const passwordTest = isValidPassword(password);

      // update username errors
      if (usernameTest != usernameError) {
         setUsernameError(usernameTest);
      }
      // update password errors
      if (passwordTest != passwordError) {
         setPasswordError(passwordTest);
      }

      // if there are no username errors and no password errors, call the handle submit function
      if (usernameTest.length == 0 && passwordTest.length == 0)
      {
         handleSubmit();
      }
   };

   const handleSubmit = async () => {
      try {
         // set url for request
         const url = `http://${process.env.EXPO_PUBLIC_API_URL}:4000/api/user/login`;
         // set data for request
         let obj = { "username": username, "password": password };
         // turn request into json object
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
         const response = await axios(config);

         let res = response.data;
         if (res.error) {
            console.log(res.error);
         } else {
            // Store the token securely
            await SecureStore.setItemAsync('userToken', res.token);
            console.log("Login Successful! User's Token: " + res.token);

            router.push('/');
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <View style={styles.formContainer}>
         <Text>This is the Login Form</Text>
         <TextInput placeholder="Username"
            style={styles.formInput}
            onChangeText={setUsername}/>

         {usernameError.length == 0
            ? null
            : (
               <View>
                  {usernameError.map((error) => (
                     <Text key={error}>{error}</Text>
                  ))}
               </View>)
         }

         <TextInput placeholder="Password"
            style={styles.formInput}
            onChangeText={setPassword}/>

         {passwordError.length == 0
            ? null
            : (
               <View>
                  {passwordError.map((error) => (
                     <Text key={error}>{error}</Text>
                  ))}
               </View>)
         }

         <TouchableOpacity onPress={handleLogin}>
            <Text>Login</Text>
         </TouchableOpacity>
      </View>
   )
}

