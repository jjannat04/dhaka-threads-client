import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { logoutUser } from "../services/auth"

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    const token = localStorage.getItem("token")
    const admin = localStorage.getItem("is_admin")
    if (token) setLoggedIn(true)
    if (admin === "true") setIsAdmin(true)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function handleLogout() {
    logoutUser()
    localStorage.removeItem("token")
    localStorage.removeItem("is_admin")
    setLoggedIn(false)
    setIsAdmin(false)
  }

  const linkStyle = {
    fontSize: isMobile ? "20px" : "18px",
    textDecoration: "none",
    color: "#111",
    padding: isMobile ? "15px 0" : "0"
  }

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "15px 20px" : "15px 40px",
      borderBottom: "1px solid #eee",
      background: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{ fontSize: "22px", fontWeight: "bold", textDecoration: "none", color: "#111" }}>
        Dhaka Threads
      </Link>

      {isMobile && (
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      )}

      <nav style={{
        display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "10px" : "25px",
        alignItems: isMobile ? "flex-start" : "center",
        position: isMobile ? "absolute" : "static",
        top: isMobile ? "60px" : "auto",
        left: 0,
        width: isMobile ? "100%" : "auto",
        background: "white",
        padding: isMobile ? "20px" : "0",
        boxShadow: isMobile ? "0 10px 10px rgba(0,0,0,0.05)" : "none"
      }}>
        <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" style={linkStyle} onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/products" style={linkStyle} onClick={() => setMenuOpen(false)}>Products</Link>

        {loggedIn ? (
          <>
            <Link to="/wishlist" style={linkStyle} onClick={() => setMenuOpen(false)}>Wishlist</Link>
            <Link to="/cart" style={linkStyle} onClick={() => setMenuOpen(false)}>Cart</Link>
            <Link to="/orders" style={linkStyle} onClick={() => setMenuOpen(false)}>Orders</Link>
            {isAdmin && (
              <Link to="/admin/dashboard" style={{ ...linkStyle, fontWeight: "700", color: "#2ecc71" }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
            )}
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{ padding: "10px 20px", border: "none", background: "#111", color: "white", borderRadius: "5px", cursor: "pointer", fontWeight: "600", width: isMobile ? "100%" : "auto" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ ...linkStyle, fontWeight: "bold" }} onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" style={{ ...linkStyle, fontWeight: "bold" }} onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
export default Navbar