import { StyleSheet, View, Text, TextInput} from 'react-native';
import Button from '../Button';
// form type for app login
export default function LoginForm() {
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
      width:"100%",
      borderWidth:3,
      borderStyle:"solid",
      borderColor:"black",
   }
})