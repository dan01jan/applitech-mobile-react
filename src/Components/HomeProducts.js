import React, { useState, useEffect, useRef  } from "react";
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
import {LinearGradient} from 'expo-linear-gradient';
import { Animated } from "react-native";

function HomeProducts() {
  const navigation = useNavigation();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page for pagination
  const [allProductsLoaded, setAllProductsLoaded] = useState(false); // Track if all products are loaded
  const productsPerPage = 4; 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [translationAnim] = useState(new Animated.Value(100));

  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const sumRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
    return sumRatings / reviews.length;
  };

  useEffect(() => {
    setLoading(true);

    axios.get(`${baseURL}products/all?page=${page}&limit=${productsPerPage}`)
        .then(response => {
            setLoadedProducts(prevProducts => [...prevProducts, ...response.data.products]);
            setLoading(false);
            
            if (response.data.products.length === 0) {
              slideInAnimation();
              setAllProductsLoaded(true); // Set all products loaded flag if no more products
              
            }
            slideInAnimation(); // Trigger fade-in animation when new products are loaded
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
       slideInAnimation();
      }
    }
  };

  const fadeIn = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 5000, // Adjust duration as needed
        useNativeDriver: true,
      }
    ).start();
  };

  const fromBottomAnimation = () => {
    fadeAnim.setValue(0); // Start the animation from the bottom
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000, // Adjust duration as needed
        useNativeDriver: true,
      }
    ).start();
  };

  const slideInAnimation = () => {
    Animated.timing(
      translationAnim,
      {
        toValue: 0, // Animate to its original position
        duration: 2000, // Adjust duration as needed
        useNativeDriver: true,
      }
    ).start();
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
             onPress={() => navigation.navigate("Single", product)}
             w="47%"
             bg={colors.white}
             rounded="md"
             shadow={2}
             my={3}
             overflow="hidden"
           >
             <Animated.View style={{ transform: [{ translateY: translationAnim }] }}>
             <Image
               source={{ uri: product.images && product.images.length > 0 ? product.images[0] : 'https://example.com/default-image.jpg' }}
               alt={product.name}
               w="100%"
               h={200}
               resizeMode="cover"
             />
             <LinearGradient 
    style={styles.gradient}
    colors={['#f4c9e7', '#ffc0e0']} // Add colors array starting from #FFDEDE
>
             <Box px={4} pt={1}>
               <HStack justifyContent="space-between">
                 <Heading size="sm" bold>
                   {product.name}
                 </Heading>
                 <Heading size="sm" bold>
                   ₱{product.price}
                 </Heading>
               </HStack>
               <Rating value={calculateAvgRating(product.reviews)}></Rating>
             </Box>
             </LinearGradient>
             </Animated.View>
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
 },
 
})


export default HomeProducts;
