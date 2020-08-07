import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
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
    case REMOVE_FROM_CART:
      const id = action.productId;
      const updatedItems = { ...state.items };
      let updatedTotalAmount = state.totalAmount;
      if (updatedItems[id].quantity > 1) {
        updatedItems[id].quantity -= 1;
        updatedItems[id].totalPrice -= updatedItems[id].productPrice;
        updatedTotalAmount -= updatedItems[id].productPrice;
      } else {
        updatedTotalAmount -= updatedItems[id].totalPrice;
        delete updatedItems[id];
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case ADD_ORDER:
      return initState;
    default:
      return state;
  }
};
