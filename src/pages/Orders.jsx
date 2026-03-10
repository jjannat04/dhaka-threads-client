import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext"; 

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { clearCart } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("payment") === "success") {
      clearCart();
      window.history.replaceState({}, document.title, "/orders");
    }
  }, [location, clearCart]);

  useEffect(() => {
    async function loadOrders() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://final-exam-delta-two.vercel.app/api/orders/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}` 
          }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          setError(data.detail || "Error loading orders.");
        }
      } catch {
        setError("Network error. Could not connect to server.");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const getStatusStyles = (status) => {
    const s = (status || "").toLowerCase();
    if (s === 'paid' || s === 'delivered') return { bg: '#e1f5e6', color: '#2ecc71', border: '#c3e6cb' };
    if (s === 'shipped') return { bg: '#e3f2fd', color: '#3498db', border: '#bbdefb' };
    return { bg: '#fff4e5', color: '#f39c12', border: '#ffeeba' };
  };

  if (loading) return <div style={{ padding: "100px", textAlign: "center" }}>Loading your orders...</div>;
  if (error) return <div style={{ padding: "100px", textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "40px 8%", fontFamily: "'Inter', sans-serif", minHeight: "80vh" }}>
      <h2 style={{ fontSize: "32px", marginBottom: "40px", fontWeight: "700" }}>My Orders</h2>
      {orders.length === 0 ? (
        <div style={{ padding: "60px", textAlign: "center", background: "#f9f9f9", borderRadius: "16px" }}>
          <p>You have not placed any orders yet.</p>
          <Link to="/products" style={{ color: "#111", fontWeight: "700" }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => {
            const styles = getStatusStyles(order.status);
            return (
              <div key={order.id} style={{ border: "1px solid #eee", padding: "25px 35px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                <div>
                  <p style={{ margin: "0 0 5px 0", color: "#888", fontSize: "13px" }}>Order #{order.id}</p>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: "800" }}>৳ {order.total_amount}</h3>
                  <p style={{ margin: 0, fontSize: "13px", color: "#aaa" }}>
                    {order.created_at ? new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "Recently"}
                  </p>
                </div>
                <div>
                  <span style={{ padding: "8px 20px", borderRadius: "30px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", background: styles.bg, color: styles.color, border: `1px solid ${styles.border}` }}>
                    {order.status || "Pending"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;