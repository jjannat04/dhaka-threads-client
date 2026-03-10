import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// 1. Create the Context
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // 2. Initialize State from LocalStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error parsing wishlist from localStorage:", error);
      return [];
    }
  });

  // 3. Sync State to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // 4. Add/Toggle Function
  const addToWishlist = (product) => {
    if (!product || !product.id) return;

    setWishlist((prev) => {
      // Use String comparison to avoid Type Mismatch bugs (Number vs String)
      const isExist = prev.find(
        (item) => String(item.id) === String(product.id)
      );

      if (isExist) {
        // If it already exists, we remove it (Toggle behavior)
        return prev.filter((item) => String(item.id) !== String(product.id));
      }

      // Otherwise, add the new product to the array
      return [...prev, product];
    });
  };

  // 5. Remove Function
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => 
      prev.filter((item) => String(item.id) !== String(productId))
    );
  };

  // 6. Clear Function
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

// PropTypes for validation
WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};