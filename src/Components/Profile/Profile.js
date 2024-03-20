import React, { useContext, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Container } from "native-base"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"
import baseURL from '../../../assets/common/baseurl';
import AuthGlobal from '../../../Context/Store/AuthGlobal';
import { logoutUser } from "../../../Context/Actions/Auth.actions"
import { Box, FormControl, VStack, ScrollView,Input } from "native-base"
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

    const Inputs = [
        {
            label: "USERNAME",
            value: userProfile ? userProfile.name : "",
        },
        {
            label: "EMAIL",
            value: userProfile ? userProfile.email : "",
        },
        {
            label: "PHONE",
            value: userProfile ? userProfile.phone : "",
        }
    ];

    return (
        <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space={10} mt={5} pb={10}>
                {Inputs.map((input, index) => (
                    <FormControl key={index}>
                        <FormControl.Label
                            _text={{
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}
                        >
                            {input.label}
                        </FormControl.Label>
                        <Input
                            borderWidth={0}
                            bg={Colors.lightpink}
                            borderColor={Colors.main}
                            py={4}
                            type={input.type}
                            color={Colors.main}
                            fontSize={15}
                            _focus={{
                                bg: Colors.lightpink,
                                borderColor: Colors.main,
                                borderWidth: 1,
                            }}
                            value={input.value} // Pass the input value here
                           
                            style={{ backgroundColor: '#FAE6E7', padding: 10 }} // Style for read-only input
                        />
                    </FormControl>
                ))}
                <Buttone bg={Colors.main} color={Colors.white}>
                    Update Profile
                </Buttone>
                <View style={{ marginTop: 5 }}>
                    <Buttone
                        bg={Colors.coral}
                        color={Colors.white}
                        style={{ width: '100%' }} // Ensure button takes full width
                        onPress={() => [
                            AsyncStorage.removeItem("jwt"),
                            logoutUser(context.dispatch)
                        ]}
                    >
                        Sign Out
                    </Buttone>
                </View>
            </VStack>
        </ScrollView>
    </Box>
    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",

    },
    subContainer: {
        width: '90%',
        alignItems: "justify",
        marginTop: 60,
        backgroundColor:'white'
    }
})


export default UserProfile
