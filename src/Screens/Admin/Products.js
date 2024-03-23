import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    RefreshControl,

} from "react-native";
import { Input, VStack, Heading, Box, ScrollView, Center, HStack } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import { Searchbar } from 'react-native-paper';
import ListItem from "./ListItem"
import Header from './Header';
import Sidebar from './Sidebar';
import axios from "axios"
import baseURL from "../../../assets/common/baseurl"
import AsyncStorage from '@react-native-async-storage/async-storage'
var { height, width } = Dimensions.get("window")
import EasyButton from "../../../Shared/StyledComponents/EasyButton";
import { useNavigation } from "@react-navigation/native"
import Buttone from "../../Components/Buttone";
import Colors from "../../color";   
const Products = (props) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [productList, setProductList] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()

    const sidebarItems = [
        { id: 1, title: 'Home', screen: 'Main' },
        { id: 2, title: 'Dashboard', screen: 'Dashboard' },
        { id: 3, title: 'Product', screen: 'Products' },
        { id: 4, title: 'Brand', screen: 'Brands' },
        { id: 5, title: 'Order', screen: 'OrderAdmin' },
      ];

      const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      };
    const ListHeader = () => {
        return (
            <View style={styles.listHeader}>
            {/* <View style={styles.headerItem}>
                <Text style={styles.headerText}>Image</Text>
            </View> */}
            <View style={styles.headerItem2}>
                <Text style={styles.headerText}>Name</Text>
            </View>
            <View style={styles.headerItem3}>
                <Text style={styles.headerText}>Price</Text>
                
            </View>
            <View style={styles.headerItem4}>
                <Text style={styles.headerText}>Action</Text>
            </View>
        </View>
        )
    }
    const searchProduct = (text) => {
        if (text === "") {
            setProductFilter(productList)
        }
        setProductFilter(
            productList.filter((i) =>
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const deleteProduct = (id) => {
        axios
            .delete(`${baseURL}products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id)
                setProductFilter(products)
            })
            .catch((error) => console.log(error));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            axios
                .get(`${baseURL}products`)
                .then((res) => {
                    // console.log(res.data)
                    setProductList(res.data);
                    setProductFilter(res.data);
                    setLoading(false);
                })
            setRefreshing(false);
        }, 2000);
    }, []);
    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        console.log(res.data)
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )
    return (
     
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
      
                
          <Header title="Dashboard" onPress={toggleSidebar} />
          {sidebarVisible && <Sidebar items={sidebarItems} />}
          
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECECEC' }}>
        <View style={styles.flatListContainer}>
        <Center>
                    <View style = {styles.brandlistText}>
            <Text style = {styles.brandlist}>Product List</Text>
            </View>
            </Center>
          
            {/* <Searchbar width="80%"
                placeholder="Search"
                onChangeText={(text) => searchProduct(text)}
            //   value={searchQuery}
            /> */}
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : (
                <View style={[styles.tableContainer, { backgroundColor: '#FFDEDE' }]}>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={styles.flatList}
                ListHeaderComponent={ListHeader}
                data={productFilter}
                renderItem={({ item, index }) => (
                    <ListItem
    item={item}
    index={index}
    deleteProduct={deleteProduct}
    navigation={navigation} // Pass the navigation prop here
/>
                )}
                keyExtractor={(item) => item.id}
            />
             </View>
            )}

<View style = {styles.buttonContainer}>
        <Buttone 
              bg={Colors.main} 
              color={Colors.white} 
              mt={4}
              
             
              onPress={() => navigation.navigate("ProductForm")}
            >
                <HStack>
                  <Icon name="plus" size={20} color={Colors.white} style={styles.icon} />
                  <Text style = {{color: 'white', fontSize: 15}}> Create Product</Text>
                  </HStack>
            </Buttone>
            </View>
       </View>
       </View>
        
        </View>
        
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    brandlist:{
        fontSize: 30 // Change '30' to 30
    },
    flatListContainer: {
        flex: 1,
        width: '90%',
        margin: 5,
       
    },
    tableContainer: {
        borderRadius: 10,
        marginTop: 20,
        overflow: 'hidden', // Ensure contents do not overflow rounded borders
        // flex: 1,
    },
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        fontSize: 10,  // Change '10' to 10
        backgroundColor: '#F46868', // Background color added here
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    headerItem2: {
        // margin: 3,
        flex: 1.5,
    },
    headerItem3: {
        // margin: 3,
        flex:0.9,
    },
    headerItem4: {
        // margin: 3,
        flex: .5,
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        // marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        alignSelf: 'center',
        // flexDirection: 'row',
        width: '50%'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    },
    brandlistText: {
        marginTop: '50'
    },
    headerText: {
        fontSize: 18, // Adjust the font size as needed
        fontWeight: 'bold', // Optional: You can also make the header text bold
    },

})

export default Products;