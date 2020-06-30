import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from 'react-native';

import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetails from "../screens/shop/ProductDetails";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import Colors from '../constants/colors';

const ShopStackNavigator = createStackNavigator({
  Products: ProductsOverview,
  Details: ProductDetails,
  Cart: CartScreen,
  Orders: OrdersScreen,
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default createAppContainer(ShopStackNavigator);
