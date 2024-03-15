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
  Spacer
} from "native-base";
import colors from "../color";
import Rating from "../Components/Rating";
import Buttone from "../Components/Buttone";
import Review from "../Components/Review";
import { useNavigation } from '@react-navigation/native'

function SingleProductScreen({route}) {
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation()
  const product = route.params

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box safeArea flex={1} bg={colors.white}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.image }} 
          alt="Image"
          w="full"
          h={300}
          resizeMode="contain"
        />
        <Heading bold fontSize={15} mb={2} lineHeight={22}>
          {product.name}
        </Heading>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <HStack alignItems="center" my={5}>
          <Button size="sm" colorScheme="pink" onPress={decrement}>-</Button>
          <View
            borderColor="gray.200"
            px={2}
            py={1}
            width={20} // Adjust the width as needed
          >
            <Input
              value={quantity.toString()}
              fontSize="sm"
              textAlign="center"
            />
          </View>
          <Button size="sm" colorScheme="pink" onPress={increment}>+</Button>
          <Spacer />
         
          <Spacer />
          <Heading bold color={colors.black} fontSize={19}>
            500
          </Heading>
        </HStack>
        <Text lineHeight={24} fontSize={12}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <Buttone bg={colors.main} color={colors.white} mt={10}>
          ADD TO CART
        </Buttone>
        <Review/>
       
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
