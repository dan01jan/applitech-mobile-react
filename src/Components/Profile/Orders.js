import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Center, Container, Box} from "native-base"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../../color';
import axios from "axios"
import baseURL from '../../../assets/common/baseurl';
import AuthGlobal from '../../../Context/Store/AuthGlobal';
// import OrderCard from '../../Shared/OrderCard';
import OrderCard from '../../../Shared/OrderCard'

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState('')
    const [orders, setOrders] = useState([])
    const navigation = useNavigation()
    

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                navigation.navigate("Login")
            }
            console.log("context", context.stateUser.user)
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    axios
                        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) => setUserProfile(user.data))
                })
                .catch((error) => console.log(error))
            axios
                .get(`${baseURL}orders`)
                .then((x) => {
                    const data = x.data;
                    console.log(data)
                    const userOrders = data.filter(
                        (order) =>
                            // console.log(order)
                            order.user ? (order.user._id === context.stateUser.user.userId) : false

                    );
                    setOrders(userOrders);
                })
                .catch((error) => console.log(error))
            return () => {
                setUserProfile();
                setOrders()
            }

        }, [context.stateUser.isAuthenticated]))

    return (
        <Box flex={1} py={5}>
            <ScrollView showsVerticalScrollIndicator={false} >
               
                <View>
                  
                    <View >
                   
                        <View>
                            {orders ? (
                                orders.map((order) => {
                                    return <OrderCard key={order.id} item={order} select="false" />;
                                })
                            ) : (
                                <View >
                                    <Text>You have no orders</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

            </ScrollView>
      </Box>
    )
}

export default UserProfile