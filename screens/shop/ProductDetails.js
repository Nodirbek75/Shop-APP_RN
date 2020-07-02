import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../../constants/colors";
import { addToCart } from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductDetails = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();
  const addProductToCart = () => {
    dispatch(addToCart(selectedProduct));
  };

  return (
    <ScrollView>
      <Image style={styles.img} source={{ uri: selectedProduct.imgUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title={"Add To Cart"}
          onPress={addProductToCart}
        />
      </View>
      <Text style={styles.price}>{selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetails.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title={"orders"}
          iconName={"ios-basket"}
          iconSize={25}
          onPress={() => navData.navigation.navigate("Orders")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 300,
  },
  actions: {
    alignItems: "center",
    marginVertical: 15,
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
    fontFamily: "open-sans",
    marginHorizontal: 15,
    marginVertical: 5,
    textAlign: "center",
  },
});

export default ProductDetails;
