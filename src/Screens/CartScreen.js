import { Box, Text, Center} from 'native-base'
import colors from '../color'
import React from 'react'
import CartEmpty from '../Components/CartEmpty'

function CartScreen() {
  return (
    <Box flex={1} safeAreaTop bg={colors.lightpink}>
    {/* Header */}
    <Center w="full" py={5}>
     <Text color={colors.black} fontSize={20} bold>CART</Text>
    </Center>
    {/* Empty Cart */}
    <CartEmpty/>
   </Box>
  )
}

export default CartScreen