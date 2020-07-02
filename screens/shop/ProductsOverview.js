import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";

const ProductOverview = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  const addProductToCart = (productId) => {
    const addedProduct = products.find((product) => product.id === productId);
    dispatch(addToCart(addedProduct));
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          img={itemData.item.imgUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetails={() =>
            props.navigation.navigate("Details", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            })
          }
          onAddToCart={() => addProductToCart(itemData.item.id)}
        />
      )}
    />
  );
};

ProductOverview.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
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

export default ProductOverview;
