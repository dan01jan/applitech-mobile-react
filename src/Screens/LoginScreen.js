import { Box, Image, Input, Text, Button, VStack } from "native-base";
import React, { useState, useContext, useEffect } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from "../color";
import AuthGlobal from '../../Context/Store/AuthGlobal'
import { Pressable } from "react-native";
import { loginUser } from '../../Context/Actions/Auth.actions'; // Importing login action from old code
import { useNavigation } from '@react-navigation/native';

function LoginScreen({ props }) {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
        navigation.navigate("Main")
    }
}, [context.stateUser.isAuthenticated])

  const handleSubmit = async () => {
    const user = {
      email,
      password,
    };
  
    if (email === "" || password === "") {
      setError("Please fill in your credentials");
      return; // Exit the function early if credentials are empty
    }
  
    try {
      await loginUser(user, context.dispatch, navigation);
      console.log("Login successful");
    } catch (error) {
      console.error("Login Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };
  
  // AsyncStorage code from the old code
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log({ [store[i][0]]: store[i][1] });
        return true;
      });
    });
  });

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
      <Box w="full" px="6" justifyContent="center" alignItems="center">
        <Image
          source={require('../../assets/images/logoApp.png')}
          alt="Login Image"
          h={300}
          w={300}
        />

        <VStack space={2} pt="6" alignItems="center">
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
            fontSize={13}
            value={email}
            onChangeText={setEmail}
          />

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
            fontSize={13}
            value={password}
            onChangeText={setPassword}
          />
        </VStack>

        {error && <Text color="red.500">{error}</Text>}

        <Button
          _pressed={{
            bg: color.main,
          }}
          my={30}
          w="60%"
          rounded={50}
          bg={color.main}
          onPress={handleSubmit} // Call handleSubmit when button is pressed
        >
          LOGIN
        </Button>

        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text mt={-4} color={color.deepPink} fontWeight="bold">
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
}

export default LoginScreen;
