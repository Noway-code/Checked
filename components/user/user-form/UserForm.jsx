import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './userform.style';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import { useRouter } from 'expo-router';


export default function UserPageContent() {
	// const [username, setUsername] = useState('');
	// const [posts, setPosts] = useState([]);
	//
	// useEffect(() => {
	// Fetch user details and posts when the component mounts
	//
	// }, []);
	//
	// const fetchUserData = async () => {
	// Fetch user details from the API
	// };
	//
	// const fetchUserPosts = async () => {
	// Fetch user posts from the API
	// };
	//
	// const handleCreatePost = async () => {
	// 	Logic for creating a new post
	// 	axios.post('API_ENDPOINT_FOR_CREATE_POST', postData);
	// };

	return (
		<View style={styles.contentContainer}>
			<Text style={{color:"green"}}></Text>
		</View>
	);
}
