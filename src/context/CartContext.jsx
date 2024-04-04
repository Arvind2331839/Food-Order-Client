import { createContext, useReducer } from 'react';

// Create a context for managing the cart state
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

// Reducer function to manage cart state
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Find if the item already exists in the cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      // Create a copy of the current items array
      const updatedItems = [...state.items];

      // If the item exists, update its quantity, otherwise add it to the cart
      if (existingItemIndex > -1) {
        const existingItem = state.items[existingItemIndex];
        const newQuantity = {
          ...existingItem,
          quantity: parseInt(existingItem.quantity) + 1,
        };
        updatedItems[existingItemIndex] = newQuantity;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };

    case 'REMOVE_ITEM':
      // Find the index of the item to be removed
      const itemIndexToRemove = state.items.findIndex(
        (item) => item.id === action.id
      );

      // Create a copy of the current items array
      const updatedItemsAfterRemoval = [...state.items];

      // If quantity is 1, remove the item, otherwise decrease its quantity
      if (updatedItemsAfterRemoval[itemIndexToRemove].quantity === 1) {
        updatedItemsAfterRemoval.splice(itemIndexToRemove, 1);
      } else {
        updatedItemsAfterRemoval[itemIndexToRemove].quantity -= 1;
      }

      return { ...state, items: updatedItemsAfterRemoval };

    case 'CLEAR_CART':
      // Clear all items from the cart
      return { ...state, items: [] };

    default:
      return state;
  }
}

// Cart context provider component
export function CartContextProvider({ children }) {
  // Use reducer to manage cart state
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // Function to add an item to the cart
  const addItem = (item) => {
    dispatchCartAction({
      type: 'ADD_ITEM',
      item,
    });
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      id,
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    dispatchCartAction({ type: 'CLEAR_CART' });
  };

  // Context object containing cart state and functions
  const cartCTX = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  // Provide the context value to the children components
  return (
    <CartContext.Provider value={cartCTX}>{children}</CartContext.Provider>
  );
}

export default CartContext;
