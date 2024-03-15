import React, {useState} from'react';
import { Center, Modal, VStack, HStack, Text, Button } from 'native-base';
import Buttone from "./Buttone";
import colors from "../color"

const OrdersInfos = [
  {
    title: "Products",
   price:13.22,
   color:"black"
  },
  {
    title: "Shipping",
   price:103.22,
   color:"black"
  },
  {
    title: "Tax",
   price:123.22,
   color:"black"
  },
  {
    title: "Totals",
   price:1232.22,
   color:"black"
  }
]

const OrderModel = () => {
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
                {OrdersInfos.map((i, index) => (
                  <HStack
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                  >
                    <Text fontWeight="medium">{i.title}</Text>
                    <Text
                      color={i.color === "main" ? colors.main : colors.black}
                      bold
                      > 
                        ${i.price}
                      </Text>
                  </HStack>
                ))}
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button flex={1} bg={colors.main} h={45} _text={{
                color:colors.black,
              }}
              onPress={() => setShowModel(false)}
              _pressed={{
                bg: colors.main,
              }}
              >
                PLACE ORDER
              </Button>

            </Modal.Footer>
          </Modal.Content>
        </Modal>
    </Center>
  )
}