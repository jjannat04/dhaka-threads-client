import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error parsing wishlist from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!product || !product.id) return;

    setWishlist((prev) => {
      
      const isExist = prev.find(
        (item) => String(item.id) === String(product.id)
      );

      if (isExist) {

        return prev.filter((item) => String(item.id) !== String(product.id));
      }

      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => 
      prev.filter((item) => String(item.id) !== String(productId))
    );
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        clearWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};