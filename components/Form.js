import {StyleSheet, TextInput, View} from 'react-native';
import Button from './Button';

import LoginForm from "./form_types/LoginForm";
import RegisterForm from "./form_types/RegisterForm";

// component that allows users to access different form types
// default form is returned if no 'formType' is entered
// 'formType' is a string corresponding to a file in components/form_types
export default function Form({formType}) {
	if (formType == 'login') {
		return <LoginForm/>
	} else if (formType == 'register') {
		return <RegisterForm/>
	} else {
		return (
			<View style={styles.formContainer}>
				<TextInput placeholder="" style={styles.formInput}/>
				<TextInput placeholder="" style={styles.formInput}/>
				<Button label="Submit"/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	formContainer: {
		padding: 20,
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		width: "100%"
	},
	formInput: {
		width: "100%",
		borderWidth: 3,
		borderStyle: "solid",
		borderColor: "black",
	}
})
