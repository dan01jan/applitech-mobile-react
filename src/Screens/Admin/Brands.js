import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    RefreshControl,
    TouchableOpacity
} from "react-native";
import Header from './Header';
import Sidebar from './Sidebar';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import baseURL from "../../../assets/common/baseurl";
import EasyButton from "../../../Shared/StyledComponents/EasyButton";
import { useNavigation } from "@react-navigation/native"
import { Center, HStack, ScrollView } from "native-base";
import Buttone from "../../Components/Buttone";
import Colors from "../../color";


const { height, width } = Dimensions.get("window");

const Brands = (props) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [brandList, setBrandList] = useState([]);
    const [brandFilter, setBrandFilter] = useState([]);
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
        { id: 6, title: 'User', screen: 'UserAdmin' },
      ];

    const ListHeader = () => {
        return (
            <View style={styles.listHeader}>
            <View style={styles.headerItem}>
                <Text style={styles.headerText}>Name</Text>
            </View>
            <View style={styles.headerItem2}>
                <Text style={styles.headerText}>Description</Text>
            </View>
            <View>
                <Text style={styles.headerText}>Action</Text>
            </View>
        </View>
        )
    }

    const deleteBrand = (id) => {
        console.log("Deleting brand with id:", id);
        axios
            .delete(`${baseURL}brands/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const brands = brandFilter.filter((item) => item.id !== id)
                setBrandFilter(brands)
            })
            .catch((error) => console.log(error));
    }

    const fetchData = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("jwt");
            setToken(token);

            const response = await axios.get(`${baseURL}brands`);
            setBrandList(response.data);
            setBrandFilter(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, [fetchData]);

    return (
       
        <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        
        <Header title="Dashboard" onPress={toggleSidebar} />
        {sidebarVisible && <Sidebar items={sidebarItems} />}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECECEC' }}>
            <View style={styles.flatListContainer}>
                <Center>
                    <View style = {styles.brandlistText}>
            <Text style = {styles.brandlist}>Brand List</Text>
            </View>
            </Center>
                
    
                {loading ? (
                    <View style={styles.spinner}>
                        <ActivityIndicator size="large" color="red" />
                    </View>
                ) : (
                    <View style={[styles.tableContainer, { backgroundColor: '#FFDEDE' }]}>
                        <FlatList
    style={styles.flatList}
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    ListHeaderComponent={ListHeader}
    data={brandFilter}
    renderItem={({ item }) => (
        <View style={styles.listItem}>
            <View style={[styles.itemColumn, { flex: 1.5 }]}>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
            <View style={[styles.itemColumn, { flex: 3 }]}>
                <Text style={styles.itemText}>{item.description}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    console.log("Item id:", item.id);
                    deleteBrand(item.id);
                }}
                style={styles.deleteButton}
            >
                <Icon name="trash" size={20} color="#FF3131" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.deleteButton, { right: 40 }]}
                onPress={() => {
                    console.log("Edit item with id:", item.id);
                    navigation.navigate("BrandForm", { item });
                }}
            >
                <Icon name="pencil" size={20} color="#545454" />
            </TouchableOpacity>
        </View>
    )}
    keyExtractor={(item) => item.id.toString()}
/>


                    </View>
                )}
            </View>
        </View>
        <View style = {styles.buttonContainer}>
        <Buttone 
              bg={Colors.main} 
              color={Colors.white} 
              mt={4}
              
             
              onPress={() => navigation.navigate("BrandForm")}
            >
             <HStack>
                  <Icon name="plus" size={20} color={Colors.white} style={styles.icon} />
                  <Text style = {{color: 'white', fontSize: 15}}> Create Brand</Text>
                  </HStack>
            </Buttone>
            </View>
        </View>
    </ScrollView>
    );
    
    
}

const styles = StyleSheet.create({
    brandlist:{
        fontSize: 30 // Change '30' to 30
    },
    itemText: {
        fontSize: 15,  // Change '15' to 15
       
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
        // margin: 3,
        flex: 1,
    },
    headerItem2: {
        // margin: 3,
        flex: 1.5,
    },
    listItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        right: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        // margin: 20,
        alignSelf: 'center',
        // flexDirection: 'row',
        width: '50%'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white',
    },
    headerText: {
        fontSize: 18, // Adjust the font size as needed
        fontWeight: 'bold', // Optional: You can also make the header text bold
    },
      flatList: {
        // Add your styles for FlatList here
    },
    brandlistText: {
        marginTop: '50'
    }
});


export default Brands;
