import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from '../context/slices/cartSlice';

const CartComponent = () => {
  const cart = useSelector((state) => state.cart); // Access cart state
  const dispatch = useDispatch(); // Access dispatch function
  const [total, setTotal] = useState(0); // State for total amount

  // Calculate total whenever cart changes
  useEffect(() => {
    const calculateTotal = () =>
      cart.reduce(
        (acc, item) =>
          acc + (item.price && item.quantity ? item.price.charAt(0) * item.quantity : 0),
        0
      );
    setTotal(calculateTotal());
  }, [cart]);

  return (
    <div className="max-w-7xl h-fit mx-auto px-4 md:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div>
          {/* Cart Items */}
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between py-4">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                  <div className="flex items-center">
                    <button
                      onClick={() => dispatch(decrementQuantity({ id: item.id }))}
                      className="text-xl text-gray-500 px-2"
                    >
                      -
                    </button>
                    <p className="mx-2 text-md text-gray-700">{item.quantity}</p>
                    <button
                      onClick={() => dispatch(incrementQuantity({ id: item.id }))}
                      className="text-xl text-gray-500 px-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Order Summary */}
          <div className="mt-6">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <p className="text-gray-700 dark:text-gray-300">Total: ${total}</p>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button> 
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
