import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";

const initState = {
  items: {},
  totalAmount: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const title = addedProduct.title;
      const price = addedProduct.price;

      let newOrUpdatedProduct = null;
      if (state.items[addedProduct.id]) {
        newOrUpdatedProduct = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          price,
          title,
          state.items[addedProduct.id].totalPrice + price
        );
      } else {
        newOrUpdatedProduct = new CartItem(1, price, title, price);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: newOrUpdatedProduct },
        totalAmount: state.totalAmount + price,
      };
    default:
      return state;
  }
};
