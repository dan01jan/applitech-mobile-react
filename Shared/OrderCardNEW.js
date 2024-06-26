import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker, Select } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";
import cardbg from "../assets/images/logoApp.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseurl";
import { useNavigation } from "@react-navigation/native";
import Buttone from "../src/Components/Buttone";
import Colors from "../src/color";
const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];
const OrderCard = ({ item, select }) => {
  
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState("");
  const [statusChange, setStatusChange] = useState("");
  const [token, setToken] = useState("");
  const [cardColor, setCardColor] = useState("");
  const navigation = useNavigation();
  const [productData, setProductData] = useState(null);

  const fetchOrderItemsData = async () => {
    try {
      const orderItems = item.orderItems; // Assuming item.orderItems contains an array of order item IDs
      console.log("Order Items:", orderItems);
  
      // Fetch order item data
      for (let i = 0; i < orderItems.length; i++) {
          const orderItemId = orderItems[i];
          const response = await axios.get(`${baseURL}orders/orderItems/${orderItemId}`);
          console.log(`Fetched Order Data:`, response.data);
          // Do whatever processing you need with order item data here
      }
  } catch (error) {
      console.error("Error fetching order item data:", error);
  }
  };

  const fetchProductData = async () => {
    try {
      const productId = "6603bf85f1f5a8b57ccde119";
      const response = await axios.get(`${baseURL}products/${productId}`);
      console.log("Fetched Product Data:", response.data);
      // Process the product data as needed
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  // const fetchOrderItemsData = async () => {
  //   try {
  //     const orderId = "66064525c9c7608d5dd2a156";
  //     const response = await axios.get(`${baseURL}orderitems/${orderId}`);
  //     console.log("Fetched Order Data:", response.data);
  //     // Process the product data as needed
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //   }
  

  // const fetchProductData = async () => {
  //   try {
  //     const orderItems = item.orderItems; // Assuming item.orderItems contains an array of order item IDs
  //     console.log(item.orderItems)
  //     const productPromises = orderItems.map(async (orderItemId) => {
  //       const response = await axios.get(`${baseURL}/orders/orderItems/${orderItemId}`);
  //       return response.data.product; // Assuming response.data.product contains the product ID
  //     });
      
  
  //     const productIds = await Promise.all(productPromises);
  //     const productDataPromises = productIds.map(async (productId) => {
  //       const response = await axios.get(`${baseURL}products/${productId}`);
  //       return response.data;
  //     });
  
  //     const productData = await Promise.all(productDataPromises);
  //     console.log("Fetched Product Data:", productData);
  //     setProductData(productData); // Assuming you want to store the product data in the state
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //   }
  // };
  
  useEffect(() => {
    fetchProductData(); // Fetch product data when component mounts
    fetchOrderItemsData();
  }, []);

  

  const updateOrder = () => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const order = {
      city: item.city,
      country: item.country,
      dateOrdered: item.dateOrdered,
      id: item.id,
      orderItems: item.orderItems,
      phone: item.phone,
      shippingAddress1: item.shippingAddress1,
      shippingAddress2: item.shippingAddress2,
      status: statusChange,
      totalPrice: item.totalPrice,
      user: item.user,
      zip: item.zip,
    };
    axios
      .put(`${baseURL}orders/${item.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Edited",
            text2: "",
          });
          setTimeout(() => {
            navigation.navigate("OrderAdmin");
          }, 500);
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
  };
  useEffect(() => {
    if (item.status === "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("PENDING");
      setCardColor("#FFDEDE");
    } else if (item.status === "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("SHIPPED");
      setCardColor("#FFF8C7");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("DELIVERED");
      setCardColor("#DEFFCB");
    }
    
    console.log("Item Total Price:", item.totalPrice, item); // Log the data here
  
    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  
    console.log("OrderCard item prop:", item);
  }, [item]);

  return (
    // <View style={[{ backgroundColor: cardColor }, styles.container]}>
    //   <View style={styles.container}>
    //     <Text>Order Number: #{item.id}</Text>
    //   </View>
    // </View>
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
    <View style={styles.rowContainer}>
      <View style={styles.statusContainer}>
        <Text>Status: {statusText} {orderStatus}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateOrdered}>{item.dateOrdered.split("T")[0]}</Text>
      </View>
    </View>
    <View style={styles.orderNumberContainer}>
      <Text style={styles.orderNumber}>Order Number: #{item.id}</Text>
    </View>
    <View style={{ marginTop: 10 }}>
      <Text>Address: {item.shippingAddress1} {item.shippingAddress2}</Text>
      <Text>City: {item.city}</Text>
      <Text>Country: {item.country}</Text>
      <Text>Order Item IDs:</Text>
          {item.orderItems && item.orderItems.map((orderItem, index) => (
        <Text key={index}>- {orderItem}</Text>
      ))}
      <View>
        {select ? null : (
          <>
            <Select
              width="100%"
              mt={5}
              iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
              style={{ width: undefined }}
              selectedValue={statusChange}
              color="black"
              placeholder="Change Status"
              placeholderTextColor="black"
              placeholderStyle={{ color: "black" }}
              placeholderIconColor="#007aff"
              onValueChange={(e) => setStatusChange(e)}
              fontWeight={"bold"}
            >
              {codes.map((c) => (
                <Select.Item key={c.code} label={c.name} value={c.code} />
              ))}
            </Select>
            <Buttone 
              bg={Colors.main} 
              color={Colors.white} 
              mt={4}
            
              onPress={() => updateOrder()}
            >
              Continue
            </Buttone>
            {/* <EasyButton secondary large onPress={() => updateOrder()}>
              <Text style={{ color: "white" }}>Update</Text>
            </EasyButton> */}
          </>
        )}
      </View>
    </View>
  </View>
  
);
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 30,
    overflow: "hidden",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusContainer: {
    flex: 1,
  },
  dateContainer: {
    marginLeft: 10,
  },
  orderNumberContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  orderNumber: {
    color: "black",
    fontWeight: "bold",
  },
  dateOrdered: {
    textAlign: "right",
    fontWeight: "bold"
    // marginBottom: 15,
  },
});


export default OrderCard;