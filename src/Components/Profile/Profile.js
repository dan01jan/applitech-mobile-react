import React, { useContext, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Container } from "native-base"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"
import baseURL from '../../../assets/common/baseurl';
import AuthGlobal from '../../../Context/Store/AuthGlobal';
import { logoutUser } from "../../../Context/Actions/Auth.actions"
import { Box, FormControl, VStack, ScrollView, Input, NativeBaseProvider, Button as NativeBaseButton } from "native-base"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import Buttone from '../Buttone'
import Colors from '../../color'

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // State to store isAdmin
    const [orders, setOrders] = useState([])
    const navigation = useNavigation(); // Add this line

    const fetchUserData = useCallback(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((user) => {
                        setUserProfile(user.data);
                        setUsername(user.data.name);
                        setEmail(user.data.email);
                        setPhone(user.data.phone);
                        setIsAdmin(user.data.isAdmin); // Set isAdmin state
                    });
            })
            .catch((error) => console.log(error));
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
            .catch((error) => console.log(error));
    }, [context.stateUser.user.userId]);

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                navigation.navigate("Login");
            }
            fetchUserData();
            return () => {
                setUserProfile();
                setOrders();
            };
        }, [context.stateUser.isAuthenticated, fetchUserData, navigation]) // Add navigation to dependency array
    );

    const handleUpdateProfile = () => {
        const updatedUserData = {
            name: username,
            email: email,
            phone: phone
        };

        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .put(`${baseURL}users/${context.stateUser.user.userId}`, updatedUserData, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((response) => {
                        console.log("Profile updated successfully:", response.data);
                        // Optionally, you can update local state or display a success message here
                    })
                    .catch((error) => console.log("Error updating profile:", error));
            })
            .catch((error) => console.log(error));
    };

    return (
        <Box h="full" bg={Colors.white} px={5}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space={10} mt={5} pb={10}>
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}
                        >
                            USERNAME
                        </FormControl.Label>
                        <Input
                            borderWidth={0}
                            bg={Colors.lightpink}
                            borderColor={Colors.main}
                            py={4}
                            color={Colors.main}
                            fontSize={15}
                            _focus={{
                                bg: Colors.lightpink,
                                borderColor: Colors.main,
                                borderWidth: 1,
                            }}
                            value={username}
                            onChangeText={text => setUsername(text)}
                            style={{ backgroundColor: '#FAE6E7', padding: 10 }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}
                        >
                            EMAIL
                        </FormControl.Label>
                        <Input
                            borderWidth={0}
                            bg={Colors.lightpink}
                            borderColor={Colors.main}
                            py={4}
                            color={Colors.main}
                            fontSize={15}
                            _focus={{
                                bg: Colors.lightpink,
                                borderColor: Colors.main,
                                borderWidth: 1,
                            }}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={{ backgroundColor: '#FAE6E7', padding: 10 }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}
                        >
                            PHONE
                        </FormControl.Label>
                        <Input
                            borderWidth={0}
                            bg={Colors.lightpink}
                            borderColor={Colors.main}
                            py={4}
                            color={Colors.main}
                            fontSize={15}
                            _focus={{
                                bg: Colors.lightpink,
                                borderColor: Colors.main,
                                borderWidth: 1,
                            }}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            style={{ backgroundColor: '#FAE6E7', padding: 10 }}
                        />
                    </FormControl>
                    <Buttone bg={Colors.main} color={Colors.white} onPress={handleUpdateProfile}>
                        Update Profile
                    </Buttone>
                    {isAdmin && ( // Render button if user is admin
                        // <NativeBaseButton
                        //     bg={Colors.main}
                        //     color={Colors.white}
                        //     style={{ width: '100%' }}
                        //     onPress={() => {
                        //         navigation.navigate("Dashboard"); // Navigate to AdminScreen
                        //     }}
                        // >
                        //     Admin Button
                        // </NativeBaseButton>
                        <Buttone
                            bg={Colors.brightpink}
                            color={Colors.white}
                            style={{ width: '100%' }}
                            onPress={() => {
                                navigation.navigate("Dashboard"); // Navigate to AdminScreen
                            }}
                        >
                            Dashboard
                        </Buttone>
                    )}
                    
                        <Buttone
                            bg={Colors.coral}
                            color={Colors.white}
                            style={{ width: '100%' }}
                            onPress={() => [
                                AsyncStorage.removeItem("jwt"),
                                logoutUser(context.dispatch)
                            ]}
                        >
                            Sign Out
                        </Buttone>
                   
                </VStack>
            </ScrollView>
        </Box>
    );
};

export default UserProfile;
