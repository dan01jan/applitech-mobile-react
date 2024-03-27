import { View, StyleSheet} from 'react-native'
import React from 'react'
import { Box, Image, Text, Button, VStack} from 'native-base'
import color from '../color'
import Buttone from '../Components/Buttone'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const AppreciationScreen = () => {
  const navigation = useNavigation(); // Get navigation object using useNavigation hook

  const navigateToHome = () => {
    navigation.navigate('Home'); // Navigate to Home screen
  };

  return (
    <Box flex={1} bg={color.black} alignItems="center" justifyContent="center">
      <Image
        position="absolute"
        top={0}
        left={0}
        resizeMode="cover"
        size="lg"
        width="100%"
        height="100%"
        source={require('../../assets/images/bg.png')}
      />
      <Box w="full" px="6" justifyContent="center" alignItems="center" marginTop={-20}>
        <Image
          source={require('../../assets/images/logoApp.png')}
          alt="Login Image"
          h={280}
          w={280}
        />
        <View style={styles.container}>
          <Text style={styles.text}>Thank you for Shopping!</Text>
        </View>
        <Buttone 
          bg={color.main} 
          color={color.white} 
          mt={4}
          onPress={() => navigation.navigate('Home')}
          >
          Back to Shopping
        </Buttone>
      </Box>
    </Box>      
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20, // Adjust the value as needed
    height: 100 // Adjust the height to accommodate the entire text
  },
  text: {
    fontFamily: 'Arial', // Replace 'Arial' with the desired font family
    fontWeight: 'bold', // Replace 'bold' with the desired font weight
    fontSize: 20, // Adjust font size as needed
    // You can add more styles here if required
  },
});

export default AppreciationScreen;
