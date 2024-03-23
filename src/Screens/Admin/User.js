import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from "axios";
import baseURL from '../../../assets/common/baseurl';
import Colors from '../../color';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        // Fetch token when component mounts
        fetchToken();
        fetchUsers();
    }, []);

    const fetchToken = async () => {
        // Logic to fetch token, e.g., after user login/signup
        const fetchedToken = await AsyncStorage.getItem('authToken'); // Use AsyncStorage to get token
        setToken(fetchedToken);
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${baseURL}users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Fetched users:', response.data);
            setUsers(response.data);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error("Server responded with error:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error("Error setting up request:", error.message);
            }
            console.error("Error fetching users:", error);
        }
    };
    

    const updateUserRole = async (userId, isAdmin) => {
        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem('jwt');
    
            // Prepare the request configuration object with the token in the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            // Make the PUT request to update the user role with the provided isAdmin value
            const response = await axios.put(`${baseURL}users/${userId}`, { isAdmin: isAdmin }, config);
            
            console.log("User role updated successfully:", response.data);
            
            // Refresh the user list after updating the user role
            fetchUsers(); 
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };
    

    const deleteUser = async (userId) => {
        console.log('Deleting user:', userId);
    
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('jwt');
    
        // Prepare the request configuration object with the token in the Authorization header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    
        // Log the request headers (config)
        console.log('Request headers:', config.headers);
    
        Alert.alert(
            "Delete User",
            "Are you sure you want to delete this user?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const response = await axios.delete(`${baseURL}users/${userId}`, config);
                            console.log("User deleted successfully:", response.data);
                            fetchUsers(); 
                        } catch (error) {
                            console.error("Error deleting user:", error);
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: false }
        );
    };
    
    const renderUserItem = ({ item }) => (
        <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.lightgray }}>
            <Text>{item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.isAdmin ? 'admin' : 'user'}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <SelectDropdown
                    data={['admin', 'user']}
                    defaultValue={item.isAdmin ? 'admin' : 'user'}
                    onSelect={(selectedItem) => updateUserRole(item._id, selectedItem === 'admin')}
                />
                <Button title="Delete User" color={Colors.red} onPress={() => deleteUser(item._id)} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={item => item._id}
            />
        </View>
    );
};

export default UserList;
