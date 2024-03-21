// productActions.js

// Action Types
export const SET_PRODUCTS = 'SET_PRODUCTS';

// Action Creators
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    payload: products
  };
};
