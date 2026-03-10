import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"

function Checkout() {
  const { cart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    full_name: "",
    address: ""
  })

  const totalAmount = cart.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    return acc + price;
  }, 0);

  async function handleCheckout(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Please login first");
      return;
    }

    setLoading(true);
    try {
      const orderRes = await fetch(
        "https://final-exam-delta-two.vercel.app/api/orders/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
          body: JSON.stringify({
            full_name: formData.full_name,
            address: formData.address,
            total_amount: totalAmount.toFixed(2), 
            items: cart.map(item => ({
    product: Number(item.id),
    quantity: 1             
}))
          })
        }
      );

      const orderData = await orderRes.json();
      console.log("Order Response:", orderData);

      if (!orderRes.ok) {
        alert("Order failed: " + JSON.stringify(orderData));
        setLoading(false);
        return;
      }

      const paymentRes = await fetch(
        "https://final-exam-delta-two.vercel.app/api/create-payment/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
          body: JSON.stringify({
            order_id: orderData.id,
            total_amount: orderData.total_amount
          })
        }
      );

      const paymentData = await paymentRes.json();
      console.log("Payment Response:", paymentData);

      const redirectUrl = paymentData.gateway_url || paymentData.payment_url || paymentData.GatewayPageURL;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        alert("Payment initialization failed: No gateway URL received.");
      }

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto", fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ marginBottom: "20px", fontWeight: "700" }}>Checkout</h2>
      
      <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontSize: "14px", color: "#666" }}>Full Name</label>
          <input 
            placeholder="John Doe" 
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", outline: "none" }}
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            required 
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontSize: "14px", color: "#666" }}>Shipping Address</label>
          <textarea 
            placeholder="Enter your full street address" 
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", outline: "none", minHeight: "80px" }}
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required 
          />
        </div>
        
        <div style={{ borderTop: "1px solid #eee", marginTop: "10px", paddingTop: "15px", color: "#333" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span>Total Items:</span>
            <span>{cart.length}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "700" }}>
            <span>Total Price:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || cart.length === 0}
          style={{ 
            padding: "16px", 
            background: "#111", 
            color: "#fff", 
            cursor: "pointer", 
            borderRadius: "8px", 
            border: "none",
            fontWeight: "600",
            fontSize: "16px",
            marginTop: "10px",
            opacity: loading ? 0.7 : 1,
            transition: "0.3s"
          }}
        >
          {loading ? "Processing..." : "Pay with SSLCOMMERZ"}
        </button>
      </form>
    </div>
  )
}

export default Checkout