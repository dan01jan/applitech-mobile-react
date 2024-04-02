import React, { useState, useEffect } from "react"
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native"
import { Box, Center, Select, ScrollView, VStack, FormControl, Input  } from "native-base"
import FormContainer from "../../../Shared/Form/FormContainer"
import EasyButton from "../../../Shared/StyledComponents/EasyButton"
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from "../../../assets/common/baseurl"
import Error from "../../../Shared/Error"
import axios from "axios"
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from "@react-navigation/native"
import mime from "mime";
import Carousel from 'react-native-snap-carousel';
import Colors from "../../color";
import Header from './Header';
import Sidebar from './Sidebar';
import Buttone from '../../Components/Buttone';
import Toast from 'react-native-toast-message'; 

const BrandForm = (props) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [item, setItem] = useState(null);
    const navigation = useNavigation()
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      };
    const sidebarItems = [
        { id: 1, title: 'Home', screen: 'Main' },
        { id: 2, title: 'Dashboard', screen: 'Dashboard' },
        { id: 3, title: 'Product', screen: 'Products' },
        { id: 4, title: 'Brand', screen: 'Brands' },
        { id: 5, title: 'Order', screen: 'OrderAdmin' },
        { id: 6, title: 'User', screen: 'UserAdmin' },
      ];
    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (!props.route.params) {
                    setItem(null);
                    setImages([]); // Set images to an empty array if params are not defined
                } else {
                    setItem(props.route.params.item);
                    setName(props.route.params.item.name);
                    setDescription(props.route.params.item.description);
                    setImages(props.route.params.item.images.map(image => image.url));
                }
                const token = await AsyncStorage.getItem("jwt");
                setToken(token);
            } catch (error) {
                console.log(error);
            }
        };
    
        retrieveToken();
    
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
    
        return () => {
    
        };
    }, [props.route.params]); // Make sure to include props.route.params in the dependency array
    

    const pickImages = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!result.canceled && result.assets.length > 0) {
                // Update the images state with the newly picked images
                const newImages = result.assets.map(asset => asset.uri);
                setImages([...images, ...newImages]);
            }
        } catch (error) {
            console.log('Error picking image:', error);
        }
    };
    

    // const removeImage = (indexToRemove) => {
    //     const filteredImages = images.filter((_, index) => index !== indexToRemove);
    //     setImages(filteredImages);
    // }

    const renderImage = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => removeImage(index)}>
                <Image style={styles.image} source={{ uri: item }} />
            </TouchableOpacity>
        );
    };

    const removeImage = (indexToRemove) => {
        const filteredImages = images.filter((_, index) => index !== indexToRemove);
        setImages(filteredImages);
    };
    
    

    const onSnapToItem = (index) => {
        if (index >= (item?.images || []).length) {

        }
    };



    const addBrand = () => {
        if (
            name === "" ||
            description === ""
        ) {
            setError("Please fill in the form correctly")
        }

        let formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        images.forEach((image, index) => {
            if (image) {
                let newImageUri = "file:///" + image.split("file:/").join("");
                formData.append("images", {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri.split("/").pop()
                });
            }
        });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
        if (item !== null) {
            axios
                .put(`${baseURL}brands/${item.id}`, formData, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            type: "success",
                            text1: "Brand successfully updated"
                        });
                        setTimeout(() => {
                            navigation.navigate("Brands");
                        }, 2000); // Display the toast for 2 seconds before navigating
                    }
                })
                .catch((error) => {
                    Toast.show({
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    });
                })
        } else {
            axios
                .post(`${baseURL}brands`, formData, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            type: "success",
                            text1: "New Brand added"
                        });
                        setTimeout(() => {
                            navigation.navigate("Brands");
                        }, 2000); // Display the toast for 2 seconds before navigating
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Toast.show({
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    });
                })
        }
    

    }

    const updateBrand = () => {
        if (name === "" || description === "") {
            setError("Please fill in the form correctly");
            return;
        }
    
        let formData = new FormData();
    
        formData.append("name", name);
        formData.append("description", description);
        images.forEach((image, index) => {
            if (image) {
                let newImageUri = "file:///" + image.split("file:/").join("");
                formData.append("images", {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri.split("/").pop(),
                });
            }
        });
    
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };
    
        axios
        .put(`${baseURL}brands/${item.id}`, formData, config)
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                Toast.show({
                    type: "success",
                    text1: "Brand successfully updated"
                });
                setTimeout(() => {
                    navigation.navigate("Brands");
                }, 2000); // Display the toast for 2 seconds before navigating
            }
        })
        .catch((error) => {
            Toast.show({
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
            });
        });
    };
    
    


    return (
        <ScrollView style={styles.windowheight} showsVerticalScrollIndicator={false}>
    <View style={styles.windowheight}>
        <Header title="Dashboard" />
        <Center>
            <FormContainer title={item ? "Update Brand" : "Add Brand"}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <VStack space={6} mt={5}>
                        <View style={styles.carouselContainer}>
                            <Carousel
                                data={(item?.images || []).concat(images)}
                                renderItem={renderImage}
                                sliderWidth={300}
                                itemWidth={300}
                                loop={true}
                                onSnapToItem={onSnapToItem}
                                activeSlideAlignment="start"
                                activeSlideOffset={10}
                            />
                            <TouchableOpacity onPress={pickImages} style={styles.imagePicker}>
                                <Icon style={{ color: "white" }} name="camera" />
                            </TouchableOpacity>
                        </View>
                        <FormControl.Label
                            _text={{
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}
                        >
                            NAME
                        </FormControl.Label>
                        <Input
                            borderWidth={0.2} 
                            borderColor={Colors.main} 
                            bg={Colors.lightpink} 
                            py={4}
                            mt={-5}
                            color={Colors.main}
                            _focus={{
                                bg: Colors.lightpink,
                                borderWidth: 1,
                                borderColor: Colors.main,
                            }}
                            placeholder="Name"
                            name="name"
                            id="name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <FormControl.Label
                            _text={{
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}
                        >
                            DESCRIPTION
                        </FormControl.Label>
                        <Input
                            borderWidth={0.2} 
                            borderColor={Colors.main} 
                            bg={Colors.lightpink} 
                            py={4}
                            mt={-5}
                            color={Colors.main}
                            _focus={{
                                bg: Colors.lightpink,
                                borderWidth: 1,
                                borderColor: Colors.main,
                            }}
                            placeholder="Description"
                            name="description"
                            id="description"
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                        {error && <Error message={error} />}
                        <Buttone 
                            bg={Colors.main} 
                            color={Colors.white} 
                            mt={4}
                            onPress={item ? updateBrand : addBrand}
                        >
                            <Text style={styles.buttonText}>
                                {item ? "Update" : "Confirm"}
                            </Text>
                        </Buttone>
                    </VStack>
                </ScrollView>
            </FormContainer>
            <View style={styles.toastContainer}>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
        </Center>
    </View>
</ScrollView>

    )

}


const styles = StyleSheet.create({
    windowheight:{
        height: 1100
    },
    carouselContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: "100%",
        height: "100%",
        borderStyle: "solid",
        borderWidth: 20,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
    toastContainer: {
        position: 'absolute',
        top: 20, // Adjust this value as needed
        width: '100%',
        paddingHorizontal: 20,
        zIndex: 1,
    },
})


export default BrandForm;
