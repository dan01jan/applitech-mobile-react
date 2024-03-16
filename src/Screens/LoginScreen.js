import { Box, Image, Input, Heading, Text, Button, VStack } from "native-base";
import React from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import color from "../color";
import { Pressable } from "react-native";

function LoginScreen({ navigation }) {
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

        {/* Google Login Button */}
        <Pressable 
          onPress={() => console.log("Login with Google")} // Handle Google login action
        >
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between" // Align items to the start and end of the box
            mt={10} 
            w="60%" 
            rounded={50}
            bg="white"
            py={3} // Adjust padding as needed
            px={4} // Adjust padding as needed
          >
            <Image 
              source={require("../../assets/images/google-icon.png")} // Your Google icon image
              alt="Google Icon" // Alt text for accessibility
              size={4} // Size of the image
            />
            <Text 
              color={color.main} 
              fontWeight="bold" 
              ml={2} // Adjust margin as needed
             
            >
              Log in with Google
            </Text>
          </Box>
        </Pressable>
        
        {/* "OR" Text */}
        <Text 
          mt={4} // Adjust margin as needed
          color={color.white}
          fontWeight="bold"
        >
          OR
        </Text>
        
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
          />

          {/* Password */}
          <Input
            InputLeftElement={<Entypo name="lock" size={24} color={color.main} />}
            variant="underlined"
            placeholder="Input your password"
            w="70%"
            type="password"
            pl={2}
            color={color.main}
            borderBottomColor={color.underline}
            fontSize={13} // Adjust the font size as needed
          />
        </VStack>
      
        <Button 
          _pressed={{
            bg: color.main
          }}
          my={30}
          w="60%" 
          rounded={50}
          bg={color.main}
          onPress={() => navigation.navigate("Main")}
        >
          LOGIN
        </Button>
        
        <Pressable 
          onPress={() => navigation.navigate("Register")}
        >
          <Text 
            mt={-4} 
            color={color.salmon}
            fontWeight="bold"
          >
            Don't have an account? Sign Up
          </Text>
        </Pressable>
     
      </Box>
    </Box>
  );
}

export default LoginScreen;
