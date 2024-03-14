import React, {useState} from 'react';
import { Box, CheckIcon, FormControl, Heading, Text, VStack, Select, TextArea } from 'native-base';
import colors from '../color';
import Rating from './Rating';
import Message from './Notifications/Message';
import Buttone from './Buttone';

const Review = () => {
    const [ratings, setRatings] = useState('')
  return (
    <Box my={9}>
      <Heading bold fontSize={15} mb={2}>
        REVIEW
      </Heading>
      {/* NO Review*/}
      {/* <Message bold color={colors.deepestGray} bg={colors.lightpink} size={10} children={'No Review'} /> */}

      {/*Review*/}
      <Box p={3} bg={colors.lightpink} mt={5} rounded={5}>
        <Heading fontSize={15} color={colors.black}>
          User ME
        </Heading>
        <Rating value={5} />
        <Text my={2} fontSize={11}>
          March 14 2024
        </Text>
        <Message color={colors.black} bg={colors.white} size={10} children={'thank you'} />
      </Box>

      {/* Write Review*/}
      <Box mt={6}>
        <Heading fontSize={15} bold mb={4}>
          WRITE A REVIEW
        </Heading>
        <VStack space={6}>
          <FormControl>
            <FormControl.Label _text={{ fontSize: '12px', fontWeight: 'bold' }}>Rating</FormControl.Label>
            <Select
              bg={colors.lightPink}
              borderWidth={0}
              rounded={5}
              py={3}
              placeholder="Choose Rate"
              _selectedItem={{
                bg: colors.lightpink,
                endIcon: <CheckIcon size={3} />,
              }}
              value={ratings}
              onValueChange={(e) => setRatings(e)}
            >
                <Select.Item label="1 - Poor" value="1"/>
                <Select.Item label="2 - Fair" value="2"/>
                <Select.Item label="3 - Good" value="3"/>
                <Select.Item label="4 - Great" value="4"/>
                <Select.Item label="5 - Excellent" value="5"/>
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label
            _text={{
                fontSize: "12px",
                fontWeight: "bold"
            }}>
                Comment
            </FormControl.Label>
            <TextArea h={20} w="full" placeholder="This is me! look" borderWidth={0} bg={colors.lightpink} py={4}
            _focus={{
                bg: colors.lightpink
            }}/>
          </FormControl>
          <Buttone bg={colors.main} color={colors.white}>
            SUBMIT
          </Buttone>

          {/* NOT LOGIN
          <Message bg={colors.subGreen} color={colors.white} size={10} children={'Please Login to write a review'} /> */}
        </VStack>
      </Box>
    </Box>
  );
};

export default Review;
