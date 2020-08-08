import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const ProductItem = (props) => {
  let TouchableCmp = TouchableHighlight;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View >
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{ uri: props.img }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            {props.children}
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    height: 300,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  imgContainer: {
    width: "100%",
    height: "60%",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  details: {
    height: "15%",
  },
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    marginVertical: 5,
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    fontFamily: 'open-sans',
    textAlign: "center",
    color: '#888'
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    marginHorizontal: 15,
  },
});

export default ProductItem;
