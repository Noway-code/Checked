import { StyleSheet, View, Text, TextInput} from 'react-native';
import Button from './Button';
// component that allows users to enter and submit login information.
export default function Form({ formType }){
   if (formType == 'register')
   {
      return (
         <View style={styles.formContainer}>
            <Text>This is the Register Form</Text>
            <TextInput placeholder="Username" style={styles.formInput}/>
            <TextInput placeholder="Password" style={styles.formInput}/>
            <Button label="Register"/>
         </View>
      ) 
   }
   return (
      <View style={styles.formContainer}>
         <Text>This is the Login Form</Text>
         <TextInput placeholder="Username" style={styles.formInput}/>
         <TextInput placeholder="Password" style={styles.formInput}/>
         <Button label="Login"/>
      </View>
   )
  
}

const styles = StyleSheet.create({
   formContainer: {
      padding:20,
      flexDirection:"column",
      alignItems:"center",
      gap:10,
      width:"100%"
   },
   formInput: {
      width:"100%"
   }
})