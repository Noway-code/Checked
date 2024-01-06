import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import UserForm from '../components/user/user-form/UserForm.jsx';

export default function UserPage() {
	return (
		<SafeAreaView>
			<View>
				<Text style={{color:"red"}}>Your user page!</Text>

				<UserForm />
			</View>
		</SafeAreaView>
	);
}



