import React, { useState } from 'react'
import { View, Button, Pressable, FlatList, TouchableOpacity, Dimensions, } from 'react-native'
import {
<<<<<<< Updated upstream
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
=======
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

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
    const [card, setCard] = useState('');
    console.log(order)
    const navigation = useNavigation()
    return (
        <Center  >
            <Heading>
                <Text>Choose your payment method</Text>
            </Heading>

            <HStack bg="red.200" width="100%"  >
                <Radio.Group
                    name="myRadioGroup"
                    value={selected}
                    onChange={(value) => {
                        setSelected(value);
                    }}

                >
                    {console.log(selected)}
                    {methods.map((item, index) => {
                        return (
                            <Radio
                                key={index}
                                value={item.value} my="1"
                                colorScheme="green"
                                size="22"
                                style={{ float: 'right' }}
                                icon={<CheckCircleIcon size="22" mt="0.5" color="emerald.500" />}

                            >
                                {item.name}
                            </Radio>
                        )
                    })
                    }
                </Radio.Group>
            </HStack>
            {selected === 3 ? (
                <Box>
                    <Select
                        minWidth="100%"
                        placeholder="Choose Service"
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}
                    >
                        {console.log(card)}
                        {paymentCards.map((c, index) => {
                            return (
                                <Select.Item
                                    key={c.name}
                                    label={c.name}
                                    value={c.name} />
                            )
                        })}

                    </Select>
                </Box>
            ) : null}
            <View style={{ marginTop: 60, alignSelf: 'center' }}>
                <Button
                    title={"Confirm"}
                    onPress={() => navigation.navigate("PlaceOrder", { order: order })} />
            </View>
        </Center>
    )
}
export default Payment;
>>>>>>> Stashed changes
