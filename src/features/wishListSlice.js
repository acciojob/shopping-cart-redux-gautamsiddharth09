import { createSlice } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishList: [],
  },
  reducers: {
    toggleWishList: (state, action) => {
      const exists = state.wishList.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        state.wishList = state.wishList.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.wishList.push(action.payload);
      }
    },
  },
});

export const { toggleWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
