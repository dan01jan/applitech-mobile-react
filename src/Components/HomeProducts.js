import { ScrollView, Text, Flex, Pressable, Image,Box,Heading } from "native-base";
import React from "react";
import products from "../data/Products";
import colors from "../color";
import Rating from "./Rating";

function HomeProducts() {
  return (
    <ScrollView flex={1} showsHorizontalScrollIndicator ={false}>
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}
      >
        {products.map((product) => (
          <Pressable
            key={product._id}
            w="47%"
            bg={colors.white}
            rounded="md"
            shadow={2}
            pt={0.3}
            my={3}
            pb={2}
            overflow="hidden"
          >
            <Image
              source={{ uri:product.image}}
              alt={product.name}
              w="full"
              h={24}
              resizeMode="contain"
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
    </ScrollView>
  );
}

export default HomeProducts;
