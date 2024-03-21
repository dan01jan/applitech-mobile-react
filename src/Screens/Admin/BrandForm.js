import React, { useState, useEffect } from "react"
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native"
import { Box, Select } from "native-base"
import FormContainer from "../../../Shared/Form/FormContainer"
import Input from "../../../Shared/Form/Input"
import EasyButton from "../../../Shared/StyledComponents/EasyButton"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from "../../../assets/common/baseurl"
import Error from "../../../Shared/Error"
import axios from "axios"
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from "@react-navigation/native"
import mime from "mime";
import Carousel from 'react-native-snap-carousel';

const BrandForm = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [item, setItem] = useState(null);
    const navigation = useNavigation()

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (!props.route.params) {
                    setItem(null);
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
    }, []);

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

    const removeImage = (image) => {
        const newImages = images.filter((img) => img !== image);
        setImages(newImages);
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
            console.log(item)
            axios
                .put(`${baseURL}brands/${item.id}`, formData, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Brand successfuly updated",
                            text2: ""
                        });
                        setTimeout(() => {
                            navigation.navigate("Brands");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })
        } else {
            axios
                .post(`${baseURL}brands`, formData, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Brand added",
                            text2: ""
                        });
                        setTimeout(() => {
                            navigation.navigate("Main");
                        }, 500)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })

        }

    }

    const updateBrand = () => {
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
            console.log(item)
            axios
                .put(`${baseURL}brands/${item.id}`, formData, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Brand successfuly updated",
                            text2: ""
                        });
                        setTimeout(() => {
                            navigation.navigate("Brands");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })
        } else {
            axios
                .post(`${baseURL}brands`, formData, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Brand added",
                            text2: ""
                        });
                        setTimeout(() => {
                            navigation.navigate("Main");
                        }, 500)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })

        }

    }


    return (
        <FormContainer title={item ? "Update Brand" : "Add Brand"}>
            <View style={styles.carouselContainer}>
                <Carousel
                   //data={(item?.images || []).concat(images)}
                    // Concatenate existing images with new images
                    data={item ? item.images : images}
                    renderItem={renderImage}
                    sliderWidth={300}
                    itemWidth={300}
                    loop={true}
                    onSnapToItem={onSnapToItem}
                    activeSlideAlignment="start" // Ensures newly added image is visible
                    activeSlideOffset={10} // Adjust the offset based on your preference
                />

                <TouchableOpacity onPress={pickImages} style={styles.imagePicker}>
                    <Icon style={{ color: "white" }} name="camera" />
                </TouchableOpacity>
            </View>
    
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Name</Text>
            </View>
            <Input
                placeholder="Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
           
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Description</Text>
            </View>
            <Input
                placeholder="Description"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            {/* Display error message if there's an error */}
            {error && <Error message={error} />}
            {/* Button to add/update product */}
            <View style={styles.buttonContainer}>
                <EasyButton
                    large
                    primary
                    onPress={item ? updateBrand : addBrand}
                >
                    <Text style={styles.buttonText}>
                        {item ? "Update" : "Confirm"}
                    </Text>
                </EasyButton>
            </View>
        </FormContainer>


    )

}


const styles = StyleSheet.create({
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
    }
})


export default BrandForm;
