import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';

import ImageViewer from './components/ImageViewer';

const PlaceholderImage = require('./assets/bocchi.png')
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
         <ImageViewer placeholderImageSource={PlaceholderImage}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
   flex: 1,
   backgroundColor: '#25292e',
   alignItems: 'center'
  },
});
