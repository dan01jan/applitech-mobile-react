import { Box, Image, Input, Text, Button, VStack } from "native-base";
import React, { useState } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from "../color";
import { Pressable } from "react-native";
import { loginUser } from '../../Context/Actions/Auth.actions'; // Importing login action from old code

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
    
      const user = {
        email,
        password,
      };
      try {
        loginUser(user);
        navigation.navigate("Main"); 
      } catch (error) {
        setError("Invalid email or password");
      }
    }
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
        source={require("../../assets/images/bg.png")}
      />
      <Box
        w="full"
        px="6"
        justifyContent="center"
        alignItems="center" // Center children horizontally
      >
        <Image
          source={require("../../assets/images/logoApp.png")} // Your login image
          alt="Login Image" // Alt text for accessibility
          h={300} // Height of the image
          w={300} // Width of the image
        />

        <VStack space={2} pt="6" alignItems="center">
          {/* Email */}
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={20} color={color.main} />
            }
            variant="underlined"
            placeholder="Input your email"
            w="70%"
            pl={2}
            color={color.main}
            borderBottomColor={color.underline}
            fontSize={13} // Adjust the font size as needed
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <Input
            InputLeftElement={
              <Entypo name="lock" size={24} color={color.main} />
            }
            variant="underlined"
            placeholder="Input your password"
            w="70%"
            type="password"
            pl={2}
            color={color.main}
            borderBottomColor={color.underline}
            fontSize={13} // Adjust the font size as needed
            value={password}
            onChangeText={setPassword}
          />
        </VStack>

        {error ? <Text color="red.500">{error}</Text> : null}

        <Button
          _pressed={{
            bg: color.main,
          }}
          my={30}
          w="60%"
          rounded={50}
          bg={color.main}
          onPress={handleSubmit}
        >
          LOGIN
        </Button>

        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text mt={-4} color={color.deepPink} fontWeight="bold">
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
}

export default LoginScreen;
