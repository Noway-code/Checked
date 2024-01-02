import {StyleSheet} from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";

// creates a button element that has text 'label' and calls function 'onPress'
export default function Button({label, onPress}) {
	return (
		<AwesomeButton
			onPress={onPress}
		>
			{label}
		</AwesomeButton>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {},
	button: {
		borderWidth: 2,
		borderStyle: "solid",
		borderColor: "black"
	},
	buttonLabel: {},
})
