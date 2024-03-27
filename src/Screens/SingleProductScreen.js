import React, { useState, useEffect } from "react";
import { ScrollView, Center, Image, Input, View, Text, Button, HStack, Spacer, Heading, Box } from "native-base";
import colors from "../color";
import Rating from "../Components/Rating";
import Buttone from "../Components/Buttone";
import Review from "../Components/Review";
import Carousel, { Pagination } from 'react-native-snap-carousel'; 
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message';

function SingleProductScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = route.params;
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
    dispatch(addToCart({ ...product, quantity }));

    // Show toast message
    Toast.show({
      type: 'success',
      text1: 'Product added to cart!',
      text2: 'Product added to cart!'
    });
  };

  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const sumRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
    return sumRatings / reviews.length;
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
        <Rating value={calculateAvgRating(product.reviews)} text={`${product.numReviews} reviews`} />
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
          <Text bold>Availability: </Text><Text>{availabilityText} {product.countInStock > 0 && `(Stock: ${product.countInStock})`}</Text>
        </Text>
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
        {/* Pass the product ID to the Review component */}
        <Review productId={product._id} />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
