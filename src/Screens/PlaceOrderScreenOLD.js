import React, { useContext } from "react";
import { Box, Heading, ScrollView } from "native-base";
import OrderInfo from "../Components/OrderInfo";
import OrderIterm from "../Components/OrderIterm";
import Colors from "../color";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import PlaceOrderModel from "../Components/PlaceOrderModel";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../Context/Store/Auth"; // Correct import path

function PlaceOrderScreen() {
  const route = useRoute();
  const selectedMethod = route.params?.selectedMethod;
  const { address, city, country } = route.params || {};

  const { stateUser } = useContext(AuthContext); // Using useContext to access AuthContext
  const { isAuthenticated, user } = stateUser; // Destructuring isAuthenticated and user

  const paymentMethods = {
    1: "Cash on Delivery",
    2: "GCASH",
    3: "PayMaya",
  };

  const { name, email } = isAuthenticated ? user : { name: "", email: "" };

  return (
    <Box bg={Colors.lightpink} flex={1} safeArea pt={6}>
      <Box>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <OrderInfo
            title="CUSTOMER"
            subTitle={name}
            text={email}
            icon={<FontAwesome name="user" size={30} color={Colors.white} />}
          />
          <OrderInfo
            title="Deliver To: "
            subTitle={`Address: ${address}, City ${city}`}
            icon={<Ionicons name="location-sharp" size={30} color={Colors.white} />}
          />
          <OrderInfo
            title="Shipping Info"
            subTitle={`Shipping: ${country}`}
            text={`Payment Method: ${paymentMethods[selectedMethod] || 'Not Selected'}`}
            icon={<FontAwesome5 name="shipping-fast" size={30} color={Colors.white} />}
          />
        </ScrollView>
      </Box>
      <Box px={6} flex={1} pb={3}>
        <Heading bold fontSize={15} isTruncated my={4}>
          PRODUCTS
        </Heading>
        <OrderIterm />
        <PlaceOrderModel />
      </Box>
    </Box>
  );
}

export default PlaceOrderScreen;