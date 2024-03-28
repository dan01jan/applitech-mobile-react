import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';

const FloatingChatButton = ({ steps }) => {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentStepId, setCurrentStepId] = useState('1'); // Start from the first step

    useEffect(() => {
        // Initialize chat with the first step message
        if (steps && steps.length > 0) {
            const firstStep = steps.find(step => step.id === '1');
            if (firstStep) {
                const initialMessage = {
                    _id: firstStep.id,
                    text: firstStep.message,
                    createdAt: new Date(),
                    user: {
                        _id: 2, // Bot user ID
                        name: 'ChatBot',
                    },
                };
                setMessages([initialMessage]);
            }
        }
    }, [steps]);

    // Function to toggle the chat visibility
    const toggleChat = () => {
        setShowChat(!showChat);
    };

    // Function to close the chat
    const closeChat = () => {
        setShowChat(false);
    };

 
    const onSend = newMessages => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    
        // Assuming the latest message is from the user, find the next step
        if (newMessages.length > 0) {
            const messageText = newMessages[0].text.toLowerCase(); // Get user's message text
            const currentStep = steps.find(step => step.user && step.id === currentStepId);
            if (currentStep && currentStep.trigger) {
                // Evaluate the trigger function to find the id of the next step
                const nextStepId = currentStep.trigger({ value: messageText });
                proceedToNextStep(nextStepId);
            }
        }
    };

    const proceedToNextStep = (nextStepId) => {
        const nextStep = steps.find(step => step.id === nextStepId);
        if (!nextStep) return; // No next step found

        if (nextStep.user) {
            // If the next step expects user input, simply update the current step
            setCurrentStepId(nextStepId);
        } else {
            // If the next step is a bot message, send it and move to the next step
            const newMessage = {
                _id: nextStep.id,
                text: nextStep.message,
                createdAt: new Date(),
                user: {
                    _id: 2, // Bot user ID
                    name: 'ChatBot',
                },
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
            setCurrentStepId(nextStepId); // Update current step

            // Automatically move to the next step if the next step does not require user input
            if (nextStep.trigger) {
                proceedToNextStep(nextStep.trigger);
            }
        }
    };


    return (
        <>
            <View style={styles.floatingButton}>
                {!showChat && (
                    <FAB style={styles.fab} icon="chat" onPress={toggleChat} />
                )}
            </View>
            {showChat && (
                <View style={styles.chatContainer}>
                    <FAB
                        style={styles.closeButton}
                        icon="close"
                        onPress={closeChat}
                    />
                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: 1, // Assuming this is the user's ID
                        }}
                    />
                </View>
            )}
        </>
    );
};


const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 9999,
    },
    fab: {
        backgroundColor: 'pink',
    },
    chatContainer: {
        position: 'absolute',
        bottom: 150,
        right: 10,
        zIndex: 9998,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 350,
        height: 400,
        marginRight: -5
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 9999,
    },
});

export default FloatingChatButton;
