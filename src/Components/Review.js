import React, { useState, useEffect } from 'react';
import { Box, CheckIcon, FormControl, Heading, VStack, Select, TextArea } from 'native-base';
import colors from '../color';
import Buttone from './Buttone';
import axios from 'axios';
import baseURL from '../../assets/common/baseurl'; // Importing baseURL
import Rating from './Rating';
import Message from './Notifications/Message';
import Icon from "react-native-vector-icons/FontAwesome";
import EditReviewModal from './EditReviewModal'; // Import the modal component

const Review = (props) => {
    const [ratings, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${baseURL}products/${props.productId}/reviews`);
            setReviews(response.data.reviews); // Assuming response.data.reviews is an array of reviews
        } catch (error) {
            console.error('Error fetching reviews:', error.response.data);
        }
    };

    const openEditModal = (review) => {
        setEditingReview(review);
    };

    const closeEditModal = () => {
        setEditingReview(null);
    };

    const submitEdit = async (newRatings, newComment) => {
        try {
            const response = await axios.put(`${baseURL}products/${props.productId}/reviews/${editingReview._id}`, {
                ratings: newRatings,
                comment: newComment
            });
            console.log('Review updated:', response.data);
            // Update the reviews state with the updated review
            const updatedReviews = reviews.map(review => {
                if (review._id === editingReview._id) {
                    return { ...review, ratings: newRatings, comment: newComment };
                } else {
                    return review;
                }
            });
            setReviews(updatedReviews);
        } catch (error) {
            console.error('Error updating review:', error.response.data);
        }
        closeEditModal();
    };
  
    const submitReview = async () => {
        try {
            if (!ratings || !comment) {
                console.error('Rating and comment are required');
                return;
            }

            const productId = props.productId;

            const response = await axios.post(`${baseURL}products/${productId}/reviews`, {
                ratings,
                comment
            });

            console.log('Review submitted:', response.data);

            setRating('');
            setComment('');

            // Assuming response.data.product contains updated reviews
            setReviews(response.data.product.reviews);
        } catch (error) {
            console.error('Error submitting review:', error.response.data);
        }
    };

    return (
        <Box my={9}>
            <Heading bold fontSize={15} mb={2}>
                REVIEW
            </Heading>
            {reviews.map((review, index) => (
                <Box p={3} bg={colors.lightpink} mt={5} rounded={5} flexDirection="row" alignItems="center" key={index}>
                    <Box flex={1}>
                        <Heading fontSize={15} color={colors.black}>
                            Default User
                        </Heading>
                        <Rating value={review.ratings} />
                        <Message color={colors.black} bg={colors.white} size={10}>
                            {review.comment}
                        </Message>
                    </Box>
                    <Box ml={2} mt={3}>
                        <Icon name="pencil" size={20} color="gray" onPress={() => openEditModal(review)} />
                    </Box>
                </Box>
            ))}
            <EditReviewModal
                isOpen={!!editingReview}
                onClose={closeEditModal}
                initialRatings={editingReview?.ratings || ''}
                initialComment={editingReview?.comment || ''}
                onSubmit={submitEdit}
            />
            <Box mt={6}>
                <Heading fontSize={15} bold mb={4}>
                    WRITE A REVIEW
                </Heading>
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
                            onValueChange={(value) => setRating(value)}
                        >
                            <Select.Item label="1 - Poor" value="1" />
                            <Select.Item label="2 - Fair" value="2" />
                            <Select.Item label="3 - Good" value="3" />
                            <Select.Item label="4 - Great" value="4" />
                            <Select.Item label="5 - Excellent" value="5" />
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                fontSize: "12px",
                                fontWeight: "bold"
                            }}>
                            Comment
                        </FormControl.Label>
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
                    <Buttone bg={colors.main} color={colors.white} onPress={submitReview}>
                        SUBMIT
                    </Buttone>
                </VStack>
            </Box>
        </Box>
    );
};

export default Review;
