import {Text, View} from "react-native";
import {Link} from "expo-router";

export default function Page() {
	return (
		<View>
			<Text>Home Page</Text>
			<Link href="/login"><Text>Login</Text></Link>
			<Link href="/user-page"><Text>User Page</Text></Link>
		</View>
	)
}
