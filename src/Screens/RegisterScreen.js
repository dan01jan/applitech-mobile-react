import { Box, Image, Input, Heading, Text, Button, VStack } from "native-base";
import React from "react";
import colors from "../color";
import { MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";

function RegisterScreen({ navigation }) {
  return (
    <Box flex={1} bg={colors.black} alignItems="center" justifyContent="center">
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
        alignItems="center" // Center children horizontally
        justifyContent="center" // Center children vertically
      >
        {/* Heading */}
        <Heading>SIGN UP</Heading>

        {/* Form */}
        <VStack space={2} pt="6" alignItems="center" width="70%">
          {/* Username */}
          <Input
            InputLeftElement={
              <FontAwesome name="user" size={20} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your name"
            w="100%" // Full width
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
            fontSize={13}
          />
          {/* Email */}
          <Input
            InputLeftElement={
              <MaterialIcons name="phone" size={20} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your email"
            w="100%" // Full width
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
            fontSize={13}
          />
           <Input
            InputLeftElement={
              <MaterialIcons name="email" size={20} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your number"
            w="100%" // Full width
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
            fontSize={13}
          />
          {/* Password */}
          <Input
            InputLeftElement={
              <Entypo name="lock" size={24} color={colors.main} />
            }
            variant="underlined"
            placeholder="Input your password"
            w="100%" // Full width
            type="password"
            pl={2}
            color={colors.main}
            borderBottomColor={colors.underline}
            fontSize={13}
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
        >
          SIGN UP
        </Button>
        
        {/* Text */}
        <Pressable 
          onPress={() => navigation.navigate("Login")}
        >
          <Text 
            mt={-4} 
            color={colors.salmon}
            fontWeight="bold"
          >
            Already have an account? Log in
          </Text>
        </Pressable>
      </Box>
    </Box>
  )
}

export default RegisterScreen;
