//PLACE ORDER SCREEN
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Image,
} from "react-native";
import {
  Text,
  HStack,
  VStack,
  Avatar,
  Spacer,
  Input,
  Center,
  FormControl,
  Box,
  Heading,
} from "native-base";
import { clearCart } from "../../Redux/Actions/cartActions";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../color";
import Buttone from "../Components/Buttone";

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  const [token, setToken] = useState();
  // const confirm = props.route.params;
  const finalOrder = props.route.params;
  console.log("order", finalOrder);
  const dispatch = useDispatch();
  let navigation = useNavigation();

  const confirmOrder = () => {
    const order = finalOrder.order.order;
    const adjustedOrderItems = order.orderItems.map(item => ({
      ...item,
      product: item.id // Change '_id' to 'id' to match the backend
    }));
  
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
        const config = {
          headers: {
            Authorization: `Bearer ${res}`,
          },
        };
  
        const adjustedOrder = {
          ...order,
          orderItems: adjustedOrderItems
        };
  
        axios
          .post(`${baseURL}orders`, adjustedOrder, config)
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
                navigation.navigate("AppreciationScreen");
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
  };
  
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    finalOrder.order.order.orderItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    return totalAmount;
  };

  return (
    <Box flex={1} safeArea bg={Colors.main} py={5}>
      <Center pb={15}>
        <Text style={styles.whiteText}>Confirm Order</Text>
      </Center>
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <VStack space={6} mt={5}>
              {props.route.params ? (
                <View>
                  <FormControl.Label
                    _text={{
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ADDRESS #1
                  </FormControl.Label>
                  <Input
                    borderWidth={0.2}
                    borderColor={Colors.main}
                    bg={Colors.lightpink}
                    py={4}
                    color={Colors.main}
                    _focus={{
                      bg: Colors.lightpink,
                      borderWidth: 1,
                      borderColor: Colors.main,
                    }}
                    value={finalOrder.order.order.shippingAddress1}
                    editable={false} // Set editable prop to false to make it read-only
                  />
                  <FormControl.Label
                    _text={{
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ADDRESS #2
                  </FormControl.Label>
                  <Input
                    borderWidth={0.2}
                    borderColor={Colors.main}
                    bg={Colors.lightpink}
                    py={4}
                    color={Colors.main}
                    _focus={{
                      bg: Colors.lightpink,
                      borderWidth: 1,
                      borderColor: Colors.main,
                    }}
                    value={finalOrder.order.order.shippingAddress2}
                    editable={false} // Set editable prop to false to make it read-only
                  />
                  <FormControl.Label
                    _text={{
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    CITY
                  </FormControl.Label>
                  <Input
                    borderWidth={0.2}
                    borderColor={Colors.main}
                    bg={Colors.lightpink}
                    py={4}
                    color={Colors.main}
                    _focus={{
                      bg: Colors.lightpink,
                      borderWidth: 1,
                      borderColor: Colors.main,
                    }}
                    value={finalOrder.order.order.city}
                    editable={false} // Set editable prop to false to make it read-only
                  />
                  <FormControl.Label
                    _text={{
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ZIPCODE
                  </FormControl.Label>
                  <Input
                    borderWidth={0.2}
                    borderColor={Colors.main}
                    bg={Colors.lightpink}
                    py={4}
                    color={Colors.main}
                    _focus={{
                      bg: Colors.lightpink,
                      borderWidth: 1,
                      borderColor: Colors.main,
                    }}
                    value={finalOrder.order.order.zip}
                    editable={false} // Set editable prop to false to make it read-only
                  />
                  <FormControl.Label
                    _text={{
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    COUNTRY
                  </FormControl.Label>
                  <Input
                    borderWidth={0.2}
                    borderColor={Colors.main}
                    bg={Colors.lightpink}
                    py={4}
                    color={Colors.main}
                    _focus={{
                      bg: Colors.lightpink,
                      borderWidth: 1,
                      borderColor: Colors.main,
                    }}
                    value={finalOrder.order.order.country}
                    editable={false} // Set editable prop to false to make it read-only
                  />

                  <Center>
                    <Heading bold fontSize={15} isTruncated my={4}>
                      PRODUCTS ORDERED
                    </Heading>
                  </Center>

                  {finalOrder.order.order.orderItems.map((item) => {
                    return (
                      <HStack
                        space={[2, 3]}
                        justifyContent="space-between"
                        key={item.id}
                      >
                        {/* <Image source={{ uri: item.images[0] }} alt={item.name} w="full" h={24} resizeMode="contain" /> */}

                        <VStack>
                          <Text
                            _dark={{
                              color: "warmGray.50",
                            }}
                            color="coolGray.800"
                            bold
                          >
                            {item.name}
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text
                          fontSize="xs"
                          _dark={{
                            color: "warmGray.50",
                          }}
                          color="coolGray.800"
                          alignSelf="flex-start"
                        >
                          ₱{item.price}
                        </Text>
                        <Text
                          fontSize="xs"
                          _dark={{
                            color: "warmGray.50",
                          }}
                          color="coolGray.800"
                          alignSelf="flex-start"
                        >
                          x {item.quantity}
                        </Text>
                      </HStack>
                    );
                  })}
                  <Center mt={10}>
                    <Text style={styles.title}>Total Amount</Text>

                    <Text style={styles.title}>
                      ₱{calculateTotalAmount().toFixed(2)}
                    </Text>
                  </Center>
                </View>
              ) : null}
            </VStack>
            <Buttone
              bg={Colors.main}
              color={Colors.white}
              mt={4}
              onPress={() => confirmOrder()}
            >
              Continue
            </Buttone>
          </View>
        </ScrollView>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  whiteText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  // container: {
  //     height: height,
  //     padding: 8,
  //     alignContent: "center",
  //     backgroundColor: "white",
  // },
  // titleContainer: {
  //     justifyContent: "center",
  //     alignItems: "center",
  //     margin: 8,
  // },
  title: {
    alignSelf: "center",

    fontSize: 16,
    fontWeight: "bold",
  },
  // listItem: {
  //     alignItems: "center",
  //     backgroundColor: "white",
  //     justifyContent: "center",
  //     width: width / 1.2,
  // },
  // body: {
  //     margin: 10,
  //     alignItems: "center",
  //     flexDirection: "row",
  // },
});
export default Confirm;
