import { StyleSheet, View, Text, StatusBar } from "react-native";
import { useState } from "react";

import Button from "../components/Button";
import Form from "../components/Form";
export default function Page(){
   const [isLogin, setIsLogin] = useState(true);
   return(
      <View style={styles.container}>
         <View style={styles.formWrapper}>
            <View style={styles.buttonGroup}>
               <Button label="Login" onPress={()=>setIsLogin(true)}/>
               <Button label="Register" onPress={()=>setIsLogin(false)}/>
            </View>
            <View>{(isLogin)?<Form formType="login"/>:<Form formType="register" />}
            </View>
         </View>
         <StatusBar style="auto" />
      </View>
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