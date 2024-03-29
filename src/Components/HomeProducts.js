import React, { useState, useEffect } from "react";
import { ScrollView, Text, Flex, Pressable, Image, Box, Heading, Spinner, HStack } from "native-base";
import colors from "../color";
import { useNavigation } from "@react-navigation/native";
import WebView1 from "react-native-webview";
import baseURL from "../../assets/common/baseurl";
import axios from 'axios';
import Rating from './Rating';
import FloatingChatButton from './FloatingChatButton';
import {
  StyleSheet,
} from "react-native";
function HomeProducts() {
  const navigation = useNavigation();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page for pagination
  const [allProductsLoaded, setAllProductsLoaded] = useState(false); // Track if all products are loaded
  const productsPerPage = 4; 

  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const sumRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
    return sumRatings / reviews.length;
  };
  

  const steps = [
    {
      id: '1',
      message: 'Hello! How can I assist you today?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: ({ value }) => {
        if(value.toLowerCase().includes("help")) return "3";
        // You can add more conditions here to handle different user inputs
        // For example, if the user asks about products, you can direct them to a "products" step
        return "fallback"; // A fallback step in case the user's input doesn't match any condition
      },
    },
    {
      id: '3',
      message: 'Sure, I can help you with that. Can you specify what kind of help you need?',
      trigger: '4',
    },
    {
      id: '4',
      user: true,
      trigger: '5', // Assuming next step is to process the user's detailed request
    },
    {
      id: '5',
      message: 'Got it, please wait a moment while I look that up for you.',
      // No trigger here if this is the end of the conversation path or if you want to handle the next steps dynamically
    },
    {
      id: 'fallback',
      message: 'I\'m sorry, I didn\'t quite catch that. Can you please specify how I can assist you?',
      trigger: '2', // Loops back to allow the user to respond again
    },
    // Add more steps as needed based on the different paths you want the conversation to take
  ];

  useEffect(() => {
    setLoading(true);

    axios.get(`${baseURL}products/all?page=${page}&limit=${productsPerPage}`)
        .then(response => {
            setLoadedProducts(prevProducts => [...prevProducts, ...response.data.products]);
            setLoading(false);
            if (response.data.products.length === 0) {
              setAllProductsLoaded(true); // Set all products loaded flag if no more products
            }
            // setTotalPages(response.data.totalPages); // Update total pages
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            setLoading(false);
        });

  }, [page]); // Fetch products when page changes

  // Function to handle infinite scrolling
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const paddingToBottom = 20; // Adjust as needed
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      // User has reached the bottom of the list
      if (!loading && !allProductsLoaded) {
        setPage(prevPage => prevPage + 1); // Increment page to fetch more products
      }
    }
  };

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false} onScroll={handleScroll}>
       <Flex alignItems="center" justifyContent="center" my={4}>
        <WebView1
          style={{ width: 380, height: 215 }}
          source={{ uri: "https://www.youtube.com/embed/e176vc5gxxM?si=MVAL6Jn14eiyS4u9" }}
        />
      </Flex>
      <Text style = {styles.headerText}>Products</Text>
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}
      >
        {loadedProducts.map((product) => (
          <Pressable
            key={product._id}
            onPress={() => navigation.navigate("Single", product)}
            w="47%"
            bg={colors.white}
            rounded="md"
            shadow={2}
            my={3}
            overflow="hidden"
          >
           <Image
              source={{ uri: product.images && product.images.length > 0 ? product.images[0] : 'https://example.com/default-image.jpg' }}
              alt={product.name}
              w="100%"
              h={200}
              resizeMode="cover"
            />
            <Box px={4} pt={1}>
            <HStack justifyContent="space-between" >
              <Heading size="sm" bold>
                {product.name}
              </Heading>
              <Heading size="sm" bold>
              ₱{product.price}
              </Heading>
              </HStack>
              <Rating value={calculateAvgRating(product.reviews)}></Rating>
            </Box>
          </Pressable>
        ))}
      
      </Flex>
      {loading && (
        <Flex alignItems="center" justifyContent="center" mt={4}>
          <Spinner color="#0000FF" thickness="5px" size={50} accessibilityLabel="Loading" />
        </Flex>
      )}
      {!loading && allProductsLoaded && (
        <Flex alignItems="center" justifyContent="center" mt={4}>
          <Text style = {styles.loadingText}>No more products to load</Text>
        </Flex>
      )}
       <FloatingChatButton steps={steps} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 loadingText:{
  fontSize: 20,
  marginBottom: 20
 },
 headerText:{
  fontSize: 20,
  marginBottom: 5,
  alignSelf: 'center'
 }
})


export default HomeProducts;
