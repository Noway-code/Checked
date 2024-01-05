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
         <View style={styles.container}>
            <View style={styles.formWrapper}>
               <View style={styles.buttonGroup}>
                  <TouchableOpacity onPress={()=>setIsLogin(true)}>
                     <Text>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setIsLogin(false)}>
                     <Text>RegisterForm</Text>
                  </TouchableOpacity>
               </View>
               {displayForm()}
            </View>
         </View>
      </SafeAreaView> 
   )
}

const styles = StyleSheet.create({
   container:{
      flex:1,
      flexDirection:"column", 
      justifyContent:"center",
      alignItems:"center",

      padding:20,
   },
   formWrapper: {
      flex:1,
      flexDirection:"column",
      justifyContent:"center",

      width:"80%",
      padding:20,

      borderWidth:3,
      borderStyle:'solid',
      borderColor:'black'
   },
   buttonGroup: {
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      gap:100
   }
})