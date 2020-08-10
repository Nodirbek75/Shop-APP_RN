import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

import CartItem from "./CartItem";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.button}>
        <Button
          color={Colors.primary}
          title={showDetails ? "Hide Details" : "Show Details"}
          onPress={() => setShowDetails((prevState) => !prevState)}
        />
      </View>
      {showDetails && (
        <View>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              amount={cartItem.totalPrice}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  button: {
    alignItems: "center",
  },
});

export default OrderItem;
