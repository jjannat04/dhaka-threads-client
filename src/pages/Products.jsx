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
    <div style={{ padding: "40px 5%", fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ fontSize: "32px", marginBottom: "30px" }}>Our Collection</h2>

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
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        fontWeight: "500"
      }}>
        <span style={{ color: "#4BB543" }}>✓</span> {toast.message}
      </div>

      <div style={{ marginBottom: "40px", display: "flex", gap: "20px", alignItems: "center" }}>
        <div>
          <label style={{ fontWeight: "600", marginRight: "10px" }}>Size:</label>
          <select 
            value={size} 
            onChange={(e) => setSize(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd", outline: "none" }}
          >
            <option value="">All Sizes</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div>
          <label style={{ fontWeight: "600", marginRight: "10px" }}>Color:</label>
          <select 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd", outline: "none" }}
          >
            <option value="">All Colors</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
        {products.map((product) => {
          const isFavorited = wishlist.some(item => String(item.id) === String(product.id));

          return (
            <div
              key={product.id}
              style={{
                border: "1px solid #f0f0f0",
                borderRadius: "12px",
                padding: "20px",
                background: "white",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                <div style={{ overflow: "hidden", borderRadius: "8px", marginBottom: "15px" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "280px", objectFit: "cover", transition: "transform 0.5s ease" }}
                  />
                </div>
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{product.name}</h3>
              </Link>

              <p style={{ fontSize: "20px", fontWeight: "700", color: "#111", marginBottom: "20px" }}>
                ৳ {product.price}
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                <button
                  onClick={() => {
                    addToCart(product);
                    triggerToast(product.name);
                  }}
                  style={{
                    flex: 2,
                    padding: "12px",
                    background: "#111",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "opacity 0.2s"
                  }}
                  onMouseDown={(e) => e.target.style.opacity = "0.7"}
                  onMouseUp={(e) => e.target.style.opacity = "1"}
                >
                  Add to Cart
                </button>
                
                <button
                  onClick={() => addToWishlist(product)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: isFavorited ? "#ff7272" : "transparent",
                    color: isFavorited ? "#fff" : "#111",
                    border: "1px solid #111",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    transition: "all 0.2s ease"
                  }}
                >
                  {isFavorited ? "♥" : "♡"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Products