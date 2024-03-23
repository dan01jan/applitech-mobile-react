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
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import baseURL from "../../../assets/common/baseurl";
import EasyButton from "../../../Shared/StyledComponents/EasyButton";
import { useNavigation } from "@react-navigation/native"

const { height, width } = Dimensions.get("window");

const Brands = (props) => {
    const [brandList, setBrandList] = useState([]);
    const [brandFilter, setBrandFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()

    const ListHeader = () => {
        return (
            <View style={styles.listHeader}>
                <View style={styles.headerItem}></View>
              
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Name</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Description</Text>
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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, [fetchData]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <EasyButton
                    secondary
                    medium
                    onPress={() => navigation.navigate("BrandForm")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Add Brand</Text>
                </EasyButton>
            </View>

            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : (
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListHeaderComponent={ListHeader}
                    data={brandFilter}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <View style={[styles.itemColumn, { flex: 1 }]}></View>
                            <View style={[styles.itemColumn, { flex: 1 }]}></View>
                            <View style={[styles.itemColumn, { flex: 2 }]}>
                                <Text>{item.name}</Text>
                            </View>
                            <View style={[styles.itemColumn, { flex: 4 }]}>
                                <Text>{item.description}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("Item id:", item.id);
                                    deleteBrand(item.id);
                                }}
                                style={styles.deleteButton}
                            >
                                <Icon name="trash" size={20} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.deleteButton, { right: 40 }]}
                            onPress={() => {
                                console.log("Edit item with id:", item.id);
                                navigation.navigate("BrandForm", { item });
                            }}
                        >
                            <Icon name="pencil" size={20} color="blue" />
                        </TouchableOpacity>

                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro',
    },
    headerItem: {
        margin: 3,
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        position: 'relative',
    },
    itemColumn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        marginLeft: 4,
        color: 'white',
    },
});

export default Brands;
