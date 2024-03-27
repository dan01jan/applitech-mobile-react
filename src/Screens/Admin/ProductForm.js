import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Platform } from "react-native";
import FormContainer from "../../../Shared/Form/FormContainer";
// import Input from "../../../Shared/Form/Input";
import EasyButton from "../../../Shared/StyledComponents/EasyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from "../../../assets/common/baseurl";
import Error from "../../../Shared/Error";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from "@react-navigation/native";
import { Box, Center, Select, ScrollView, VStack, FormControl, Input } from "native-base"
import Colors from "../../color";
import Header from './Header';
import Sidebar from './Sidebar';
import Buttone from '../../Components/Buttone';

const ProductForm = (props) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [item, setItem] = useState(null);
    const [pickerValue, setPickerValue] = useState('');
    const [brands, setBrands] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (!props.route.params) {
                    setItem(null);
                } else {
                    setItem(props.route.params.item);
                    setBrand(props.route.params.item.brand._id);
                    setName(props.route.params.item.name);
                    setPrice(props.route.params.item.price.toString());
                    setDescription(props.route.params.item.description);
                    setCountInStock(props.route.params.item.countInStock.toString());
                    // Populate images state with all image URLs of the product
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
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();

        // Fetch brands from your API and update the brands state
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`${baseURL}brands`);
                setBrands(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchBrands();
    
        return () => {
            // Cleanup function if necessary
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      };
    const pickImages = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!result.cancelled && result.assets.length > 0) {
                // Update the images state with the newly picked images
                const newImages = result.assets.map(asset => asset.uri);
                setImages([...images, ...newImages]);
            }
        } catch (error) {
            console.log('Error picking image:', error);
        }
    };
    
    const sidebarItems = [
        { id: 1, title: 'Home', screen: 'Main' },
        { id: 2, title: 'Dashboard', screen: 'Dashboard' },
        { id: 3, title: 'Product', screen: 'Products' },
        { id: 4, title: 'Brand', screen: 'Brands' },
        { id: 5, title: 'Order', screen: 'OrderAdmin' },
        { id: 6, title: 'User', screen: 'UserAdmin' },
      ];

    const removeImage = (indexToRemove) => {
        const filteredImages = images.filter((_, index) => index !== indexToRemove);
        setImages(filteredImages);
    };

    const renderImage = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => removeImage(item)}>
                <Image style={styles.image} source={{ uri: typeof item === 'string' ? item : item.uri }} />
            </TouchableOpacity>
        );
    };
    

    const onSnapToItem = (index) => {
        if (index >= (item?.images || []).length) {

        }
    };

    const addOrUpdateProduct = () => {
        if (
            name === "" ||
            brand === "" ||
            price === "" ||
            description === "" ||
            countInStock === ""
        ) {
            setError("Please fill in the form correctly")
            return;
        }
    
        let formData = new FormData();
    
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("countInStock", countInStock);
        
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
    
        const url = item ? `${baseURL}products/${item.id}` : `${baseURL}products`;
    
        const request = item ? axios.put : axios.post;
    
        request(url, formData, config)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: item ? "Product successfully updated" : "New Product added",
                        text2: ""
                    });
                    setTimeout(() => {
                        navigation.navigate("Products");
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
            });
    }
    
    return (
        <ScrollView  style = {styles.windowheight}>
      <View style = {styles.windowheight}>
  
          <Header title="Dashboard" onPress={toggleSidebar} />
          {sidebarVisible && <Sidebar items={sidebarItems} />}
            
       
          
          <Center>   
            <FormContainer title={item ? "Update Product" : "Add Product"}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space={6} mt={5}>
                   
                  <View style={styles.carouselContainer}>
                    <Carousel
                      data={item ? item.images : images}
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
                PRICE
                </FormControl.Label>
                  
                  <Input
                   
                  borderWidth={.2} 
                  borderColor={Colors.main} 
                  bg={Colors.lightpink} 
                  py={4}
                  mt = {-5}
                  color={Colors.main}
                  _focus={{
                    bg: Colors.lightpink,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                    placeholder="Price"
                    name="price"
                    id="price"
                    value={price}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPrice(text)}
                  />
                   <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                STOCK
                </FormControl.Label>
                 
                  <Input
               
                  borderWidth={.2} 
                  borderColor={Colors.main} 
                  bg={Colors.lightpink} 
                  py={4}
                  mt = {-5}
                  color={Colors.main}
                  _focus={{
                    bg: Colors.lightpink,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                    placeholder="Stock"
                    name="stock"
                    id="stock"
                    value={countInStock}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setCountInStock(text)}
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
                
                  borderWidth={.2} 
                  borderColor={Colors.main} 
                  bg={Colors.lightpink} 
                  py={4}
                  mt = {-5}
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
                   <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                BRAND
                </FormControl.Label>
                  <Box>
                    
                    <Select
                  
                    borderWidth={.2} 
                    borderColor={Colors.main} 
                    bg={Colors.lightpink} 
                    py={4}
                    mt = {-5}
                    color={Colors.main}
                    _focus={{
                      bg: Colors.lightpink,
                      borderWidth: 1,
                      borderColor: Colors.main,
                    }}
                      minWidth="90%" placeholder="Select your Brand"
                      selectedValue={pickerValue}
                      onValueChange={(e) => [setPickerValue(e), setBrand(e)]}
                    >
                      {brands.map((b, index) => {
                        return (
                          <Select.Item
                            key={b.id}
                            label={b.name}
                            value={b.id}
                          />
                        )
                      })}
                    </Select>
                  </Box>
                  {/* Display error message if there's an error */}
                  {error && <Error message={error} />}
                  {/* Button to add/update product */}
                  
                   
                    <Buttone 
              bg={Colors.main} 
              color={Colors.white} 
              mt={4}
             
              onPress={() => checkOut()}
            >
             <Text style={styles.buttonText}>
                        {item ? "Update" : "Confirm"}
                      </Text>
            </Buttone>
                 
                </VStack>
              </ScrollView>
              </FormContainer>
          </Center>
          
        {/* </View> */}
      {/* </ScrollView> */}
     
      </View>
      </ScrollView>
        
    );
    
}

const styles = StyleSheet.create({
    // scrollContainer: {
    //     height: 00, // Set the desired fixed height
    //   },
    windowheight:{
        height: 1100
    },
    carouselContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
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
    
    buttonText: {
        color: "white"
    }
});

export default ProductForm;
