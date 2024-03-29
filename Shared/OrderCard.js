import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Picker, Select } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";
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
  const [productData, setProductData] = useState([]);

  const fetchProductData = async (orderItemId) => {
    try {
      const response = await axios.get(`${baseURL}orders/orderItems/${orderItemId}`);
      const productId = response.data.product; // Assuming response.data.product contains the product ID
      return productId;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
  };
  
  const fetchOrderItemsData = async () => {
    try {
      const orderItems = item.orderItems;
      console.log("Order Items:", orderItems);
  
      const productDataPromises = orderItems.map(async (orderItemId) => {
        const productId = await fetchProductData(orderItemId);
        if (productId) {
          return await axios.get(`${baseURL}products/${productId}`);
        }
        return null;
      });
  
      const fetchedProductData = await Promise.all(productDataPromises);
      console.log("Fetched Product Data:", fetchedProductData);
      setProductData(fetchedProductData.filter(Boolean)); // Filter out null values
    } catch (error) {
      console.error("Error fetching order item data:", error);
    }
  };
  
  useEffect(() => {
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
    {/* Render product names */}
    {productData && productData.map((product, index) => (
      <View key={index}>
        <Text>Product Name: {product.data.name}</Text>
        {product.data.images.length > 0 && (
          
          <Image
            source={{ uri: product.data.images[0] }} // Display the first image
            style={{ width: 100, height: 100 }} // Set appropriate dimensions
          />
        )}
        <Text>Price: {product.data.price}</Text>
      </View>
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