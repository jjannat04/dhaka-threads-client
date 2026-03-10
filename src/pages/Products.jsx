import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"

function Products() {
  const [products, setProducts] = useState([])
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [toast, setToast] = useState({ show: false, message: "" })
  const { addToCart } = useContext(CartContext)
  const { wishlist, addToWishlist } = useContext(WishlistContext)

  const triggerToast = (productName) => {
    setToast({ show: true, message: `${productName} added to bag!` })
    setTimeout(() => setToast({ show: false, message: "" }), 3000)
  }

  useEffect(() => {
    async function loadProducts() {
      let url = "https://final-exam-delta-two.vercel.app/api/products/"
      const params = []
      if (size) params.push(`size=${size}`)
      if (color) params.push(`color=${color}`)
      if (params.length > 0) url += "?" + params.join("&")

      try {
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error("Failed to fetch products:", err)
      }
    }
    loadProducts()
  }, [size, color])

  return (
    <div style={{ padding: "60px 5%", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff" }}>
      
      {/* --- REFINED TOAST --- */}
      <div style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: "#111",
        color: "white",
        padding: "16px 28px",
        borderRadius: "12px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        transform: toast.show ? "translateY(0)" : "translateY(150%)",
        transition: "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "14px",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{ background: "#4BB543", width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>✓</div>
        {toast.message}
      </div>

      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "10px", letterSpacing: "-1px" }}>Our Collection</h2>
        <p style={{ color: "#666", fontSize: "16px" }}>Premium essentials crafted for Dhaka`s lifestyle.</p>
      </div>

      {/* --- FILTER BAR --- */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "20px", 
        marginBottom: "50px",
        padding: "20px",
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "#888" }}>SIZE</span>
          <select 
            value={size} 
            onChange={(e) => setSize(e.target.value)}
            style={{ padding: "10px 20px", borderRadius: "30px", border: "1px solid #ddd", outline: "none", cursor: "pointer", fontWeight: "500" }}
          >
            <option value="">All Sizes</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "#888" }}>COLOR</span>
          <select 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
            style={{ padding: "10px 20px", borderRadius: "30px", border: "1px solid #ddd", outline: "none", cursor: "pointer", fontWeight: "500" }}
          >
            <option value="">All Colors</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "40px" }}>
        {products.map((product) => {
          const isFavorited = wishlist.some(item => String(item.id) === String(product.id));

          return (
            <div
              key={product.id}
              className="product-card"
              style={{
                background: "white",
                transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.querySelector('.cart-btn').style.opacity = "1";
                e.currentTarget.querySelector('.cart-btn').style.transform = "translateY(0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.querySelector('.cart-btn').style.opacity = "0";
                e.currentTarget.querySelector('.cart-btn').style.transform = "translateY(10px)";
              }}
            >
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "16px", marginBottom: "20px" }}>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "380px", objectFit: "cover", transition: "transform 0.6s ease" }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                </Link>
                
                {/* Wishlist Icon Overlay */}
                <button
                  onClick={() => addToWishlist(product)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: isFavorited ? "#111" : "rgba(255,255,255,0.9)",
                    color: isFavorited ? "#fff" : "#111",
                    border: "none",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    zIndex: 2
                  }}
                >
                  {isFavorited ? "♥" : "♡"}
                </button>

                {/* Modern Hover Quick-Add */}
                <button
                  className="cart-btn"
                  onClick={() => {
                    addToCart(product);
                    triggerToast(product.name);
                  }}
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "15px",
                    right: "15px",
                    background: "rgba(17, 17, 17, 0.9)", 
                    color: "white",
                    border: "none",
                    padding: "14px", 
                    borderRadius: "8px",
                    fontWeight: "700",
                    cursor: "pointer",
                    opacity: "1",      
                    transform: "translateY(0)", 
                    transition: "background 0.3s ease, transform 0.2s ease", 
                    zIndex: 2,
                    backdropFilter: "blur(4px)", 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#000";
                    e.currentTarget.style.transform = "scale(1.02)"; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(17, 17, 17, 0.9)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Add to Cart
                </button>
              </div>

              <div style={{ padding: "0 5px" }}>
                <p style={{ fontSize: "12px", color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "5px" }}>
                  {product.category || "New Arrival"}
                </p>
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111", margin: "0 0 8px 0" }}>{product.name}</h3>
                </Link>
                <p style={{ fontSize: "17px", fontWeight: "500", color: "#333", margin: 0 }}>
                  ৳ {product.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Products