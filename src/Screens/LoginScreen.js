import { Box, Image, Input, Heading, Text, Button, VStack } from "native-base";
import React from "react";
import { MaterialIcons,Ionicons  } from "@expo/vector-icons";
import color from "../color";
import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
function LoginScreen() {
  return (
    <Box flex={1} bg={color.black}>
      <Image
        flex={1}
        alt="logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../../assets/images/bg.png")}
      />
      <Box
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center"
      >
        {/* <Text fontSize="2xl" color={colors.white} fontWeight="bold">
          LOGIN
        </Text> */}
        <Heading>LOGIN</Heading>
        <VStack space={2} pt="6">
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
          />
        </VStack>
      
        <Button 
         _pressed={{
          bg: color.main
         }}
        my={30}
         w="40%" 
         rounded={50}
          bg={color.main}>
        
          LOGIN
        </Button>
        <Pressable mt={4}>
          <Text color={color.deepestGray}>SIGN UP</Text> 

        </Pressable>
      </Box>
    </Box>
  );
}

export default LoginScreen;
