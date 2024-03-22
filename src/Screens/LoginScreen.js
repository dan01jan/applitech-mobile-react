import React, { useState, useContext, useEffect } from "react";
import { Box, Image, Input, Text, Button, VStack } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from "../color";
import AuthGlobal from '../../Context/Store/AuthGlobal';
import { loginUser } from '../../Context/Actions/Auth.actions';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function LoginScreen() {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      if (context.stateUser.user.isAdmin) {
        navigation.navigate("Dashboard");
      } else {
        navigation.navigate("Main");
      }
    }
  }, [context.stateUser.isAuthenticated, context.stateUser.user.isAdmin, navigation]);

  const handleSubmit = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
  
    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
  
    // All validations passed, proceed with login
    const user = {
      email,
      password,
    };
  
    try {
      await loginUser(user, context.dispatch, navigation);
      // Show Toast upon successful login
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (error) {
      console.error("Login Error:", error);
      setError("An error occurred. Please try again later.");
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
          onPress={handleSubmit}
        >
          LOGIN
        </Button>

        <Text
          mt={-4}
          color={color.deepPink}
          fontWeight="bold"
          onPress={() => navigation.navigate('Register')}
        >
          Don't have an account? Sign Up
        </Text>
      </Box>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Box>
  );
}

export default LoginScreen;
