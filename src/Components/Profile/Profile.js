import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from "native-base"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"
import baseURL from '../../../assets/common/baseurl';
import AuthGlobal from '../../../Context/Store/AuthGlobal';
import { logoutUser } from "../../../Context/Actions/Auth.actions"
import { Box, FormControl, VStack, Input } from "native-base"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import Buttone from '../Buttone'
import Colors from '../../color'

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState('')
    const [orders, setOrders] = useState([])
    const navigation = useNavigation(); // Add this line

    const fetchUserData = useCallback(() => {
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
                const userOrders = data.filter(
                    (order) =>
                        order.user ? (order.user._id === context.stateUser.user.userId) : false
                );
                setOrders(userOrders);
            })
            .catch((error) => console.log(error))
    }, [context.stateUser.user.userId])

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                navigation.navigate("Login")
            }
            fetchUserData();
            return () => {
                setUserProfile();
                setOrders();
            }
        }, [context.stateUser.isAuthenticated, fetchUserData, navigation]) // Add navigation to dependency array
    )

    // Define Inputs array
    const Inputs = [
        {
            label: "USERNAME",
            type: "text",
        },
        {
            label: "EMAIL",
            type: "text",
        },
        {
            label: "PASSWORD",
            type: "password",
        },
        {
            label: "CONFIRM PASSWORD",
            type: "password",
        },
    ];

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Text style={{ fontSize: 30 }}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : ""}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button title={"Sign Out"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]} />
                    {/* <View style={styles.order}>
                        <Text style={{ fontSize: 20 }}>My Orders</Text>
                        <View>
                            {orders ? (
                                orders.map((order) => {
                                    return <OrderCard key={order.id} item={order} select="false" />;
                                })
                            ) : (
                                <View style={styles.order}>
                                    <Text>You have no orders</Text>
                                </View>
                            )}
                        </View>
                    </View> */}
                </View>
                <VStack space={10} mt={5} pb={10}>
                    {Inputs.map((i, index) => (
                        <FormControl key={index}>
                            <FormControl.Label
                                _text={{
                                    fontSize: "12px",
                                    fontWeight: "bold"
                                }}
                            >
                                {i.label}
                            </FormControl.Label>
                            <Input
                                borderWidth={0}
                                bg={Colors.lightpink}
                                borderColor={Colors.main}
                                py={4}
                                type={i.type}
                                color={Colors.main}
                                fontsize={15}
                                _focus={{
                                    bg: Colors.lightpink,
                                    borderColor: Colors.main,
                                    borderWidth: 1,
                                }}
                            />
                        </FormControl>
                    ))}
                    <Buttone bg={Colors.main} color={Colors.white}>
                        Update Profile
                    </Buttone>
                </VStack>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})

export default UserProfile
