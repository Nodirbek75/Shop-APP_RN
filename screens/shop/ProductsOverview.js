import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductOverview = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

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
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductOverview.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductOverview;
