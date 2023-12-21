import {StyleSheet, View, Pressable, Text } from 'react-native';

// creates a button element that has text 'label' and calls function 'onPress'
export default function Button({ label, onPress })
{
   return(
      <View>
         <Pressable onPress={onPress}>
            <Text>{label}</Text>
         </Pressable>
      </View>
   )
}

const styles = StyleSheet.create({
   buttonContainer:{

   },
   button: {

   },
   buttonLabel: {

   },
})