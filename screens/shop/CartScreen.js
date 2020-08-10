import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/shop/CartItem";
import colors from "../../constants/colors";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";
import Card from "../../components/UI/Card";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        totalPrice: state.cart.items[key].totalPrice,
        quantity: state.cart.items[key].quantity,
      });
    }
    return transformedCartItems;
  });

  const dispatch = useDispatch();
  const deleteFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={colors.secondary}
          title={"Order"}
          onPress={() => {
            dispatch(addOrder(cartItems, cartTotalAmount));
            props.navigation.navigate("Products");
          }}
          disabled={cartItems.length === 0}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.totalPrice}
            deletable
            onDelete={() => deleteFromCart(itemData.item.productId)}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});

export default CartScreen;
