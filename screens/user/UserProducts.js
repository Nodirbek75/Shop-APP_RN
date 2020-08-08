import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/colors";

const UserProductsScreen = (props) => {
  const userProductItems = useSelector((state) => state.products.userProducts);

  return (
    <FlatList
      data={userProductItems}
      key={(item) => item.id}
      renderItem={(itemsData) => (
        <ProductItem
          img={itemsData.item.imgUrl}
          title={itemsData.item.title}
          price={itemsData.item.price}
          onSelect={() => {}}
        >
          <Button color={Colors.primary} title={"Edit"} onPress={() => {}} />
          <Button color={Colors.primary} title={"Delete"} onPress={() => {}} />
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
  };
};

export default UserProductsScreen;
