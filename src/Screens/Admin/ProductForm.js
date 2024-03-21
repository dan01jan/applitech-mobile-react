import React, { useState, useEffect } from "react"
import { Box, ScrollView, FormControl, VStack, Input, Select, View } from 'native-base';
import Colors from '../../color';
import Buttone from '../../Components/Buttone';
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"

const Inputs = [
    {
        label: 'BRAND',
        type: 'text',
    },
    {
        label: 'NAME',
        type: 'text',
    },
    {
        label: 'PRICE',
        type: 'text',
    },
    {
        label: 'COUNT IN STOCK',
        type: 'text',
    },
    {
        label: 'DESCRIPTION',
        type: 'text',
    },
    {
        label: 'CATEGORY', // New dropdown input
        type: 'dropdown', // Specify type as dropdown
        options: ['Category 1', 'Category 2', 'Category 3'], // Example options for the dropdown
    },
];

const ProductForm = (props) => {
    const [image, setImage] = useState('');
    const [mainImage, setMainImage] = useState();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            console.log(result.assets)
            setMainImage(result.assets[0].uri);
            setImage(result.assets[0].uri);
        }
    }


    return (
        <Box h="full" bg={Colors.white} px={5}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space={10} mt={5} pb={10}>
                <Text style={styles.headerText}> Create Product </Text>

                <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: mainImage }} />
                <TouchableOpacity
                    onPress={pickImage}
                    style={styles.imagePicker}>
                    <Icon style={{ color: "white" }} name="camera" />
                </TouchableOpacity>
            </View>
                    {Inputs.map((input, index) => (
                        <FormControl key={index}>
                            <FormControl.Label _text={{ fontSize: '12px', fontWeight: 'bold' }}>
                                {input.label}
                            </FormControl.Label>
                            {input.type === 'dropdown' ? ( // Render dropdown if type is dropdown
                                <Select
                                    placeholder="Select"
                                    borderWidth={0}
                                    bg={Colors.lightpink}
                                    borderColor={Colors.main}
                                    py={4}
                                    color={Colors.main}
                                    fontSize={15}
                                    _focus={{
                                        bg: Colors.lightpink,
                                        borderColor: Colors.main,
                                        borderWidth: 1,
                                    }}>
                                    {input.options.map((option, optionIndex) => (
                                        <Select.Item key={optionIndex} label={option} value={option} />
                                    ))}
                                </Select>
                            ) : (
                                <Input
                                    borderWidth={0}
                                    bg={Colors.lightpink}
                                    borderColor={Colors.main}
                                    py={4}
                                    type={input.type}
                                    color={Colors.main}
                                    fontsize={15}
                                    _focus={{
                                        bg: Colors.lightpink,
                                        borderColor: Colors.main,
                                        borderWidth: 1,
                                    }}
                                />
                            )}
                        </FormControl>
                    ))}
                    <Buttone bg={Colors.main} color={Colors.white}>
                        Create Product
                    </Buttone>
                </VStack>
            </ScrollView>
        </Box>
    );
};

const styles = StyleSheet.create({
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
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    imageContainer: {
        width: '85%',
        height: '20%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: -20,
        marginBottom: 8,
        borderStyle: "solid",
        borderWidth: 8,
        borderRadius: 20, // Changed from 100 to 20 for a square shape
        borderColor: "#E0E0E0",
        // Removed elevation to remove shadow
    },
    image: {
        width: "100%",
        height: "100%",
        // Removed borderRadius to make the image square
    },
    imagePicker: {
        alignSelf: "center", // Align the image picker horizontally
        justifyContent: "center", // Align the image picker vertically
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
})




export default ProductForm;
