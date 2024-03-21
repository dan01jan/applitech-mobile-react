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
  Button

} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Bank Transfer', value: 2 },
    { name: 'Card Payment', value: 3 }
]

const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3 },
    { name: 'Other', value: 4 }
]

const Payment = ({ route }) => {
    const order = route.params;
    const [selected, setSelected] = useState('');
    const [card, setCard] = useState('');
    const navigation = useNavigation();

    const handleConfirm = () => {
        // Navigate to PlaceOrder screen with both order details and payment method
        navigation.navigate('Placeorder', { ...order, selectedMethod: selected });
    };

    return (
        <View>
            <Heading>
                <Text>Choose your payment method</Text>
            </Heading>
            <Radio.Group
                name="myRadioGroup"
                value={selected}
                onChange={(value) => setSelected(value)}
            >
                {methods.map((item, index) => (
                    <Radio
                        key={index}
                        value={item.value}
                        my="1"
                        colorScheme="green"
                        size="22"
                        style={{ float: 'right' }}
                        icon={<CheckCircleIcon size="22" mt="0.5" color="emerald.500" />}
                    >
                        {item.name}
                    </Radio>
                ))}
            </Radio.Group>
            {selected === 3 && (
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
                    {paymentCards.map((c, index) => (
                        <Select.Item
                            key={c.name}
                            label={c.name}
                            value={c.name}
                        />
                    ))}
                </Select>
            )}
            <View style={{ marginTop: 60, alignSelf: 'center' }}>
                <Button
                    title={"Confirm"}
                    onPress={handleConfirm}
                />
            </View>
        </View>
    );
};

export default Payment;
