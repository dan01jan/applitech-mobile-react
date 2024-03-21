import React from 'react'
import Colors from '../color'
import Tabs from '../Components/Profile/Tabs'
import { View, ImageBackground, StyleSheet ,Image} from 'react-native'; // Import ImageBackground and StyleSheet from react-native
import { Center, Heading, Text } from 'native-base';
import bg from '../../assets/images/bg9.png'

function ProfileScreen() {
  return (
    <>
      
        <Center>
          <View style={styles.imageContainer}>
            {/* Place your image here */}
            <Image
              source={bg}
              style={{ width: 500, height: 200 }} // Adjust width and height as needed
            />
          </View>
        </Center>
        <Tabs/>
    
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
});

export default ProfileScreen;