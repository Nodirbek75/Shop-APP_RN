import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/colors";

const ProductDetails = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );
  return (
    <ScrollView>
      <Image style={styles.img} source={{ uri: selectedProduct.imgUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title={"Add To Cart"} />
      </View>
      <Text style={styles.price}>{selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetails.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 300,
  },
  actions: {
    alignItems: 'center',
    marginVertical: 15
  },
  price: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: "#888",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: 'open-sans',
    marginHorizontal: 15,
    marginVertical: 5,
    textAlign: "center"
  },
});

export default ProductDetails;
