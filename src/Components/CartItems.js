import React from 'react';
import { Box, Button, Center, HStack, Image, VStack, Pressable ,Text} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';  
import Colors from '../color';
import { FontAwesome } from '@expo/vector-icons';
import { removeFromCart, clearCart } from '../../Redux/Actions/cartActions';

const CartItems = () => {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();  

  const handleIncrementQuantity = () => {
    // Dispatch an action to increment the quantity of the item in the cart
    // This action should update the quantity of the item in the Redux store
    // For example, you might dispatch an action like incrementItemQuantity(data.item)
};

const handleDecrementQuantity = () => {
    // Dispatch an action to decrement the quantity of the item in the cart
    // This action should update the quantity of the item in the Redux store
    // For example, you might dispatch an action like decrementItemQuantity(data.item)
};
  const renderItems = (data) => {
    const handleDeleteItem = () => {
      console.log('Removing item:', data.item);
      dispatch(removeFromCart(data.item));  // Dispatch the removeFromCart action with the item as argument
    };

    return (
      <Pressable onPress={handleDeleteItem}>
        <Box ml={6} mb={3}>
          <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
            <Center w="25%" bg={Colors.deepGray}>
              <Image source={{ uri: data.item.image }} alt={data.item.name} w="full" h={24} resizeMode="contain" />
            </Center>
            <VStack w='60%' px={2} space={2}>
              <Text isTruncated color={Colors.black} bold fontSize={10}>
                {data.item.name}
              </Text>
              <Text bold color={Colors.lightblack}>
                Price: {data.item.price}
              </Text>
              <Text bold color={Colors.lightblack}>
                Quantity: {data.item.quantity}
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
  
  const hiddenItem = (data) => {
    const handleDeleteItem = () => {
      console.log('Removing item:', data.item);
      dispatch(removeFromCart(data.item));  // Dispatch the removeFromCart action with the item as argument
    };
  
    return (
      <Pressable onPress={handleDeleteItem}>
          <Box ml={6} mb={3}>
              <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
                  <Center w="25%" bg={Colors.deepGray}>
                      <Image source={{ uri: data.item.image}} alt={data.item.name} w="full" h={24} resizeMode="contain" />
                  </Center>
                  <VStack w='60%' px={2} space={2}>
                      <Text isTruncated color={Colors.black} bold fontSize={10}>
                          {data.item.name}
                      </Text>
                      <Text bold color={Colors.lightblack}>
                          Price: {data.item.price}
                      </Text>
                      <Text bold color={Colors.lightblack}>
                          Quantity: {data.item.quantity}
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
    <Box mr={6}>
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
      <Button onPress={handleClearCart}>Clear Cart</Button>
    </Box>
  );
}

export default CartItems;
