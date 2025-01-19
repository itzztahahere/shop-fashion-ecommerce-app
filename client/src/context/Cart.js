import React, { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const existingCartItems = localStorage.getItem("cart");
    if (existingCartItems) {
      try {
        setCart(JSON.parse(existingCartItems)); // Parse only if it’s a valid JSON
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
        setCart([]); // Set to an empty array on error
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
