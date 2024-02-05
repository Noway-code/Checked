import { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { isValidUsername, isValidPassword, isValidName } from '../validation';

import styles from './registerform.style';

import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {router} from "expo-router";

// form type for user registration
export default function RegisterForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

   const [usernameError, setUsernameError] = useState([]);
   const [passwordError, setPasswordError] = useState([]);
   const [firstNameError, setFirstNameError] = useState([]);
   const [lastNameError, setLastNameError] = useState([]);


	const handleRegister = () => {
      const usernameTest = isValidUsername(username);
      const passwordTest = isValidPassword(password);
      const firstNameTest = isValidName(firstName);
      const lastNameTest = isValidName(lastName)

      // update username errors
      if (usernameTest != usernameError) {
         setUsernameError(usernameTest);
      }
      // update password errors
      if (passwordTest != passwordError) {
         setPasswordError(passwordTest);
      }
      // update first name errors
      if (firstNameTest != firstNameError) {
         setFirstNameError(firstNameTest);
      }

      if (lastNameTest != lastNameError) {
         setLastNameError(lastNameTest);
      }
      // update last name errors

      // if there are no username errors and no password errors, call the handle submit function
      if (usernameTest.length == 0 && passwordTest.length == 0 && firstNameTest.length == 0
          && lastNameTest.length == 0)
      {
         handleSubmit();
      }
	}

   const handleSubmit = async () => {
      try {
			// set url for request
			const url = `http://${process.env.EXPO_PUBLIC_API_URL}:4000/api/user/register`;
			// set data for request
			let obj = { "firstName": firstName, "lastName": lastName, "username": username, "password": password };
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
				console.log(res.message);

				// Print out the user's token
				if (res.token) {
					console.log("User's Token: " + res.token);
					// You can also store the token in SecureStore here if needed
					await SecureStore.setItemAsync('userToken', res.token);
					// Redirect to the home page
					router.push('/');
				}
			}
		} catch (error) {
			console.log(error);
		}
   }

	return (
		<View style={styles.formContainer}>
			<Text>This is the Register Form</Text>
			<TextInput placeholder="First Name" style={styles.formInput} onChangeText={setFirstName} />

         {firstNameError.length == 0
            ? null
            : (
               <View>
                  {firstNameError.map((error) => (
                     <Text key={error}>{error}</Text>
                  ))}
               </View>)
         }

			<TextInput placeholder="Last Name" style={styles.formInput} onChangeText={setLastName} />

         {lastNameError.length == 0
            ? null
            : (
               <View>
                  {lastNameError.map((error) => (
                     <Text key={error}>{error}</Text>
                  ))}
               </View>)
         }

			<TextInput placeholder="Username" style={styles.formInput} onChangeText={setUsername} />

         {usernameError.length == 0
            ? null
            : (
               <View>
                  {usernameError.map((error) => (
                     <Text key={error}>{error}</Text>
                  ))}
               </View>)
         }

			<TextInput placeholder="Password" style={styles.formInput} onChangeText={setPassword} />

         {passwordError.length == 0
            ? null
            : (
               <View>
                  {passwordError.map((error) => (
                     <Text key={error}>{error}</Text>
                  ))}
               </View>)
         }

			<TouchableOpacity onPress={() => handleRegister()}>
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
	);
}
