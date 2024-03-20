import React from "react";
import { Box, Text, Center, ScrollView, HStack, Button } from "native-base";
import colors from "../color";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../Redux/Actions/cartActions"; // Assuming you have these action creators
import CartItems from "../Components/CartItems";
import Buttone from "../Components/Buttone";
import { useNavigation } from "@react-navigation/native";

function CartScreen() {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  // Calculate total by considering quantity and price of each item
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleCheckout = () => {
    // Dispatch action for checkout
    // You can handle the checkout logic here
  };

  return (
    <Box flex={1} safeAreaTop bg={colors.lightpink} position="relative">
      <Center w="full" py={5}>
        <Text color={colors.black} fontSize={20} bold>
          CART
        </Text>
      </Center>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 60 }}
      >
        <CartItems cartItems={cartItems} />

        <Center mt={5} marginBottom={5}>
          <HStack
            rounded={50}
            justifyContent="space-between"
            bg={colors.white}
            shadow={2}
            w="90%"
            pl={5}
            h={45}
            alignItems="center"
          >
            <Text>Total</Text>
            <Button
              px={10}
              h={45}
              rounded={50}
              bg={colors.main}
              _text={{
                color: colors.white,
                fontWeight: "semibold",
              }}
              _pressed={{
                bg: colors.main,
              }}
            >
              <Center flex={1}>
                <Text color={colors.white} textAlign="center">
                  {" "}
                  {/* Center-align the text */}
                  {total.toFixed(2)}
                </Text>
              </Center>
            </Button>
          </HStack>
        </Center>
      </ScrollView>

      <Center
        px={5}
        position="justify"
        bottom={0}
        left={0}
        right={0}
        zIndex={1}
      >
        <Buttone
          bg={colors.main}
          color={colors.white}
          mt={10}
          onPress={() => navigation.navigate("Shipping")}
        >
          CHECKOUT
        </Buttone>
      </Center>
    </Box>
  );
}

export default CartScreen;
