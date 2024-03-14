import { Box, Center, FormControl, Input, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import Colors from '../color'
import Buttone from '../Components/Buttone'

const ShippingInputs = [
  {
    label: "ENTER CITY",
    type: "text"
  },
  {
    label: "ENTER COUNTRY",
    type: "text"
  },
  {
    label: "ENTER POSTAL CODE",
    type: "text"
  },
  {
    label: "ENTER ADDRESS",
    type: "text"
  },

]
function ShippingScreen() {
  return (
   <Box flex = {1} safeArea bg ={Colors.main} py = {5}>
      <Center pb = {15}>
        <Text color = {Colors.white} fontsize =  {14} bold>
          Delivery Address
        </Text>
      </Center>
      <Box h = "full" bg = {Colors.white} px = {5}>
        <ScrollView showsVerticalScrollIndicator = {false}>
        
          <VStack space = {6} mt = {5}>
          {ShippingInputs.map((i, index) => 
            <FormControl key =  {index}>
              <FormControl.Label
                _text = {{
                  fontSize: "12px",
                  fontWeight: "bold"
                }}
              >
                {i.label}
              </FormControl.Label>
              <Input 
                borderWidth={.2} 
                borderColor = {Colors.main} 
                bg = {Colors.lightpink} 
                py = {4}
                type = {i.type}
                color = {Colors.main}
                _focus = {{
                  bg: Colors.lightpink,
                  borderWidth: 1,
                  borderColor: Colors.main,
                }}
              />
            </FormControl>
)}  
              <Buttone bg = {Colors.main} color = {Colors.white} mt = {5}>
                 Continue
              </Buttone>
            
          </VStack>
        </ScrollView>
      </Box>
   </Box>
  )
}

export default ShippingScreen