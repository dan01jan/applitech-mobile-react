import React from "react";
import { HStack, Text, Input, Box } from "native-base";
import colors from "../color";
import { Pressable } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

function HomeSearch() {
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
        placeholder="Cellphone,Laptop,Computer ...."
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
      <Pressable ml={3}>
        <FontAwesome5
          name="shopping-basket"
          size={24}
          color={colors.white}
        ></FontAwesome5>
        <Box
          px={1}
          rounded="full"
          position="absolute"
          top={-13}
          left={2}
          bg={colors.red}
          _text={{
            color: colors.white,
            fontSize: "11px",
          }}
        >
          5
        </Box>
      </Pressable>
    </HStack>
  );
}

export default HomeSearch;
