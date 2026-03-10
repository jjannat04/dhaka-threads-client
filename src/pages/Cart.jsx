import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom"

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext)
  const [toast, setToast] = useState({ show: false, message: "" })

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const subtotal = cart.reduce((acc, item) => acc + Number(item.price), 0)
  const total = subtotal

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "'Inter', sans-serif" }}>
        <h2 style={{ fontSize: "28px", color: "#333" }}>Your bag is empty</h2>
        <p style={{ color: "#777", marginBottom: "30px" }}>Looks like you have not added anything yet.</p>
        <Link to="/products" style={{ background: "#111", color: "#fff", padding: "12px 30px", textDecoration: "none", borderRadius: "5px", fontWeight: "600" }}>
          Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <div style={{ padding: "40px 8%", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff" }}>
      {/* AESTHETIC TOAST */}
      <div style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        backgroundColor: "#0b0a0a",
        color: "white",
        padding: "15px 25px",
        borderRadius: "8px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        transform: toast.show ? "translateY(0)" : "translateY(150%)",
        transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        zIndex: 1000,
        fontSize: "14px"
      }}>
        {toast.message}
      </div>

      <h2 style={{ fontSize: "32px", marginBottom: "40px", fontWeight: "700" }}>Shopping Cart</h2>

      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "2", minWidth: "350px" }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "20px", padding: "20px 0", borderBottom: "1px solid #eee", alignItems: "center" }}>
              <img src={item.image} alt={item.name} style={{ width: "120px", height: "140px", objectFit: "cover", borderRadius: "8px" }} />
              <div style={{ flex: "1" }}>
                <h3 style={{ fontSize: "18px", margin: "0 0 5px 0" }}>{item.name}</h3>
                <p style={{ color: "#777", fontSize: "14px", marginBottom: "10px" }}>Size: {item.size || "M"}</p>
                <p style={{ fontWeight: "700", fontSize: "18px" }}>৳ {item.price}</p>
                <button 
                  onClick={() => {
                    removeFromCart(item.id);
                    triggerToast("Item removed from bag");
                  }}
                  style={{ marginTop: "10px", background: "none", border: "none", color: "#ff4757", cursor: "pointer", textDecoration: "underline", fontSize: "14px" }}
                >
                  Remove item
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: "1", minWidth: "300px", background: "#fafafa", padding: "30px", borderRadius: "12px", position: "sticky", top: "100px" }}>
          <h3 style={{ fontSize: "20px", marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>Order Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <span>Subtotal</span>
            <span>৳ {subtotal}</span>
          </div>
          
          <hr style={{ border: "0", borderTop: "1px solid #ddd", margin: "20px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", fontSize: "20px", fontWeight: "700" }}>
            <span>Total</span>
            <span>৳ {total}</span>
          </div>
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", padding: "16px", background: "#111", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
              Checkout Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart