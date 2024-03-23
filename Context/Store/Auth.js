// Auth.js

import React, { useEffect, useReducer, useState } from "react";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from "../Reducers/Auth.reducer";
import { setCurrentUser } from "../Actions/Auth.actions";
import AuthGlobal from './AuthGlobal';
import { getUserProfile } from "../Actions/Auth.actions"; // Import the getUserProfile action

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        const fetchUserFromStorage = async () => {
            if (AsyncStorage.jwt) {
                const decoded = jwtDecode(AsyncStorage.jwt);
                // Fetch user profile from backend
                getUserProfile(decoded.userId)
                    .then(data => {
                        dispatch(setCurrentUser({
                            isAuthenticated: true,
                            user: data // Assuming data contains user information
                        }));
                    })
                    .catch(error => {
                        console.error("Error fetching user profile:", error);
                        // Handle error fetching user profile
                    });
            }
        };
        fetchUserFromStorage();
        return () => setShowChild(false);
    }, []);

    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
};

export default Auth;
