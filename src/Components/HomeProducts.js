import { ScrollView, Flex, Pressable, Box, Heading,Image,Text } from "native-base";
import React from "react";
import { WebView } from 'react-native-webview';
import products from "../data/Products";
import colors from "../color";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";


function HomeProducts() {
  const navigation = useNavigation();
  return (
    <>

    <ScrollView flex={1} showsHorizontalScrollIndicator={false}>
      {/* YouTube video section */}
      <Flex alignItems="center" justifyContent="center" my={4}>
        <WebView
          style={{ width: 300, height: 215 }}
          source={{ uri: "https://www.youtube.com/embed/e176vc5gxxM?si=MVAL6Jn14eiyS4u9" }}
        />
      </Flex>

      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}
      >
        {products.map((product, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate("Single", product)}
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
    </>
  );
}

export default HomeProducts;
