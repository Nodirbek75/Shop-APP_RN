import React, { useCallback, useEffect, useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import { createProduct, updateProduct } from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedInputValues = {
      ...state.inputValues,
      [action.inputType]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.inputType]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }
    return {
      ...state,
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imgUrl: editedProduct ? editedProduct.imgUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imgUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const inputChangeHandler = (text, inputType) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      inputType: inputType,
    });
  };

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please, enter valid value", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        updateProduct(
          editedProduct.id,
          formState.inputValues.title,
          formState.inputValues.imgUrl,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.imgUrl,
          formState.inputValues.description,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, formState, productId]);

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
            value={formState.inputValues.title}
            onChangeText={(text) => inputChangeHandler(text, "title")}
            keyboardType="default"
            autoCapitalize="characters"
            autoCorrect
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imgUrl}
            onChangeText={(text) => inputChangeHandler(text, "imgUrl")}
          />
        </View>
        {!editedProduct ? (
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(text) => inputChangeHandler(text, "price")}
              keyboardType="decimal-pad"
            />
          </View>
        ) : null}
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => inputChangeHandler(text, "description")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
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
