import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"

function Checkout() {
  const { cart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    full_name: "",
    address: ""
  })

  const totalAmount = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0)

  async function handleCheckout(e) {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please login first")
      return
    }

    setLoading(true)

    try {
      const orderRes = await fetch(
        "https://final-exam-delta-two.vercel.app/api/orders/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
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
      )

      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        alert("Order failed")
        setLoading(false)
        return
      }

      const paymentRes = await fetch(
        "https://final-exam-delta-two.vercel.app/api/create-payment/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          },
          body: JSON.stringify({
            order_id: orderData.id,
            total_amount: orderData.total_amount
          })
        }
      )

      const paymentData = await paymentRes.json()

      const redirectUrl =
        paymentData.gateway_url ||
        paymentData.payment_url ||
        paymentData.GatewayPageURL

      if (redirectUrl) window.location.href = redirectUrl
      else alert("Payment initialization failed")

    } catch {
      alert("Checkout error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      padding: "clamp(20px,5vw,40px)",
      maxWidth: "500px",
      margin: "0 auto",
      fontFamily: "'Inter', sans-serif"
    }}>
      <h2 style={{ marginBottom: "20px", fontWeight: "700" }}>
        Checkout
      </h2>

      <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          placeholder="Full Name"
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
          value={formData.full_name}
          onChange={(e)=>setFormData({...formData, full_name:e.target.value})}
          required
        />

        <textarea
          placeholder="Shipping Address"
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", minHeight: "80px" }}
          value={formData.address}
          onChange={(e)=>setFormData({...formData, address:e.target.value})}
          required
        />

        <div style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "700" }}>
            <span>Total Price</span>
            <span>৳ {totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || cart.length === 0}
          style={{
            padding: "16px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          {loading ? "Processing..." : "Pay with SSLCOMMERZ"}
        </button>
      </form>
    </div>
  )
}

export default Checkout