import { useState } from "react"
import { registerUser } from "../services/auth"
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await registerUser({ username, email, password })
      console.log("Registration Response:", res)

      if (res) {
        setIsRegistered(true)
      }
    } catch {
      alert("Registration failed. Please try a different username or email.")
    } finally {
      setLoading(false)
    }
  }

  if (isRegistered) {
    return (
      <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: "400px", padding: "40px", background: "#fff", borderRadius: "15px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "50px", marginBottom: "20px" }}>📩</div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "15px" }}>Check your email!</h2>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>
            We have sent an activation link to <strong>{email}</strong>. Please verify your account to start shopping at Dhaka Threads.
          </p>
          <button 
            onClick={() => navigate("/login")}
            style={{ width: "100%", padding: "14px", background: "#111", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: "85vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ 
        width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "15px", 
        boxShadow: "0 10px 40px rgba(0,0,0,0.05)", background: "#fff", border: "1px solid #f0f0f0" 
      }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px", textAlign: "center" }}>Create Account</h2>
        <p style={{ textAlign: "center", color: "#888", marginBottom: "30px", fontSize: "14px" }}>Join the Dhaka Threads community</p>

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>Username</label>
            <input
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", outline: "none" }}
              placeholder="e.g. janesmith"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>Email Address</label>
            <input
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", outline: "none" }}
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>Password</label>
            <input
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", outline: "none" }}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{ 
              marginTop: "10px", padding: "16px", background: "#111", color: "#fff", 
              border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer",
              opacity: loading ? 0.7 : 1, transition: "0.3s"
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
        
        <p style={{ textAlign: "center", marginTop: "20px", color: "#888", fontSize: "14px" }}>
          Already have an account? <Link to="/login" style={{ color: "#111", fontWeight: "600", textDecoration: "none" }}>Log In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register