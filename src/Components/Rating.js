import { HStack,text } from "native-base";
import React from "react";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from "../color";


function Rating({ value}) {
  const size = 13;
  const color = colors.orange;
  return (
    <HStack space={0.4} mt={1} alignItems="center">
      <FontAwesome
        name={value >= 1 ? "star" : value >= 0.5 ? "star-half-o" : "star-o"}
        color={color}
        size={size}
      />
      <FontAwesome
        name={value >= 2 ? "star" : value >= 1.5 ? "star-half-o" : "star-o"}
        color={color}
        size={size}
      />
      <FontAwesome
        name={value >= 3 ? "star" : value >= 2.5 ? "star-half-o" : "star-o"}
        color={color}
        size={size}
      />
      <FontAwesome
        name={value >= 4 ? "star" : value >= 3.5 ? "star-half-o" : "star-o"}
        color={color}
        size={size}
      />
      <FontAwesome
        name={value >= 5 ? "star" : value >= 4.5 ? "star-half-o" : "star-o"}
        color={color}
        size={size}
      />
      {text && (
        <Text fontSize={12} ml={2}>
          {text}
        </Text>
      )}
    </HStack>
  );
}

export default Rating;
