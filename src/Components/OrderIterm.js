import React, { useEffect, useState } from 'react';
import { Box, Pressable, Text, VStack, HStack, Center, Image } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';  
import Colors from '../color';
import { FontAwesome } from '@expo/vector-icons';
import { removeFromCart, clearCart } from '../../Redux/Actions/cartActions';
import Buttone from '../Components/Buttone'; // Import the Button component
import axios from 'axios'; // Import axios for making HTTP requests

const OrderItems = () => {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productDetails = await Promise.all(cartItems.map(async (item) => {
          const response = await axios.get(`${baseURL}/products/${item.product}`);
          return response.data;
        }));
        setProducts(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const handleDeleteItem = (item) => {
    console.log('Removing item:', item);
    dispatch(removeFromCart(item));  
  };

  const renderItems = ({ item, index }) => {
    return (
      <Pressable onPress={() => handleDeleteItem(item)}>
        <Box  mb={3}>
          <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
            <Center w="25%" bg={Colors.deepGray}>
              <Image source={{ uri: products[index].images[0] }} alt={products[index].name} w="full" h={24} resizeMode="contain" />
            </Center>
            <VStack w='80%' px={2} space={2} >
              <Text isTruncated color={Colors.black} bold fontSize={10}>
                {products[index].name}
              </Text>
              <Text bold color={Colors.lightblack}>
                Price: ₱{item.price}
              </Text>
              <Text bold color={Colors.lightblack}>
                Quantity: {item.quantity}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart()); 
  };
  
  const hiddenItem = ({ item, index }) => {
    const handleDeleteItem = () => {
      console.log('Removing item:', item);
      dispatch(removeFromCart(item));  
    };
  
    return (
      <Pressable onPress={handleDeleteItem}>
        <Box ml={6} mb={3}>
          <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
            <Center w="25%" bg={Colors.deepGray}>
              <Image source={{ uri: products[index].images[0] }} alt={products[index].name} w="full" h={24} resizeMode="contain" />
            </Center>
            <VStack w='60%' px={2} space={2}>
              <Text isTruncated color={Colors.black} bold fontSize={10}>
                {products[index].name}
              </Text>
              <Text bold color={Colors.lightblack}>
                Price: ₱{item.price}
              </Text>
              <Text bold color={Colors.lightblack}>
                Quantity: {item.quantity}
              </Text>
            </VStack>
            <Pressable onPress={handleDeleteItem} w={50} roundedTopRight={10} roundedBottomRight={10} h='88%' ml='auto' justifyContent="center" bg={Colors.red}>
              <Center alignItems='center' space={2}>
                <FontAwesome name="trash" size={30} color={Colors.white} />
              </Center>
            </Pressable>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box>
      <Center>
        <SwipeListView
          rightOpenValue={-50}
          previewRowKey="0"
          previewDuration={-40}
          previewOpenDelay={3000}
          data={cartItems}
          renderItem={renderItems}
          renderHiddenItem={hiddenItem}
          showsVerticalScrollIndicator={false}
        />
      </Center>
    </Box>
  );
}

export default OrderItems;
