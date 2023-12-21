import { StyleSheet, View, Text } from "react-native-web";
import { useState } from "react";

import Button from "../components/Button";
import Form from "../components/Form";
export default function Page(){
   const [isLogin, setIsLogin] = useState(true);
   return(
      <View style={styles.container}>
         <View>
            <Text>Login Page</Text>
         </View>
         <View style={styles.formWrapper}>
            <View style={styles.buttonGroup}>
               <Button label="Login" onPress={()=>setIsLogin(true)}/>
               <Button label="Register" onPress={()=>setIsLogin(false)}/>
            </View>
            { (isLogin) ? <Form formType="login"/> : <Form formType="register" /> }
         </View>
      </View>
      
   )
   
}
const styles = StyleSheet.create({
   container:{
      flex:1,
      flexDirection:"column", 
      alignItems:"center",
   },
   formWrapper: {
      flexDirection:"column",
      justifyContent:"flex-start",

      width:"80%",
      padding:20,

      borderWidth:3,
      borderStyle:'solid',
      borderColor:'black'
   },
   buttonGroup: {
      flex:1,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      gap:100
   }
})