import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imgUrl, setImgUrl] = useState(
    editedProduct ? editedProduct.imgUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    console.log("Submiting!!!");
  }, []);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChange={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imgUrl}
            onChange={(text) => setImgUrl(text)}
          />
        </View>
        {!editedProduct ? (
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChange={(text) => setPrice(text)}
            />
          </View>
        ) : null}
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChange={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title={"Save"}
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  input: {
    padding: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
