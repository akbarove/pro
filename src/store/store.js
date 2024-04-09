import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users.slice";
import productsSlice from "./products/products.slice";
import cartSlice from "./cart/cart.slice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    products: productsSlice,
    cart: cartSlice,
  },
});
