import { Box, Text, Center, ScrollView, HStack, Button} from 'native-base'
import colors from '../color'
import React from 'react'
import CartEmpty from '../Components/CartEmpty'
import CartItems from '../Components/CartItems'
import Colors from '../color'
import Buttone from '../Components/Buttone'

function CartScreen() {
  return (
    <Box flex={1} safeAreaTop bg={colors.lightpink}>
    {/* Header */}
    <Center w="full" py={5}>
     <Text color={colors.black} fontSize={20} bold>CART</Text>
    </Center>
    {/* Empty Cart */}
    {/* <CartEmpty/> */}
    
    {/* Cart Items */}
    <ScrollView showsVerticalScrollIndicator={false}>
      <CartItems/>
      {/* Total */}
      <Center mt={5}>
        <HStack rounded={50} 
        justifyContent="space-between"
        bg={Colors.white} shadow={2} w='90%' pl={5} h={45} alignItems="center">
        <Text>Total</Text>
        <Button px={10} h={45} rounded={50} bg={Colors.main} _text={{
          color: Colors.white,
          fontWeight: "semibold"
        }}
        _pressed={{
          bg:Colors.main,

        }}>200</Button>
        </HStack>
      </Center>
      {/* Checkout */}
      <Center px={5}>
        <Buttone bg={Colors.black} color={Colors.white} mt={10}>
          CHECKOUT
        </Buttone>
      </Center>
    </ScrollView>
   </Box>
  )
}

export default CartScreen