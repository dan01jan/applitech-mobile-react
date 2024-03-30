import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'
import baseURL from "../../../assets/common/baseurl";
import { useFocusEffect } from '@react-navigation/native'
import OrderCard from "../../../Shared/OrderCard";
import Header from './Header';
import Sidebar from './Sidebar';
import { ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native"

const Orders = (props) => {
    const [orderList, setOrderList] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigation = useNavigation()
    
    const sidebarItems = [
        { id: 1, title: 'Home', screen: 'Main', icon: 'home' },
        { id: 2, title: 'Dashboard', screen: 'Dashboard', icon: 'dashboard' },
        { id: 3, title: 'Product', screen: 'Products', icon: 'shopping-cart' },
        { id: 4, title: 'Brand', screen: 'Brands', icon: 'folder' },
        { id: 5, title: 'Order', screen: 'OrderAdmin', icon: 'list-alt' },
        { id: 6, title: 'User', screen: 'UserAdmin', icon: 'user' },
      ];

      const handleSidebarItemClick = (screen) => {
        navigation.navigate(screen); // Navigate to the screen defined in the item object
      };

    useFocusEffect(
        useCallback(
            () => {
                getOrders();
                return () => {
                    setOrderList([]); // Clear orderList on component unmount
                };
            },
            []
        )
    );

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const getOrders = () => {
        axios.get(`${baseURL}orders`)
            .then((response) => {
                setOrderList(response.data);
            })
            .catch((error) => console.log(error));
    };

    const handleSidebarItemPress = (screen) => {
        // Navigate to the selected screen
        props.navigation.navigate(screen);
        // Close sidebar
        setSidebarVisible(false);
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
            <Header title="Dashboard" onPress={toggleSidebar} />
          {sidebarVisible && <Sidebar items={sidebarItems} onPressItem={handleSidebarItemClick} />}
                <View>
                    <FlatList 
                        data={orderList}
                        renderItem={({ item }) => <OrderCard item={item} />}
                        keyExtractor={(item) => item.id.toString()}    
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Orders;
