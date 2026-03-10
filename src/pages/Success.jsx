import { useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Success() {
  const { setCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  
  const transactionId = searchParams.get("tran_id");

  useEffect(() => {
    setCart([]);
    localStorage.removeItem("cart"); 
  }, [setCart]);

  return (
    <div style={{ 
      height: "80vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      textAlign: "center",
      fontFamily: "'Inter', sans-serif" 
    }}>
      <div style={{ fontSize: "60px", marginBottom: "20px" }}>✅</div>
      <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#111" }}>Payment Successful!</h2>
      <p style={{ color: "#666", marginBottom: "30px", maxWidth: "400px" }}>
        Thank you for shopping with Dhaka Threads. Your order is being processed.
      </p>
      
      {transactionId && (
        <div style={{ 
          background: "#f9f9f9", 
          padding: "15px 25px", 
          borderRadius: "8px", 
          fontSize: "14px",
          color: "#888",
          marginBottom: "30px"
        }}>
          Transaction ID: <span style={{ color: "#111", fontWeight: "600" }}>{transactionId}</span>
        </div>
      )}

      <Link 
        to="/" 
        style={{ 
          padding: "15px 30px", 
          background: "#111", 
          color: "#fff", 
          textDecoration: "none", 
          borderRadius: "8px",
          fontWeight: "600"
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Success;