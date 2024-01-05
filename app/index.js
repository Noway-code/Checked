import { View, Text, TouchableOpacity } from "react-native";
import { Link, Stack, useRouter } from "expo-router";

export default function Home(){
   const router = useRouter();
   return (
      <View>
         <Stack.Screen 
            options={{
               headerTitle: "Login"
            }}
         />
         <Text>Home Page</Text>
         <TouchableOpacity onPress={() => router.push("/login")}>
            <Text>Login test</Text>
         </TouchableOpacity>
         <Link href="/login"><Text>Login</Text></Link>
         <Link href="/user-page"><Text>User Page</Text></Link>
      </View>
   )
}