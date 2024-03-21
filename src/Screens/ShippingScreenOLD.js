import React, { useEffect, useState, useContext } from 'react';
import { Box, Center, FormControl, Input, ScrollView, Text, VStack } from 'native-base';
import Colors from '../color';
import Buttone from '../Components/Buttone';
import { useNavigation } from "@react-navigation/native";
// import SelectDropdown from 'react-native-select-dropdown';
import { Select, Item, Picker, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import AuthGlobal from "../../../Context/Store/AuthGlobal";
import AuthGlobalContext from '../../Context/Store/AuthGlobal';

// const countries = require("../../../assets/data/countries.json");

const ShippingInputs = [
  {
    label: "ENTER PHONE NUMBER",
    type: "text"
  },
  {
    label: "ENTER ADDRESS",
    type: "text"
  },
  {
    label: "ENTER ADDRESS 2",
    type: "text"
  },
  {
    label: "CITY",
    type: "text"
  },
  {
    label: "ZIPCODE",
    type: "text"
  },
  {
    label: "COUNTRY",
    type: "text"
  }
];

function ShippingScreen() {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('Philippines');
  const context = useContext(AuthGlobalContext);

  useEffect(() => {
    // if (!context.stateUser.isAuthenticated) {
    //   navigation.navigate("User",{ screen: 'Login' });
    //   Toast.show({
    //     topOffset: 60,
    //     type: "error",
    //     text1: "Please Login to Checkout",
    //     text2: ""
    //   });
    // }
  }, []);

  const checkOut = () => {
    const order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems: [],
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      user: context.stateUser.user.userId,
      zip,
    };
    navigation.navigate("Payment", { order });
  };

  return (
    <Box flex={1} safeArea bg={Colors.main} py={5}>
      <Center pb={15}>
        <Text color={Colors.white} fontSize={14} bold>
          Delivery Address
        </Text>
      </Center>
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {ShippingInputs.map((i, index) => (
              <FormControl key={index}>
                <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  {i.label}
                </FormControl.Label>
                <Input 
                  borderWidth={.2} 
                  borderColor={Colors.main} 
                  bg={Colors.lightpink} 
                  py={4}
                  type={i.type}
                  color={Colors.main}
                  _focus={{
                    bg: Colors.lightpink,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                />
              </FormControl>
            ))}
            <Buttone 
              bg={Colors.main} 
              color={Colors.white} 
              mt={5}
              onPress={() => checkOut()}
            >
              Continue
            </Buttone>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default ShippingScreen;
