
import React, { useState } from 'react';
import { Box, Center, FormControl, HStack, Image, Input, ScrollView, Spacer, Text, VStack } from 'native-base';
import Colors from '../color';
import Buttone from '../Components/Buttone';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';

const paymentMethods = [
  {
    id: 1,
    image: require("../../assets/images/paypal.png"),
    alt: "PayPal",
    icon: "Ionicons"
  },
  {
    id: 2,
    image: require("../../assets/images/discover.png"),
    alt: "Discover",
    icon: "fontAwesome"
  },
  {
    id: 3,
    image: require("../../assets/images/googlepay.png"),
    alt: "Google Pay",
    icon: "fontAwesome"
  },
  {
    id: 4,
    image: require("../../assets/images/cod.png"),
    alt: "Cash on Delivery",
    icon: "fontAwesome"
  },
];

function PaymentScreen() {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelection = (id) => {
    setSelectedMethod(id);
  };

  const handleContinue = () => {
    try {
      navigation.navigate("Placeorder", { selectedMethod });
    } catch (error) {
      console.error("Navigation Error:", error);
    }
  };

  return (
    <Box flex={1} safeArea bg={Colors.main} py={5}>
      <Center pb={15}>
        <Text color={Colors.white} fontSize={14} bold>
          Payment Method
        </Text>
      </Center>
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {paymentMethods.map((method) => (
              <TouchableOpacity key={method.id} onPress={() => handleMethodSelection(method.id)}>
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
                      source={method.image}
                      alt={method.alt}
                      resizeMode="contain"
                      w={60}
                      h={50}
                    />
                  </Box>
                  {selectedMethod === method.id ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={30}
                      color={Colors.main}
                    />
                  ) : (
                    <FontAwesome
                      name="circle-thin"
                      size={30}
                      color={Colors.main}
                    />
                  )}
                </HStack>
              </TouchableOpacity>
            ))}
            <Buttone bg={Colors.main} color={Colors.white} mt={5} onPress={handleContinue}>
              Continue
            </Buttone>
            
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default PaymentScreen;

    