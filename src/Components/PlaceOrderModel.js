import React, { useState } from 'react';
import { Center, Modal, VStack, HStack, Text, Button } from 'native-base';
import Buttone from './Buttone';
import colors from '../color';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; // Import useSelector hook from react-redux

export default function PlaceOrderModel() {
  const [showModel, setShowModel] = useState(false);
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cartItems); // Access cartItems from Redux store

  // Calculate total price of products
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  // Update Total price in OrdersInfos
  const OrdersInfos = [
    {
      title: 'Products',
      price: total,
      color: 'black',
    },
    {
      title: 'Shipping',
      price: 150.00,
      color: 'black',
    },
    {
      title: 'Tax',
      price: 50.00,
      color: 'black',
    },
    {
      title: 'Total',
      price: 0, // Initialize to 0, as it will be calculated below
      color: 'black',
    },
  ];

  // Calculate total price including shipping and tax
  const shippingPrice = 150; // Example shipping price
  const taxPrice = 50; // Example tax price
  const totalPrice = total + shippingPrice + taxPrice;

  // Update Total price in OrdersInfos
  OrdersInfos[3].price = totalPrice;

  return (
    <Center>
      <Buttone onPress={() => setShowModel(true)} bg={colors.main} color={colors.black} mt={5}>
        SHOW TOTAL
      </Buttone>
      <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
        <Modal.Content maxWidth={350}>
          <Modal.CloseButton />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack space={7}>
              {OrdersInfos.map((i, index) => (
                <HStack key={index} alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">{i.title}</Text>
                  <Text color={i.color === 'main' ? colors.main : colors.black} bold>
                    ${i.price}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex={1}
              bg={colors.main}
              h={45}
              _text={{
                color: colors.black,
              }}
              onPress={() => {
                navigation.navigate('Order');
                setShowModel(false);
              }}
              _pressed={{
                bg: colors.main,
              }}>
              PLACE ORDER
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
0