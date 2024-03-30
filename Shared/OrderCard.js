import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { HStack, VStack, Modal, Button, Heading, FormControl, TextArea, Select, CheckIcon } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../assets/common/baseurl";
import { useNavigation } from "@react-navigation/native";
import Buttone from "../src/Components/Buttone";
import Colors from "../src/color";
import { LinearGradient } from 'expo-linear-gradient';
import Review from "../src/Components/Review";// Import the Review component

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
  const [navigation, setNavigation] = useState(useNavigation());
  const [productData, setProductData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProductInfo, setSelectedProductInfo] = useState('');

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

  const fetchProductData = async (orderItemId) => {
    try {
      const response = await axios.get(`${baseURL}orders/orderItems/${orderItemId}`);
      const productId = response.data.product;
      return productId;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
  };

  const fetchOrderItemsData = async () => {
    try {
      const orderItems = item.orderItems;
      const productDataPromises = orderItems.map(async (orderItemId) => {
        const productId = await fetchProductData(orderItemId);
        if (productId) {
          return await axios.get(`${baseURL}products/${productId}`);
        }
        return null;
      });
      const fetchedProductData = await Promise.all(productDataPromises);
      setProductData(fetchedProductData.filter(Boolean));
    } catch (error) {
      console.error("Error fetching order item data:", error);
    }
  };

  useEffect(() => {
    fetchOrderItemsData();
  }, []);

  // const fetchOrderProducts = async () => {
  //   try {
  //     const productPromises = item.orderItems.map(async (orderItemId) => {
  //       const response = await axios.get(`${baseURL}order-items/${orderItemId}`);
  //       return response.data.product.name;
  //     });
  //     const products = await Promise.all(productPromises);
  //     setOrderProducts(products);
  //   } catch (error) {
  //     console.error('Error fetching order products:', error);
  //   }
  // };


  useEffect(() => {
    const fetchOrderStatus = () => {
    if (item.status === "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("PENDING");
      setCardColor(["#FFDEDE", "#FFB5B5"]);
    } else if (item.status === "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("SHIPPED");
      setCardColor(["#FFF8C7", "#FDE68A"]);
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("DELIVERED");
      setCardColor(["#DEFFCB", "#AAFCAE"]);
    }

    
    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    }
    
  };
  fetchOrderStatus();
  // fetchOrderProducts();
  }, [item]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleStarPress = (productId) => {
    setSelectedProductInfo(productId);
    toggleModal();
  };  

  return (
    <View style={styles.container}>
      <LinearGradient colors={Array.isArray(cardColor) ? cardColor : [cardColor]} style={styles.gradient}>
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
          <Text style={[styles.productsordered, { marginTop: 20 }]}>Products Ordered:</Text>
          <View>
            {productData && productData.map((product, index) => (
              <View style={[styles.productList, { marginTop: 20, marginLeft: 30, marginRight: 30 }]} key={index}>
                <HStack justifyContent="space-between">
                  {product.data.images.length > 0 && (
                    <Image
                      source={{ uri: product.data.images[0] }}
                      style={{ width: 44, height: 44, borderRadius: 22 }}
                    />
                  )}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.status === "1" && (
                      <TouchableOpacity onPress={() => handleStarPress(product.data._id)} style={styles.starIconContainer}>
                      <Icon name="star" size={24} color="gold" style={styles.starIcon} />
                    </TouchableOpacity>
                    
                    )}
                    <Text style={styles.dataText}>{product.data.name}</Text>
                  </View>
                  <Text style={styles.dataText}>₱{product.data.price}</Text>
                </HStack>
              </View>
            ))}
          </View>
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
        <Modal isOpen={isModalVisible} onClose={toggleModal} size="lg" safeAreaTop>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
              <Heading>Review for {selectedProductInfo} </Heading>
            </Modal.Header>
            <Modal.Body>
              <Review productId={selectedProductInfo} toggleModal={toggleModal} />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </LinearGradient>
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
  },
  productsordered: {
    alignSelf: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 24
  },
  productList: {
    marginTop: 20
  },
  dataText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10
  },
  gradient: {
    flex: 1,
    borderRadius: 30,
    overflow: "hidden",
    padding: 20,
    margin: 10,
  },
  starIconContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  starIcon: {
    position: 'absolute',
    left: 120,
    top: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow on Android
    shadowColor: 'black', // Shadow color on iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
  },
});

export default OrderCard;
