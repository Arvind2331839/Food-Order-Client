import React, { createContext, useState } from 'react';

// Create a context for managing modal state
const ModalContext = createContext({
  status: '', // Indicates current modal status ('cart', 'checkout', etc.)
  showModal: () => {}, // Function to show modal
  closeModal: () => {}, // Function to close modal
  showCheckout: () => {}, // Function to show checkout modal
  closeCheckout: () => {}, // Function to close checkout modal
});

// Modal context provider component
export function ModalContextProvider({ children }) {
  // State to manage user's modal status
  const [userStatus, setUserStatus] = useState('');

  // Function to show modal
  const showModal = () => {
    setUserStatus('cart');
  };

  // Function to close modal
  const closeModal = () => {
    setUserStatus('');
  };

  // Function to show checkout modal
  const showCheckout = () => {
    setUserStatus('checkout');
  };

  // Function to close checkout modal
  const closeCheckout = () => {
    setUserStatus('');
  };

  // Context object containing modal state and functions
  const modalCTX = {
    status: userStatus,
    showModal,
    closeModal,
    showCheckout,
    closeCheckout,
  };

  // Provide the context value to the children components
  return (
    <ModalContext.Provider value={modalCTX}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
