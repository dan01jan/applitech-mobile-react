import React, { useEffect, useState, useContext } from 'react'
import { Text, View, Button, SafeAreaView, StyleSheet } from 'react-native'
import { Select, Item, Picker, Toast, Input, Box, Center,FormControl, ScrollView, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormContainer from '../../Shared/Form/FormContainer'
// import Input from '../../Shared/Form/Input'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import AuthGlobal from '../../Context/Store/AuthGlobal'
import countries from '../../assets/data/countries.json'
import SelectDropdown from 'react-native-select-dropdown'
import Buttone from '../Components/Buttone'
import Colors from '../color'
const Checkout = (props) => {
    const [user, setUser] = useState('')
    const [orderItems, setOrderItems] = useState([])
    const [address, setAddress] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('Philippines')
    const [phone, setPhone] = useState('')

    const navigation = useNavigation()
    const cartItems = useSelector(state => state.cartItems)
    const context = useContext(AuthGlobal);

    useEffect(() => {
        setOrderItems(cartItems)
        if(context.stateUser.isAuthenticated) {
            setUser(context.stateUser.user.userId)
        } else {
            navigation.navigate("User",{ screen: 'Login' });
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: ""
            });
        }
        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        console.log("orders", orderItems)
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            user,
            zip,
        }
        console.log("ship", order)
        navigation.navigate("Payment", { order: order })
    }
    console.log(orderItems)
    return (

    
<Box flex={1} safeArea bg={Colors.main} py={5}>
      <Center pb={15}>
        <Text style={styles.whiteText}>Delivery Address</Text>
</Center>
        <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
          <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                PHONE
                </FormControl.Label>
                <Input
                    borderWidth={.2} 
                    borderColor={Colors.main} 
                    bg={Colors.lightpink} 
                    py={4}
                    mt = {-5}
                    color={Colors.main}
                    _focus={{
                      bg: Colors.lightpink,
                      borderWidth: 1,
                      borderColor: Colors.main,
                    }}
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    
                    onChangeText={(text) => setPhone(text)}
                />
                 <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  SHIPPING ADDRESS 1
                </FormControl.Label>
                <Input
                 mt = {-5}
                 borderWidth={.2} 
                 borderColor={Colors.main} 
                 bg={Colors.lightpink} 
                 py={4}
                 color={Colors.main}
                 _focus={{
                   bg: Colors.lightpink,
                   borderWidth: 1,
                   borderColor: Colors.main,
                 }}
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                 <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  SHIPPING ADDRESS 2
                </FormControl.Label>
                <Input
                 mt = {-5}
                 borderWidth={.2} 
                 borderColor={Colors.main} 
                 bg={Colors.lightpink} 
                 py={4}
                 color={Colors.main}
                 _focus={{
                   bg: Colors.lightpink,
                   borderWidth: 1,
                   borderColor: Colors.main,
                 }}
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                 <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  CITY
                </FormControl.Label>
                <Input
                 borderWidth={.2} 
                 mt = {-5}
                 borderColor={Colors.main} 
                 bg={Colors.lightpink} 
                 py={4}
                 color={Colors.main}
                 _focus={{
                   bg: Colors.lightpink,
                   borderWidth: 1,
                   borderColor: Colors.main,
                 }}
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                 <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                ZIP CODE
                </FormControl.Label>
                <Input
                 borderWidth={.2} 
                 mt = {-5}
                 borderColor={Colors.main} 
                 bg={Colors.lightpink} 
                 py={4}
                 color={Colors.main}
                 _focus={{
                   bg: Colors.lightpink,
                   borderWidth: 1,
                   borderColor: Colors.main,
                 }}
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                 <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  COUNTRY
                </FormControl.Label>
                <Select
                  mt = {-5}
                 borderWidth={.2} 
                 borderColor={Colors.main} 
                 bg={Colors.lightpink} 
                 py={4}
                 color={Colors.main}
                 _focus={{
                   bg: Colors.lightpink,
                   borderWidth: 1,
                   borderColor: Colors.main,
                 }}
                    width="100%"
                    iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                    style={{ width: undefined }}
                    selectedValue={country}
                    placeholder="Select your country"
                    placeholderStyle={{ color: '#007aff' }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => setCountry(e)}

                >
                    {countries.map((c) => {
                        return <Select.Item
                            key={c.code}
                            label={c.name}
                            value={c.name}
                        />
                    })}
                </Select>
                <Buttone 
              bg={Colors.main} 
              color={Colors.white} 
              mt={4}
             
              onPress={() => checkOut()}
            >
              Continue
            </Buttone>
                </VStack>
        </ScrollView>
      </Box>
     
             
                
                </Box>
    )

}

const styles = StyleSheet.create({
    whiteText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  
export default Checkout;

