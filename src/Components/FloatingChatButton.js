import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';

const FloatingChatButton = ({ steps }) => {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Initialize chat messages with steps
        if (steps && steps.length > 0) {
            const initialMessages = steps.map(step => ({
                _id: step.id,
                text: step.message,
                createdAt: new Date(),
                user: {
                    _id: 2, // Use a different user ID for bot messages
                    name: 'ChatBot',
                },
            }));
            setMessages(initialMessages);
        }
    }, [steps]);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    const closeChat = () => {
        setShowChat(false);
    };

    const onSend = newMessages => {
        const messageText = newMessages[0].text;
        const currentStep = steps.find(step => step.id === messages[messages.length - 1]._id);
    
        // Check if the current step is a user step and if the user input matches any of the options
        if (currentStep && currentStep.user && currentStep.options) {
            const selectedOption = currentStep.options.find(option => option.value.toLowerCase() === messageText.toLowerCase());
            if (selectedOption) {
                const nextStep = steps.find(step => step.id === selectedOption.trigger);
                if (nextStep) {
                    const newMessage = {
                        _id: nextStep.id,
                        text: nextStep.message,
                        createdAt: new Date(),
                        user: {
                            _id: 1, // Bot user ID
                            name: 'ChatBot',
                        },
                    };
                    setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
                    return;
                }
            }
        }
    
        // Default behavior: append user message and let GiftedChat handle it
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    };
    

    return (
        <>
            <View style={styles.floatingButton}>
                {!showChat && (
                    <FAB
                        style={styles.fab}
                        icon="chat"
                        onPress={toggleChat}
                    />
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
                        onSend={newMessages => onSend(newMessages)}
                        user={{
                            _id: 1,
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
        right: 20,
        zIndex: 9998,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 350,
        height: 400,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 9999,
    },
});

export default FloatingChatButton;
