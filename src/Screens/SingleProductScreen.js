import React, { useState, useEffect } from "react";
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
  Spacer,
  Center
} from "native-base";
import colors from "../color";
import Rating from "../Components/Rating";
import Buttone from "../Components/Buttone";
import Review from "../Components/Review";
import Carousel, { Pagination } from 'react-native-snap-carousel'; 
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/cartActions';

function SingleProductScreen({ route }) {
  const navigation = useNavigation();
  const product = route.params;
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (product.countInStock === 0) {
      setAvailabilityText("Unavailable");
    } else if (product.countInStock <= 5) {
      setAvailabilityText("Limited Stock");
    } else {
      setAvailabilityText("Available");
    }
  }, [product.countInStock]);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", { ...product, quantity });
    dispatch(addToCart({ ...product, quantity }));
  };

  const renderCarouselItem = ({ item }) => {
    return (
      <Image
        source={{ uri: item }}
        alt={product.name}
        w="100%"
        h={200}
        resizeMode="cover"
      />
    );
  };

  return (
    
    <Box safeArea flex={1} bg={colors.white}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
      <Center>
    <Carousel
      data={product.images}
      renderItem={renderCarouselItem}
      sliderWidth={320}
      itemWidth={320}
      layout="default"
      loop={true}
    />
    <Pagination
      dotsLength={product.images.length}
      activeDotIndex={0}
      containerStyle={{ marginTop: -20 }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  </Center>
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
            width={20}
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
           ₱{product.price}
          </Heading>
        </HStack>
        
        <Text>
          <Text bold>Availability: </Text>{availabilityText} {product.countInStock > 0 && `(Stock: ${product.countInStock})`}</Text>
        <Text lineHeight={24} fontSize={12}>
          <Text bold>Description: </Text>{product.description}
        </Text>
        {product.countInStock > 0 ? (
          <Buttone bg={colors.main} color={colors.white} mt={10} onPress={handleAddToCart}>
            ADD TO CART
          </Buttone>
        ) : (
          <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
        )}
        <Review />
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
