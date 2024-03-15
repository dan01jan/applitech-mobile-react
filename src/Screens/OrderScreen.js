import React from 'react'
import {Box, Heading, ScrollView, Text, View} from "native-base"
import OrderInfo from '../Components/OrderInfo'
import OrderIterm from '../Components/OrderIterm'
import Colors from "../color"
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import PlaceOrderModel from '../Components/PlaceOrderModel'
function PlaceOrderScreen() {
  return (
    <Box bg = {Colors.lightpink} flex = {1} safeArea pt = {6}>
      <Box>
        <ScrollView
          horizontal = {true}
          showsHorizontalScrollIndicator = {false}
        >
         
            <OrderInfo 
            title = "Shipping Info" 
            success
            subTitle = "Shipping: Tanzania" 
            text = "Payment Method: Paypal"
            icon = {<FontAwesome5 name = "shipping-fast" size = {30} color ={Colors.white} />}
            />
            <OrderInfo 
            title = "Deliver To: " 
            subTitle = "Address: " 
            danger
            text = "Bldg. 16-043 BLC"
            icon = {<Ionicons name = "location-sharp" size = {30} color ={Colors.white} />}
            />
          </ScrollView>
          
      </Box>
      <Box px = {6} flex = {1} pb = {3}>
            <Heading bold fontSize = {15} isTruncated my = {4}>
              PRODUCTS
            </Heading>
            
            <OrderIterm />
            <OrderModel/>
          </Box>
    </Box>
  )
}

export default PlaceOrderScreen