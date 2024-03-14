import { Box, Center, Text } from 'native-base'
import React from 'react'
import Colors from '../color'

function ShippingScreen() {
  return (
   <Box flex = {1} safeArea bg ={Colors.main} py = {5}>
      <Center pb = {15}>
        <Text color = {Colors.white} fontsize = {14} bold>
          Delivery Address
        </Text>
      </Center>
   </Box>
  )
}

export default ShippingScreen