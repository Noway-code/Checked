import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './registerform.style';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import axios from 'axios';

// form type for user registration
export default function RegisterForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async (first, last, user, pass) => {
		try {
			// set url for request
			const url = `http://${process.env.EXPO_PUBLIC_API_URL}:4000/api/user/register`;
			// set data for request
			let obj = { "firstName": first, "lastName": last, "username": user, "password": pass };
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
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.formContainer}>
			<Text>This is the Register Form</Text>
			<TextInput placeholder="First Name" style={styles.formInput} onChangeText={setFirstName} />
			<TextInput placeholder="Last Name" style={styles.formInput} onChangeText={setLastName} />
			<TextInput placeholder="Username" style={styles.formInput} onChangeText={setUsername} />
			<TextInput placeholder="Password" style={styles.formInput} onChangeText={setPassword} />
			<TouchableOpacity onPress={() => handleRegister(firstName, lastName, username, password)}>
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
	);
}
