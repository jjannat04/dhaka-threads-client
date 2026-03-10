import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { logoutUser } from "../services/auth"

function Navbar() {

const [loggedIn, setLoggedIn] = useState(false)
const [isAdmin, setIsAdmin] = useState(false)

useEffect(() => {
const token = localStorage.getItem("token")
const admin = localStorage.getItem("is_admin")


if (token) setLoggedIn(true)
if (admin === "true") setIsAdmin(true)


}, [])

function handleLogout() {
logoutUser()


localStorage.removeItem("token")
localStorage.removeItem("is_admin")

setLoggedIn(false)
setIsAdmin(false)


}

const linkStyle = {
fontSize: "18px",
textDecoration: "none",
color: "#111"
}

return (
<header
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
padding: "15px 40px",
borderBottom: "1px solid #eee",
background: "white",
position: "sticky",
top: 0,
zIndex: 1000
}}
>

  {/* LOGO */}
  <Link
    to="/"
    style={{
      fontSize: "22px",
      fontWeight: "bold",
      textDecoration: "none",
      color: "#111"
    }}
  >
    Dhaka Threads
  </Link>

  {/* NAVIGATION */}
  <nav style={{ display: "flex", gap: "25px", alignItems: "center" }}>

    <Link to="/" style={linkStyle}>Home</Link>
    <Link to="/about" style={linkStyle}>About</Link>
    <Link to="/products" style={linkStyle}>Products</Link>

    {loggedIn ? (
      <>

        <Link to="/wishlist" style={linkStyle}>Wishlist</Link>

        <Link to="/cart" style={linkStyle}>Cart</Link>

        <Link to="/orders" style={linkStyle}>Orders</Link>

        
        {isAdmin && (
          <Link
            to="/admin/dashboard"
            style={{
              ...linkStyle,
              fontWeight: "700",
              color: "#2ecc71"
            }}
          >
            Dashboard
          </Link>
        )}

        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            border: "none",
            background: "#111",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Logout
        </button>

      </>
    ) : (
      <>

        <Link
          to="/login"
          style={{ ...linkStyle, fontWeight: "bold" }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{ ...linkStyle, fontWeight: "bold" }}
        >
          Register
        </Link>

      </>
    )}

  </nav>

</header>
)
}

export default Navbar
