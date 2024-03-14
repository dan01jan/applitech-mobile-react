import { Box, Text } from 'native-base'
import colors from '../color'
import React from 'react'

function CartScreen() {
  return (
    <Box flex={1} safeAreaTop bg={colors.lightpink}>
    {/* Header */}
    <Center w="full" py={5}>
     <Text color={colors.black} fontSize={20} bold>CART</Text>
    </Center>
    {/* Empty Cart */}
   </Box>
  )
}

export default CartScreen