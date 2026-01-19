import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "../features/cartSlice"
import wishListReducer from "../features/wishListSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
  },
});



