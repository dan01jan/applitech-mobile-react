import {View, Text} from "react-native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../Screens/HomeScreen"
import SingleProductScreen from "../Screens/SingleProductScreen"
import ShippingScreen from "../Screens/ShippingScreen"
import PaymentScreen from "../Screens/PaymentScreen"
import PlaceOrderScreen from "../Screens/PlaceOrderScreen"
import ProfileScreen from "../Screens/ProfileScreen"

const Stack = createNativeStackNavigator();
const StackNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Single" component={SingleProductScreen} />
                <Stack.Screen name="Shipping" component={ShippingScreen}/>
                <Stack.Screen name="Payment" component={PaymentScreen} />
               <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
                <Stack.Screen name="User Profile" component={ProfileScreen} />
            </Stack.Navigator>
    );
};

export default StackNav;