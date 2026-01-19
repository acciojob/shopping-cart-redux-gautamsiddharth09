import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    console.log("data",res)
    return res.json();
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartItems: [],
    isLoading: false,
    isError: false,
    discount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.id === action.payload.id
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    removeToCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.id !== action.payload
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    applyCoupon: (state, action) => {
      if (action.payload === "SAVE10") {
        state.discount = 10;
      }
      else{
        state.discount = 0;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  addToCart,
  removeToCart,
  increaseQuantity,
  decreaseQuantity,
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
