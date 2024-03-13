import React from "react";
import { Box,Button, Center, Image,VStack,Text, View } from "native-base";
import colors from "../color";
import Buttone from "../Components/Buttone";

function NotVerifyScreen() {
  return (
    <Box flex={1} bg={colors.main} safeAreaTop>
      <Center w="full" h={250}>
        <Image 
        source={require("../../assets/images/Style.png")}
        alt="Logo" 
        // size ="lg"
        />
      </Center>
      <VStack space={6} px={5} alignItems="center">
        <Buttone bg={colors.lightpink} color={colors.main}>REGISTER</Buttone>
        <Buttone bg={colors.lightpink} color={colors.main}>SIGN UP</Buttone>
      </VStack>
    </Box>
  );
}

export default NotVerifyScreen;
