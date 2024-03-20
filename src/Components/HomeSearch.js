import React from "react";
import { HStack, Text, Input, Box } from "native-base";
import colors from "../color";
import { Pressable } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { useSelector } from 'react-redux'; // Import useSelector to get cartItems

function HomeSearch() {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
  const cartItems = useSelector(state => state.cartItems); // Get cartItems from Redux store

  return (
    <HStack
      space={3}
      w="full"
      px={6}
      bg={colors.main}
      py={4}
      alignItems="center"
      safeAreaTop
    >
      <Input
        placeholder="Cellphone, Laptop, Computer ...."
        w="85%"
        bg={colors.white}
        type="search"
        variant="filled"
        h={12}
        borderWidth={0}
        _focus={{
            bg:colors.white
        }}
      ></Input>
      <Pressable ml={3} onPress={() => navigation.navigate("Cart")}>
        <FontAwesome5
          name="shopping-basket"
          size={24}
          color={colors.white}
        ></FontAwesome5>
       <Box
          px={1}
          py={0.5}
          rounded="full"
          position="absolute"
          top={-15}
          left={5}
          bg={colors.red}
          height={21} // Add height
          _text={{
            color: colors.white,
            fontSize: "11px",
          }}
        >
          {cartItems.length}
        </Box>
      </Pressable>
    </HStack>
  );
}

export default HomeSearch;
