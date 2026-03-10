import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
export const CartContext = createContext(); 

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id));
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};