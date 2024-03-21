import React, { useState } from 'react';
import {
  Container,
  Text,
  Radio,
  Right,
  Left,
  Picker,
  Box,
  HStack,
  VStack,
  Heading,
  Divider,
  CheckCircleIcon,
  Select,
  CheckIcon,
  Center,
  View,
  Button,
  ScrollView,
  Image,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Colors from '../color';
import Buttone from '../Components/Buttone';

const methods = [
    { image: require("../../assets/images/cod.png"), value: 1 },
    { image: require("../../assets/images/gcash.png"), value: 2 },
    { image: require("../../assets/images/download.png"), value: 3 },
]

const Payment = ({ route }) => {
    const order = route.params;
    const [selected, setSelected] = useState('');
    const navigation = useNavigation();

    const handleConfirm = () => {
        // Navigate to PlaceOrder screen with both order details and payment method
        navigation.navigate('Placeorder', { ...order, selectedMethod: selected });
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
              {methods.map((item, index) => (
                <HStack
                  key={index}
                  alignItems="center"
                  bg={Colors.white}
                  px={3}
                  py={1}
                  justifyContent="space-between"
                  rounded={10}
                >
                  <Image source={item.image} alt={`Payment Method ${index}`} w={100} resizeMode="contain" h={50} />
                  <Radio.Group
                    name="myRadioGroup"
                    value={selected}
                    onChange={(value) => setSelected(value)}
                  >
                    <Radio
                      value={item.value}
                      colorScheme="pink" // Set color scheme to pink
                      style={{ float: 'right' }}
                      w={50}
                      h={50}
                    />
                  </Radio.Group>
                </HStack>
              ))}
            </VStack>
          </ScrollView>
          <Buttone bg={Colors.main} color={Colors.white} mt={5} onPress={handleConfirm}>
            Continue
          </Buttone>
        </Box>
      </Box>
    );
};

export default Payment;
