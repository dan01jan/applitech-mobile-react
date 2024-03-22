import React, { useEffect, useReducer, useState } from "react";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage'

import authReducer from "../Reducers/Auth.reducer";
import { setCurrentUser } from "../Actions/Auth.actions";
import AuthGlobal from './AuthGlobal'

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
                dispatch(setCurrentUser({
                    isAuthenticated: true,
                    user: {
                        name: decoded.name, // Assuming name is present in the decoded JWT
                        email: decoded.email // Assuming email is present in the decoded JWT
                    }
                }));
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
