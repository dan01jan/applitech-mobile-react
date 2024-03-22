import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Button,Image } from "react-native";
import { Text, HStack, VStack, Avatar, Spacer, Center } from "native-base";
import { clearCart } from '../../Redux/Actions/cartActions';
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from '../../assets/common/baseurl';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage"


<<<<<<< Updated upstream
  const paymentMethods = {
    1: "Cash on Delivery",
    2: "GCASH",
    3: "PayMaya",
  
=======
var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
    const [token, setToken] = useState();
    // const confirm = props.route.params;
    const finalOrder = props.route.params;
    console.log("order", finalOrder)
    const dispatch = useDispatch()
    let navigation = useNavigation()

    const confirmOrder = () => {
      const order = finalOrder.order.order;
  
      AsyncStorage.getItem("jwt")
          .then((res) => {
              setToken(res);
              const config = {
                  headers: {
                      Authorization: `Bearer ${res}`
                  }
              };
  
              axios
                  .post(`${baseURL}orders`, order, config)
                  .then((res) => {
                      if (res.status === 200 || res.status === 201) {
                          Toast.show({
                              topOffset: 60,
                              type: "success",
                              text1: "Order Completed",
                              text2: "",
                          });
  
                          setTimeout(() => {
                              dispatch(clearCart());
                              navigation.navigate("Cart");
                          }, 500);
                      } else {
                          // Handle other response statuses if needed
                      }
                  })
                  .catch((error) => {
                      Toast.show({
                          topOffset: 60,
                          type: "error",
                          text1: "Something went wrong",
                          text2: "Please try again",
                      });
                  });
          })
          .catch((error) => console.log(error));
>>>>>>> Stashed changes
  };
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    finalOrder.order.order.orderItems.forEach((item) => {
        totalAmount += item.price * item.quantity;
    });
    return totalAmount;
};
  
    return (
        <Center>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
                    {props.route.params ? (
                        <View style={{ borderWidth: 1, borderColor: "orange" }}>
                            <Text style={styles.title}>Shipping to:</Text>
                            <View style={{ padding: 8 }}>
                                <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                                <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                                <Text>City: {finalOrder.order.order.city}</Text>
                                <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                                <Text>Country: {finalOrder.order.order.country}</Text>
                            </View>
                            <Text style={styles.title}>items</Text>

                            {finalOrder.order.order.orderItems.map((item) => {
                                return (
                                    <HStack space={[2, 3]} justifyContent="space-between" key={item.id}>
                                       
                                           <Image source={{ uri: item.images[0] }} alt={item.name} w="full" h={24} resizeMode="contain" />
                                        
                                        <VStack>
                                            <Text _dark={{
                                                color: "warmGray.50"
                                            }} color="coolGray.800" bold>
                                                {item.name}
                                            </Text>

                                        </VStack>
                                        <Spacer />
                                        <Text fontSize="xs" _dark={{
                                            color: "warmGray.50"
                                        }} color="coolGray.800" alignSelf="flex-start">
                                            {item.price}
                                        </Text>
                                    </HStack>
                                )
                            })}
                            <Text style={styles.title}>Total Amount</Text>
                            <Text style={{ alignSelf: "center", marginVertical: 8 }}>
                                ${calculateTotalAmount().toFixed(2)}
                            </Text>
                        </View>
                    ) : null}
                    <View style={{ alignItems: "center", margin: 20 }}>
                        <Button
                            title={"Place order"}
                            onPress={confirmOrder}
                        />
                    </View>
                </View>
            </ScrollView>
        </Center>
    )

}
const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: "center",
        backgroundColor: "white",
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    title: {
        alignSelf: "center",
        margin: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    listItem: {
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
        width: width / 1.2,
    },
    body: {
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
    },
});
export default Confirm;