import React, { useState } from "react";
import { Box, Image, Input, Heading, Text, Button, VStack, View } from "native-base";
import colors from "../color";
import { MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import baseURL from "../../assets/common/baseurl";
import axios from "axios";
import SignUp from '../../assets/images/Signup.png';
import Toast from 'react-native-toast-message';

function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${baseURL}users/register`, formData, config);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Registration Succeeded',
          text2: 'Please Login into your account',
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000); // Add a delay of 2000 milliseconds (2 seconds)
      }
    } catch (error) {
      console.error("Error registering:", error);
      // Handle error
    }
  };
  
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  return (
    <Box flex={1} bg={colors.black} alignItems="center" justifyContent="center">
      <Image
        flex={1}
        alt="logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../../assets/images/bg2.png")}
      />
      <Box
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        alignItems="center"
        justifyContent="center"
      >
        <View style={styles.headerImageContainer}>
          <Image source={SignUp} style={[styles.headerImage, { width: 200, height: 70 }]} />
        </View>

        <VStack space={2} pt="6" alignItems="center" width="70%">
          <Input
            InputLeftElement={
              <FontAwesome name="user" size={20} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your name"
            w="100%"
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
            fontSize={13}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={20} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your email"
            w="100%"
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
            fontSize={13}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          <Input
            InputLeftElement={
              <MaterialIcons name="phone" size={20} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your number"
            w="100%"
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
            fontSize={13}
            onChangeText={(value) => handleInputChange("phone", value)}
          />
          <Input
            InputLeftElement={
              <Entypo name="lock" size={24} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your password"
            w="100%"
            type="password"
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
            fontSize={13}
            onChangeText={(value) => handleInputChange("password", value)}
          />
        </VStack>
      
        <Button 
          _pressed={{
            bg: colors.main
          }}
          my={30}
          w="60%" 
          rounded={50}
          bg={colors.main}
          onPress={handleRegister}
        >
          SIGN UP
        </Button>
        
        <Pressable 
          onPress={() => navigation.navigate("Login")}
        >
          <Text 
            mt={-4} 
            color={colors.Pinklight}
            fontWeight="bold"
          >
            Already have an account? Log in
          </Text>
        </Pressable>
      </Box>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Box>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default RegisterScreen;
