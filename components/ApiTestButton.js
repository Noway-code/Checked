// ApiTestButton.js
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { API_URL } from "@env";
import axios from "axios";

export default function ApiTestButton() {
	const handleApiTest = () => {
		console.log("Testing API connection...");
		const url = `${API_URL}/`;
		let config = {
			method: "get",
			url: url,
			headers: {
				"Content-Type": "application/json",
			},
		};
		axios(config)
			.then((response) => {
				let res = response.data;
				if (res.error) {
					console.log(res.error);
					ToastAndroid.show(res.error, ToastAndroid.SHORT);
				} else {
					console.log("API Connection Successful!");
					ToastAndroid.show("API Connection Successful!", ToastAndroid.SHORT);
				}
			})
			.catch((error) => {
				console.log(error);
				ToastAndroid.show("Failed", ToastAndroid.SHORT);
			});
	};

	return (
		<TouchableOpacity onPress={handleApiTest} style={styles.button}>
			<Text style={styles.buttonText}>Test API</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 16,
	},
});
