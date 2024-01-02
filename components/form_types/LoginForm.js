import React, {useState} from 'react';
import {API_URL} from "@env";
import {StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import Button from '../Button';
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

// REQUIRED: must have "API_URL=http://(your ipv4):4000" in .env file in root directory.
// function to handle login
const handleLogin = async (username, password) => {
	// set url for request
	const url = `${API_URL}/api/user/login`;
	// set data for request
	let obj = {"username": username, "password": password};
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
				ToastAndroid.show(res.error, ToastAndroid.SHORT);
			} else {
				console.log("Login Successful! User's Token: " + res.token);
				ToastAndroid.show("Login Successful!", ToastAndroid.SHORT);
			}
		})
		.catch((error) => {
			console.log(error)
			ToastAndroid.show("Failed", ToastAndroid.SHORT);
		});
}
const styles = StyleSheet.create({
	formContainer: {
		padding: 20,
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		width: "100%"
	},
	formInput: {
		width: "100%",
		borderWidth: 3,
		borderStyle: "solid",
		borderColor: "black",
		padding: 10
	}
})
