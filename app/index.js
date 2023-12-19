import { View, Text } from "react-native-web";
import { Link } from "expo-router";

export default function Page(){
   return(
      <View>
         <Text>Home Page</Text>
         <Link href="/login">Login</Link>
         <Link href="/user-page">User Page</Link>
      </View>
   )
}