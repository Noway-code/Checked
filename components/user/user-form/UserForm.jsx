import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './userform.style';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import {router, useRouter} from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {decodeToken} from "../../tokenUtils";


export default function UserPageContent() {
	const [username, setUsername] = useState('');
	const [posts, setPosts] = useState([]);

	useEffect(() => {
	// Fetch user details and posts when the component mounts
		fetchUserData();
		fetchUserPosts()
	}, []);
	const fetchUserData = async () => {
		try {
			// Fetch user details from the API
			const token = await SecureStore.getItemAsync('token');

			// Ensure decodeToken returns a Promise and use await
			const decodedToken = await decodeToken(token);

			// Check if the decoded token is not null before accessing its properties
			if (decodedToken && decodedToken.username) {
				setUsername(decodedToken.username);
			} else {
				console.error('Decoded token or username is null.');
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
			// Handle the error accordingly
		}
	};


	const fetchUserPosts = async () => {
		// Fetch user posts from the API
		const token = await SecureStore.getItemAsync("token");
		const url = `http://${process.env.EXPO_PUBLIC_API_URL}:4000/api/post/posts`;
		let obj = { "username": username };

		let js = JSON.stringify(obj);

		let config = {
			method: "get",
			url: url,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			data: js
		}
		try {
			const response = await axios(config);

			let res = response.data;
			if (res.error) {
				console.error('Login error:', res.error);
			} else {
				console.log("Login Successful! User's Token: " + res.token);
				router.push('/');
			}
		} catch (error) {
			// Handle errors
		}

	};

	const viewPosts = () => {
		// Logic for viewing posts


	}

	const handleCreatePost = async () => {
		// Logic for creating a new post

	};

	return (
		<View style={styles.container}>
			{/*Feel Free to change the styling I was just experimenting*/}
			<TouchableOpacity activeOpacity={.6}>
				<LinearGradient onPress={handleCreatePost}
					// Button Linear Gradient
					colors={['#72cb68', '#31982b', '#1b9111']}
					style={styles.button}>
					<Text style={styles.text}>Make Post</Text>
				</LinearGradient>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={.8}>
				<LinearGradient onPress={handleCreatePost}
					// Button Linear Gradient
		            colors={['#045e62', '#1a6164', '#194b4d']}
		            style={styles.button}>
					<Text style={styles.text}>View Post</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
}
