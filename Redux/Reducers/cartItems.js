import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART
} from '../constants';

const cartItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                const updatedState = [...state];
                updatedState[existingItemIndex].quantity += 1;
                return updatedState;
            } else {
                return [...state, { ...action.payload, quantity: 1 }];
            }
        case REMOVE_FROM_CART:
            return state.filter(cartItem => cartItem !== action.payload);
        case CLEAR_CART:
            return [];
        default:
            return state;
    }
}

export default cartItems;
