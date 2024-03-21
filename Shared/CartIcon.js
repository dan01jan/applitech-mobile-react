import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const cartItems = useSelector(state => state.cartItems);

  return (
    <>
      {cartItems.length ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.text} children={`${cartItems.length}`} />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: -4,
    right: -18,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

export default CartIcon;
