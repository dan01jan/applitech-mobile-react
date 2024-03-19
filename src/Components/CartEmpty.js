import { View, Text } from 'react-native'
import React from 'react'
import { Box, Center } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../color'
import Buttone from './Buttone'

export default function CartEmpty() {
  return (
    <Box flex={1} px={4} marginTop={10}>
        <Center h='90%'>
            <Center w={200} h={200} bg={Colors.white} rounded="full">
                <FontAwesome  name="shopping-basket" size={64} color={Colors.main}/>
            </Center>
            <Text color={Colors.main} bold mt={5}>
                Cart is Empty
            </Text>
        </Center>
        {/* <Buttone bg={Colors.black} color={Colors.white}>
            Start Shopping
        </Buttone> */}
    </Box>
  )
}