import React, { useContext, useState, useEffect } from 'react';
import { Box, CheckIcon, FormControl, Heading, VStack, Select, TextArea } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../color';
import Buttone from './Buttone';
import axios from 'axios';
import baseURL from '../../assets/common/baseurl';
import Rating from './Rating';
import Message from './Notifications/Message';
import Icon from "react-native-vector-icons/FontAwesome";
import EditReviewModal from './EditReviewModal';
import AuthGlobal from '../../Context/Store/AuthGlobal';
import { useNavigation } from "@react-navigation/native";

const Review = ({ productId, editable = true }) => {
    const [ratings, setRatings] = useState('');
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [error, setError] = useState('');
    const context = useContext(AuthGlobal);
    const navigation = useNavigation();

    useEffect(() => {
        if (!context.stateUser.isAuthenticated) {
            navigation.navigate("Login");
        } else {
            fetchReviews();
        }
    }, [context.stateUser.isAuthenticated]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${baseURL}products/${productId}/reviews`);
            setReviews(response.data.reviews || []);
            setError('');
        } catch (error) {
            setError('Error fetching reviews. Please try again later.');
            console.error('Error fetching reviews:', error);
        }
    };

    const submitReview = async () => {
        if (!ratings || !comment) {
            setError('Rating and comment are required.');
            return;
        }
    
        try {
            await axios.post(`${baseURL}products/${productId}/reviews`, {
                userId: context.stateUser.user.userId,
                ratings,
                comment,
            }, {
                headers: {
                    Authorization: `Bearer ${context.stateUser.userToken}`
                }
            });            
    
            setRatings('');
            setComment('');
            fetchReviews(); // Refresh reviews after submission
            setError('');
        } catch (error) {
            setError('Error submitting review. Please try again later.');
            console.error('Error submitting review:', error);
        }
    };
    

    const openEditModal = (review) => {
      setEditingReview(review);
  };

  const closeEditModal = () => {
      setEditingReview(null);
  };

  const deleteReview = async (reviewId, productId, reviews, setReviews, setError) => {
    try {
        // Retrieve the token from wherever it's stored in your application (e.g., context, AsyncStorage)
        const token = await AsyncStorage.getItem('jwt');

        // Prepare the request configuration object with the token in the Authorization header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        // Log the request headers (config)
        console.log('Request headers:', config.headers);

        // Send the delete request with the configured headers
        await axios.delete(`${baseURL}products/${productId}/reviews/${reviewId}`, config);

        // Remove the deleted review from the state
        const updatedReviews = reviews.filter(review => review._id !== reviewId);
        setReviews(updatedReviews);
        setError('');
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
            setError('Error deleting review. Please try again later.');
        } else if (error.request) {
            console.error('Request Error:', error.request);
            setError('Error deleting review. Please check your internet connection.');
        } else {
            console.error('Error:', error.message);
            setError('An unexpected error occurred. Please try again later.');
        }
    }
};

  const submitEdit = async (newRatings, newComment) => {
    if (!editingReview || !editingReview._id) {
        console.error("Editing review ID is undefined.");
        setError("An error occurred. Please try editing the review again.");
        return;
    }

    try {
        const response = await axios.put(`${baseURL}products/${productId}/reviews/${editingReview._id}`, {
            ratings: newRatings,
            comment: newComment,
        }, {
            headers: {
                Authorization: `Bearer ${context.stateUser.userToken}`, // Assuming you're using tokens for authorization
            },
        });

        console.log('Review updated:', response.data);
        const updatedReviews = reviews.map(review => {
            if (review._id === editingReview._id) {
                return { ...review, ratings: newRatings, comment: newComment };
            }
            return review;
        });

        setReviews(updatedReviews);
        closeEditModal();
        setError('');
    } catch (error) {
        console.error('Error updating review:', error.response ? error.response.data : error.message);
        setError('Error updating review. Please try again later.');
    }
};

    // Render the component UI
    return (
        <Box my={9}>
            <Heading bold fontSize="md" mb={2}>REVIEW</Heading>
            {error ? <Message color={colors.red} bg={colors.white}>{error}</Message> : null}
            {reviews.map((review, index) => (
                <Box p={3} bg={colors.lightpink} mt={5} rounded="md" flexDirection="row" alignItems="center" key={index}>
                    <Box flex={1}>
                        <Heading fontSize="md" color={colors.black}>{review.name}</Heading>
                        <Rating value={review.ratings} />
                        <Message color={colors.black} bg={colors.white} size="sm">{review.comment}</Message>
                    </Box>
                    {editable && (
                      <Box ml={2} mt={3}>
                          <Icon name="pencil" size={20} color="gray" onPress={() => setEditingReview(review)} />
                          <Icon name="trash" size={20} color="red" onPress={() => deleteReview(review._id, productId, reviews, setReviews, setError)} />
                      </Box>
                    )}
                </Box>
            ))}
            {editable && (
                <>
                    <EditReviewModal
                        isOpen={!!editingReview}
                        onClose={closeEditModal}
                        initialRatings={editingReview?.ratings || ''}
                        initialComment={editingReview?.comment || ''}
                        onSubmit={submitEdit}
                    />
                    <Box mt={6}>
                        <Heading fontSize={15} bold mb={4}>WRITE A REVIEW</Heading>
                        <VStack space={6}>
                            <FormControl>
                                <FormControl.Label _text={{ fontSize: '12px', fontWeight: 'bold' }}>Rating</FormControl.Label>
                                <Select
                                    bg={colors.lightPink}
                                    borderWidth={0}
                                    rounded={5}
                                    py={3}
                                    placeholder="Choose Rate"
                                    _selectedItem={{
                                        bg: colors.lightpink,
                                        endIcon: <CheckIcon size={3} />,
                                    }}
                                    value={ratings}
                                    onValueChange={(value) => setRatings(value)}
                                >
                                    <Select.Item label="1 - Poor" value="1" />
                                    <Select.Item label="2 - Fair" value="2" />
                                    <Select.Item label="3 - Good" value="3" />
                                    <Select.Item label="4 - Great" value="4" />
                                    <Select.Item label="5 - Excellent" value="5" />
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{ fontSize: "12px", fontWeight: "bold" }}>Comment</FormControl.Label>
                                <TextArea
                                    h={20}
                                    w="full"
                                    placeholder="Write your comment"
                                    borderWidth={0}
                                    bg={colors.lightpink}
                                    py={4}
                                    value={comment}
                                    onChangeText={(value) => setComment(value)}
                                    _focus={{
                                        bg: colors.lightpink
                                    }}
                                />
                            </FormControl>
                            <Buttone bg={colors.main} color={colors.white} onPress={submitReview}>SUBMIT</Buttone>
                        </VStack>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Review;
