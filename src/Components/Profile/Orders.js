import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Box, Button, HStack, ScrollView } from 'native-base'
import Colors from '../../color'
import Buttone from '../Buttone'


const Orders = () => {
  return (
   <Box h="full" bg = {Colors.white} pt = {5}>
    <ScrollView showsVerticalScrollIndicator = {false}>
       {/* Paid Order */}
        <Pressable>
            
            <HStack
                space = {4}
                justifyContent="space-between"
                alignItems="center"
                bg = {Colors.lightpink}
                py = {5}
                px = {2}
            >
                <Text fontsize= {9} color = {Colors.lightpink} isTruncated>
                   00099009
                </Text>
                <Text fontsize= {12} color = {Colors.lightpink} isTruncated>
                    Paid
                </Text>
                <Text fontsize= {12} color = {Colors.lightpink} isTruncated>
                    3-14-24
                </Text>
                <Button
                px = {7}
                py = {1.5} 
                rounded = {50} 
                bg = {Colors.main}
                _text = {{
                    color:Colors.white
                }}
                _pressed = {{
                    bg:Colors.main
                }}
                >
                ₱314  

                </Button>               
            </HStack>
        </Pressable>
        {/* Not Paid */}
        <Pressable>
            
            <HStack
                space = {4}
                justifyContent="space-between"
                alignItems="center"
                // bg = {Colors.lightpink}
                py = {5}
                px = {2}
            >
                <Text fontsize= {9} color = {Colors.lightpink} isTruncated>
                   000990092
                </Text>
                <Text fontsize= {12} color = {Colors.lightpink} isTruncated>
                    Not Paid
                </Text>
                <Text fontsize= {12} color = {Colors.lightpink} isTruncated>
                    3-13-24
                </Text>
                <Button
                px = {7}
                py = {1.5} 
                rounded = {50} 
                bg = {Colors.salmon}
                _text = {{
                    color:Colors.white
                }}
                _pressed = {{
                    bg:Colors.main
                }}
                >
                ₱314  

                </Button>               
            </HStack>
        </Pressable>
    </ScrollView>
   </Box>
  )
}

export default Orders