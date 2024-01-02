import React from "react";
import {StyleSheet, Text, View} from "react-native";
import { Link } from "expo-router";
import ApiTestButton from "../components/ApiTestButton";

export default function Page() {
	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Home Page</Text>
				<Link href="/login">
					<Text style={styles.linkText}>Login</Text>
				</Link>
				<Link href="/user-page">
					<Text style={styles.linkText}>User Page</Text>
				</Link>
				{/* Use the ApiTestButton component */}
				<ApiTestButton />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	wrapper: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		width: "80%",
		padding: 20,
		borderWidth: 3,
		borderStyle: "solid",
		borderColor: "black",
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		color: "green",
		fontWeight: "bold",
	},
	linkText: {
		fontSize: 18,
		marginBottom: 10,
	},
});
