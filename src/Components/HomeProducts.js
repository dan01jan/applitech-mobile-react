import { ScrollView, Text, Flex, Pressable, Image, Box, Heading } from "native-base";
import React, { useState } from "react";
import products from "../data/Products";
import colors from "../color";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";
import WebView1 from "react-native-webview";
import WebView2 from "react-native-webview";

function HomeProducts() {
  const navigation = useNavigation();
  const [loadedProducts, setLoadedProducts] = useState(products.slice(0, 6)); // Initial number of products to load
  const [loading, setLoading] = useState(false);

  // Function to handle infinite scrolling
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const paddingToBottom = 20; // Adjust as needed
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      // User has reached the bottom of the list
      if (!loading && loadedProducts.length < products.length) { // Check if there are more products available
        setLoading(true);
        // Simulate loading more products (you can replace this with your actual data fetching logic)
        setTimeout(() => {
          const additionalProducts = products.slice(loadedProducts.length, loadedProducts.length + 10); // Load additional products
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
            onPress={() => navigation.navigate("Single", product)}
            key={product._id}
            w="47%"
            bg={colors.white}
            rounded="md"
            shadow={2}
            my={3}
            overflow="hidden"
          >
            <Image
              source={{ uri: product.image }}
              alt={product.name}
              w="100%"
              h={200} // Adjust the height as needed
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
        {!loading && loadedProducts.length === products.length && <Text>No more products to load.</Text>}
        {loading && <Text>Loading...</Text>}
      </Flex>
    </ScrollView>
  );
}

export default HomeProducts;
