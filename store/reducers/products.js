import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";
import Product from "../../models/product";

const initState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productDetails.title,
        action.productDetails.imgUrl,
        action.productDetails.description,
        action.productDetails.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (product) => product.id === action.productDetails.productId
      );
      const updatedProduct = new Product(
        action.productDetails.productId,
        state.userProducts[userProductIndex].ownerId,
        action.productDetails.title,
        action.productDetails.imgUrl,
        action.productDetails.description,
        state.userProducts[userProductIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productDetails.productId
      );
      const updatedAvailabeProducts = [...state.availableProducts];
      updatedAvailabeProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailabeProducts,
        userProducts: updatedUserProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
      };

    default:
      return state;
  }
};
