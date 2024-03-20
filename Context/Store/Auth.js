import React, { useEffect, useReducer,  useState } from "react";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage'

import authReducer from "../Reducers/Auth.reducer";
import { setCurrentUser } from "../Actions/Auth.actions";
import AuthGlobal from './AuthGlobal'

const Auth = props => {
    // console.log(props.children)
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        const loadUser = async () => {
            try {
                const jwtToken = await AsyncStorage.getItem('jwt');
                if (jwtToken) {
                    const decoded = jwtDecode(jwtToken);
                    dispatch(setCurrentUser(decoded));
                }
            } catch (error) {
                console.error("Error loading user:", error);
            }
        };
    
        loadUser();
    
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

export default Auth