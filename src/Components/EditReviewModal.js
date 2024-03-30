import React, { useState } from 'react';
import { Modal, VStack, FormControl, Heading, Select, TextArea, Button, CheckIcon } from 'native-base';
import colors from '../color';

const EditReviewModal = ({ isOpen, onClose, initialRatings, initialComment, onSubmit }) => {
    const [ratings, setRatings] = useState(initialRatings);
    const [comment, setComment] = useState(initialComment);

    const handleSubmit = () => {
        onSubmit(ratings, comment);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content>
                <Modal.Header>
                    <Heading> Edit Review</Heading>
                </Modal.Header>
                <Modal.Body>
                    <VStack space={4}>
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
                                onChangeText={(value) => setComment(value)} // Corrected onChangeText prop
                                _focus={{
                                    bg: colors.lightpink
                                }}
                            />
                        </FormControl>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button onPress={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default EditReviewModal;
