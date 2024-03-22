import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
    Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import EasyButton from "../../../Shared/StyledComponents/EasyButton";

var { width } = Dimensions.get("window");

const ListItem = ({ item, index, deleteProduct }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigation = useNavigation();

    const handleDelete = () => {
        setModalVisible(false);
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this product?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: confirmDelete }
            ],
            { cancelable: false }
        );
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteProduct(item._id);
            setIsDeleting(false);
            Alert.alert("Success", "Product was deleted successfully");
        } catch (error) {
            setIsDeleting(false);
            Alert.alert("Error", "Failed to delete the product");
            console.error("Failed to delete product:", error);
        }
    };

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                alignSelf: "flex-end",
                                position: "absolute",
                                top: 5,
                                right: 10
                            }}
                        >
                            <Icon name="close" size={20} />
                        </TouchableOpacity>

                        <EasyButton
                            medium
                            secondary
                            onPress={() => {
                                navigation.navigate("ProductForm", { item });
                                setModalVisible(false);
                            }}
                            title="Edit"
                        >
                            <Text style={styles.textStyle}>Edit</Text>
                        </EasyButton>
                        <EasyButton
                            medium
                            danger
                            onPress={handleDelete}
                            title="Delete"
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </EasyButton>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() => navigation.navigate("Product Detail", { item })}
                onLongPress={() => setModalVisible(true)}
                style={[
                    styles.container,
                    {
                        backgroundColor: index % 2 == 0 ? "white" : "gainsboro"
                    }
                ]}
            >
                <Image
                    source={{ uri: item.image }}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                </Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
                    {item.brand ? item.brand.name : ""}
                </Text>
                <Text style={styles.item}>$ {item.price}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 5,
        width: width
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 20,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    }
});

export default ListItem;
