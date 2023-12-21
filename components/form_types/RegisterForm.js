import { StyleSheet, View, Text, TextInput} from 'react-native';
import Button from '../Button';

// form type for user registration
export default function RegisterForm() {
   return (
      <View style={styles.formContainer}>
         <Text>This is the Register Form</Text>
         <TextInput placeholder="First Name" style={styles.formInput}/>
         <TextInput placeholder="Last Name" style={styles.formInput}/>
         <TextInput placeholder="Username" style={styles.formInput}/>
         <TextInput placeholder="Password" style={styles.formInput}/>
         <Button label="Register"/>
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