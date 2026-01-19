import { createSlice } from "@reduxjs/toolkit";

/* ------------------ PROMISE THUNK ------------------ */
export const fetchProduct = () => (dispatch) => {
  dispatch(fetchProductPending());

  fetch("https://fakestoreapi.com/products")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    })
    .then((data) => {
      dispatch(fetchProductSuccess(data));
    })
    .catch(() => {
      dispatch(fetchProductError());
    });
};

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
    /* -------- FETCH STATES -------- */
    fetchProductPending: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    fetchProductSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },

    fetchProductError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    /* -------- CART LOGIC -------- */
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
      const item = state.cartItems.find(
        (i) => i.id === action.payload
      );
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.id === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    applyCoupon: (state, action) => {
      state.discount = action.payload === "SAVE10" ? 10 : 0;
    },
  },
});

/* -------- EXPORT ACTIONS -------- */
export const {
  fetchProductPending,
  fetchProductSuccess,
  fetchProductError,
  addToCart,
  removeToCart,
  increaseQuantity,
  decreaseQuantity,
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
