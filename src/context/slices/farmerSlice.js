// src/context/slices/farmerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const farmerSlice = createSlice({
  name: "farmer",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // Add item to the array
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload); // Remove item by id
    },
  },
});

export const { addItem, removeItem} = farmerSlice.actions;
export default farmerSlice.reducer;
