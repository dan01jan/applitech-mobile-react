import { ScrollView, Text, Flex, Pressable, Image, Box, Heading, Spinner } from "native-base";
import React, { useState, useEffect } from "react";
import colors from "../color";
import { useNavigation } from "@react-navigation/native";
import WebView1 from "react-native-webview";
import baseURL from "../../assets/common/baseurl";
import axios from 'axios';
import Rating from './Rating';

function HomeProducts() {
  const navigation = useNavigation();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  
    axios.get(`${baseURL}products`)
      .then(response => {
        setLoadedProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []); 

  // Function to handle infinite scrolling
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const paddingToBottom = 20; // Adjust as needed
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      // User has reached the bottom of the list
      if (!loading && loadedProducts.length < loadedProducts.length) { // Check if there are more products available
        setLoading(true);
        // Simulate loading more products (you can replace this with your actual data fetching logic)
        setTimeout(() => {
          const additionalProducts = loadedProducts.slice(loadedProducts.length, loadedProducts.length + 10); // Load additional products
          setLoadedProducts(prevProducts => [...prevProducts, ...additionalProducts]);
          setLoading(false);
        }, 1000); // Simulated loading delay (adjust as needed)
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
              <Heading size="sm" bold>
                {product.price}
              </Heading>
              <Text fontSize={10} mt={1} isTruncated w="full">
                {product.name}
              </Text>
              {/* rating */}
              <Rating value={product.rating}></Rating>
            </Box>
          </Pressable>
        ))}
      
      </Flex>
      {loading && (
        <Flex alignItems="center" justifyContent="center" mt={4}>
          <Spinner color="#0000FF" thickness="5px" size={50} accessibilityLabel="Loading" />
        </Flex>
      )}
    </ScrollView>
  );
}

export default HomeProducts;
