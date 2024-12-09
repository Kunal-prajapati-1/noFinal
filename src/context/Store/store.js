import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';  // Import the cart reducer
import themeReducer from '../slices/themeSlice';  // Import the theme reducer
import farmerReducer from '../slices/farmerSlice';  // Import the theme reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,  // Add the cart reducer to the store
    theme: themeReducer,
    farmer: farmerReducer,
  },
});

export default store;
