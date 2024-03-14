import { Box, Center, FormControl, HStack, Image, Input, ScrollView, Spacer, Text, VStack } from 'native-base'
import React from 'react'
import Colors from '../color'
import Buttone from '../Components/Buttone'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const paymentMethods = [
  {
    image: require("../../assets/images/paypal.png"),
    alt: "text",
    icon: "Ionicons"
  },
  {
    image: require("../../assets/images/discover.png"),
    alt: "discover",
    icon: "fontAwesome"
  },
  {
    image: require("../../assets/images/googlepay.png"),
    alt: "googlepay",
    icon: "fontAwesome"
  },
]

function PaymentScreen() {
  return (
    <Box flex={1} safeArea bg={Colors.main} py={5}>
      <Center pb={15}>
        <Text color={Colors.white} fontsize={14} bold>
          Payment Method
        </Text>
      </Center>
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <VStack space={6} mt={5}>
            {paymentMethods.map((i, index) => (
              <HStack
                alignItems='center'
                bg={Colors.white}
                px={3}
                py={1}
                justifyContent="space-between"
                rounded={10}
              >

                <Box>
                  <Image
                    source={i.image}
                    alt={i.alt}
                    resizeMode="contain"
                    w={60}
                    h={50}
                  />
                </Box>
                {i.icon === "Ionicons" ? (<Ionicons
                  name="checkmark-circle"
                  size={30}
                  color={Colors.main}
                />) : (<FontAwesome
                  name="circle-thin"
                  size={30}
                  color={Colors.main}
                />)
                }
              </HStack>
            ))}
            <Buttone bg={Colors.main} color={Colors.white} mt={5}>
              Continue
            </Buttone>
            <Text italic textAlign="Center">
              Payment method is <Text bold>Paypal</Text> by default
            </Text>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  )
}

export default PaymentScreen;
