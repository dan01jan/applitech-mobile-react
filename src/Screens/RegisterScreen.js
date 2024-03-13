import { Box, Image, Input, Heading, Text, Button, VStack } from "native-base";
import React from "react";
import colors from "../color";
import { MaterialIcons,Ionicons,FontAwesome  } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";

function RegisterScreen() {
  return (
    <Box flex={1} bg={colors.black}>
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
        <Heading>SIGN UP</Heading>
        <VStack space={2} pt="6">
          {/* Username */}
        <Input
            InputLeftElement={
              <FontAwesome name="user" size={20} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your username"
            w="70%"
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
          />
          {/* Email */}
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={20} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your email"
            w="70%"
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
          />

          {/* Password */}
          <Input
            InputLeftElement={
              <Entypo name="lock" size={24} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your password"
            w="70%"
            type="password"
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
          />
        </VStack>
      
        <Button 
         _pressed={{
          bg: colors.main
         }}
        my={30}
         w="40%" 
         rounded={50}
          bg={colors.main}>
        
          SIGN UP
        </Button>
        <Pressable mt={4}>
          <Text color={colors.deepestGray}>SIGN UP</Text> 

        </Pressable>
      </Box>
    </Box>
  )
}

export default RegisterScreen