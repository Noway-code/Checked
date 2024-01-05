import {StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useState } from "react";

import { LoginForm, RegisterForm } from "../components";


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
      <SafeAreaView>
         <View >
            <View >
               <TouchableOpacity onPress={()=>setIsLogin(true)}>
                  <Text>Login</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>setIsLogin(false)}>
                  <Text>RegisterForm</Text>
               </TouchableOpacity>
            </View>
            {displayForm()}
            </View>
      </SafeAreaView> 
   )
}

