// Review.js
import React from 'react';
import {Box, Heading, Text } from "native-base"
import colors from "../color"
import Rating from './Rating';

const Review = () => {
  return (
    <Box my={9}>
        <Heading bold fontSize={15} mb={2}>
            REVIEW
        </Heading>
        {/* NO Review*/}

        {/*Review*/}
        <Box p={3} bg={colors.lightpink} mt={5} rounded={5}>
            <Heading fontSize={15} color={colors.black}>
                User ME
            </Heading>
            <Rating value={5}/>
            <Text mb={3}>March 14 2024</Text>
        </Box>
    </Box>
  );
};

export default Review;
