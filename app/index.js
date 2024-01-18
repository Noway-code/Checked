import { View, Text, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";

import { LoginForm, RegisterForm } from "../components";

const logo = require('../assets/images/logo.png')
export default function LoginPage(){
   const [isLogin, setIsLogin] = useState(true);
   const displayForm = () => {
      if (isLogin) {
         return <LoginForm />
      }
      else {
         return <RegisterForm />
      }
   }
   return(
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
         <Stack.Screen />
         <View >
            <TouchableOpacity onPress={()=>setIsLogin(true)}>
               <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setIsLogin(false)}>
               <Text>RegisterForm</Text>
            </TouchableOpacity>
         </View>
         {displayForm()}

      </SafeAreaView> 
   )
}

