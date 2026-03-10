import { useContext, useState } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [toast, setToast] = useState({ show: false, message: "" });

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "'Inter', sans-serif" }}>
        <h2 style={{ fontSize: "28px", color: "#333" }}>Your wishlist is empty</h2>
        <p style={{ color: "#777", marginBottom: "30px" }}>Save your favorite Dhaka Threads pieces here.</p>
        <Link 
          to="/products" 
          style={{ 
            display: "inline-block",
            padding: "12px 30px",
            background: "#111",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "600"
          }}
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 8%", fontFamily: "'Inter', sans-serif" }}>
      {/* AESTHETIC TOAST */}
      <div style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: "#111",
        color: "white",
        padding: "15px 25px",
        borderRadius: "8px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        transform: toast.show ? "translateY(0)" : "translateY(150%)",
        transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        zIndex: 1000,
        fontSize: "14px"
      }}>
        ✓ {toast.message}
      </div>

      <header style={{ borderBottom: "1px solid #eee", marginBottom: "40px", paddingBottom: "20px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700" }}>My Wishlist</h2>
        <p style={{ color: "#888" }}>{wishlist.length} items saved</p>
      </header>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
        {wishlist.map((product) => (
          <div 
            key={product.id} 
            style={{ 
              border: "1px solid #f0f0f0", 
              padding: "20px", 
              borderRadius: "12px", 
              position: "relative",
              background: "#fff",
              transition: "box-shadow 0.3s ease"
            }}
          >
            <button 
              onClick={() => {
                removeFromWishlist(product.id);
                triggerToast("Removed from wishlist");
              }}
              style={{ 
                position: "absolute", right: "15px", top: "15px", background: "#fff", 
                border: "1px solid #eee", borderRadius: "50%", width: "30px", height: "30px", 
                cursor: "pointer", fontSize: "12px", zIndex: 2 
              }}
            >
              ✕
            </button>

            <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ overflow: "hidden", borderRadius: "8px", height: "300px", marginBottom: "15px" }}>
                <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px", fontWeight: "600" }}>{product.name}</h3>
              <p style={{ fontSize: "19px", fontWeight: "700", color: "#111", marginBottom: "20px" }}>৳ {product.price}</p>
            </Link>
            
            <button 
              onClick={() => {
                addToCart(product);
                removeFromWishlist(product.id); // MOVES ITEM TO CART
                triggerToast(`${product.name} moved to bag!`);
              }}
              style={{ 
                width: "100%", padding: "14px", background: "#111", color: "#fff", 
                border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;