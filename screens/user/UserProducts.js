import React from "react";
import { FlatList, Platform, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const userProductItems = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id, title) => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete " + title + "?",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => dispatch(deleteProduct(id)),
        },
      ]
    );
  };

  return (
    <FlatList
      data={userProductItems}
      key={(item) => item.id}
      renderItem={(itemsData) => (
        <ProductItem
          img={itemsData.item.imgUrl}
          title={itemsData.item.title}
          price={itemsData.item.price}
          onSelect={() => editProductHandler(itemsData.item.id)}
        >
          <Button
            color={Colors.primary}
            title={"Edit"}
            onPress={() => editProductHandler(itemsData.item.id)}
          />
          <Button
            color={Colors.primary}
            title={"Delete"}
            onPress={() =>
              deleteHandler(itemsData.item.id, itemsData.item.title)
            }
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "User Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title={"Menu"}
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title={"Create"}
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => navData.navigation.navigate("EditProduct")}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
