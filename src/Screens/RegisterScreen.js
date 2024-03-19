import { Box, Image, Input, Heading, Text, Button, VStack, View } from "native-base";
import React, { useState } from "react";
import colors from "../color";
import { MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import baseURL from "../../assets/common/baseurl";
import axios from "axios";
import { Toast } from "native-base"; // Import Toast from native-base
import SignUp from '../../assets/images/Signup.png'

function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({ // State for form data
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const config = { // Configuration for axios request
    headers: {
      "Content-Type": "application/json"
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${baseURL}users/register`, formData, config);
      if (response.status === 200) {
        Toast.show({ // Toast notification for successful registration
          topOffset: 60, 
          type: "success",
          text1: "Registration Succeeded",
          text2: "Please Login into your account",
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 500);
      }
    } catch (error) {
      console.error("Error registering:", error);
      // Handle error
    }
  };

  // Function to handle input changes
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
        {/* Heading */}
        <View style={styles.headerImageContainer}>
      <Image source={SignUp} style={[styles.headerImage, { width: 200, height: 70 }]} />
        {/* <Text style={styles.headerText}>{title}</Text> */}
      </View>

        {/* Form */}
        <VStack space={2} pt="6" alignItems="center" width="70%">
          {/* Username */}
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
            onChangeText={(value) => handleInputChange("name", value)} // Handle input change
          />
          {/* Email */}
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
            onChangeText={(value) => handleInputChange("email", value)} // Handle input change
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
            onChangeText={(value) => handleInputChange("phone", value)} // Handle input change
          />
          {/* Password */}
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
            onChangeText={(value) => handleInputChange("password", value)} // Handle input change
          />
        </VStack>
      
        {/* Button */}
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
        
        {/* Text */}
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
    </Box>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8CDD5',
    padding: 10,
  },
  headerImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40, // Set the height of the image as needed
    marginRight: 10, // Add spacing between image and text
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleButton: {
    padding: 10,
  },
  placeholder: {
    width: 40, // Adjust width as needed
  },
});

export default RegisterScreen;
