import React, { useState } from "react";
import {
  Box,
  Image,
  Input,
  View,
  Text,
  Button,
  VStack,
  ScrollView,
  Heading,
  HStack,
  NumberInput,
} from "native-base";
import colors from "../color";
import Rating from "../Components/Rating";
import NumericInput from "react-native-numeric-input";
import { Ionicons } from "@expo/vector-icons";
function SingleProductScreen() {
  const[value, setValue] = useState(0);

  return (
    <Box safeArea flex={1} bg={colors.white}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../assets/images/1.png")}
          alt="Image"
          w="full"
          h={300}
          resizeMode="contain"
        />
        <Heading bold fontSize={15} mb={2} lineHeight={22}>
          Blue Blouse
        </Heading>
        <Rating value={4} />
        {/* <HStack value={2} alignItems="center" my={5}>
          <NumericInput
            value={value}
            totalWidth={140}
            totalHeight={30}
            iconSize={25}
            step={1}
            maxValue={15}
            minValue={0}
            borderColor={colors.lightpink}    
          />
        </HStack> */}
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
