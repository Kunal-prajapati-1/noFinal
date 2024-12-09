import { createSlice } from '@reduxjs/toolkit';

// Initial cart state
const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add item to cart
    addToCart: (state, action) => {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        state[existingItemIndex].quantity += 1; // Increment quantity if item exists
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    // Action to remove item from cart
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    // Action to clear the cart
    clearCart: () => {
      return [];
    },

    // Action to increment item quantity
    incrementQuantity: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    // Action to decrement item quantity
    decrementQuantity: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
