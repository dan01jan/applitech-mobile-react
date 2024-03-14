import React, {useState} from'react';
import { Center, Modal, VStack, HStack, Text } from 'native-base';
import Buttone from "./Buttone";
import colors from "../color"

const OrderInfos = [
  {
    title: "Products",
   price:123.22,
   color:"black"
  },
  {
    title: "Products",
   price:123.22,
   color:"black"
  },
  {
    title: "Products",
   price:123.22,
   color:"black"
  },
  {
    title: "Products",
   price:1232.22,
   color:"black"
  }
]

export default function PlaceOrderModel() {
  const [showModel,setShowModel] = useState(false)
  return (
    <Center>
       <Buttone
        onPress={() => setShowModel(true)}
        bg={colors.main}
        color={colors.black}
        mt={5}
        > 
        SHOW TOTAL
        </Buttone>
        <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
          <Modal.Content maxWidth={350}>
            <Modal.CloseButton/>
            <Modal.Header>Order</Modal.Header>
            <Modal.Body>
              <VStack space={7}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Products</Text>
                  <Text color={colors.main} bold>
                    $234.97
                  </Text>

                </HStack>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
    </Center>
  )
}