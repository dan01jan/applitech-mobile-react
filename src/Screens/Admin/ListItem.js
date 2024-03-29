import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

var { width } = Dimensions.get("window");

const ListItem = ({ item, deleteProduct, navigation }) => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText2}>₱ {item.price}</Text>
          
            {/* <View style={styles.actionButtons}>
            <Icon
                    name="pencil"
                    size={20}
                    color="#545454"
                    onPress={() => {
                        navigation.navigate("ProductForm", { item });
                        // setModalVisible(false);
                    }}
                    style={styles.actionButton}
                />
                <Icon
                    name="trash"
                    size={20}
                    color="#FF3131"
                    onPress={() => {
                        console.log("Item id:", item._id);
                        deleteProduct(item._id);
                    }}
                    style={styles.actionButton1}
                />
               
            </View> */}
            <TouchableOpacity
                onPress={() => {
                    console.log("Item id:", item._id);
                    deleteProduct(item._id);
                    }}
                style={styles.deleteButton}
            >
                <Icon name="trash" size={20} color="#FF3131" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.deleteButton, { right: 40 }]}
                onPress={() => {
                    console.log("Edit item with id:", item.id);
                    navigation.navigate("ProductForm", { item });
                }}
            >
                <Icon name="pencil" size={20} color="#545454" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    itemText: {
        fontSize: 15,
        flex: 0.52,
    },
    itemText2: {
        fontSize: 15,
        flex: 0.3,
    },
    actionButtons: {
        flexDirection: "row",
    },
    actionButton: {
       
        marginRight: 5
    },
    actionButton1: {
       
    //   marginRight: 5
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
});

export default ListItem;
