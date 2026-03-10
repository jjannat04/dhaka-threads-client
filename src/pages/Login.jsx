import { useState } from "react"
import { loginUser } from "../services/auth"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await loginUser({ username, password })
      console.log("Server Response:", res)

      // We now expect 'token' from our updated api_views.py
      if (res.message === "Login successful" && res.token) {
        localStorage.setItem("token", res.token) 
        localStorage.setItem("user", username)
        
        localStorage.setItem("is_admin", res.isAdmin)
        
        alert("Welcome back, " + username + "!")
        navigate("/")
        window.location.reload() 
      } else {
        // If message is success but no token, it's a backend config issue
        const errorMsg = res.error || (res.message === "Login successful" ? "Server failed to provide a token" : "Invalid credentials")
        alert("Login failed: " + errorMsg)
      }
    } catch {
      alert("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "15px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", background: "#fff", border: "1px solid #f0f0f0" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "30px", textAlign: "center" }}>Welcome Back</h2>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            style={{ padding: "14px", borderRadius: "8px", border: "1px solid #ddd", outline: "none" }}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            style={{ padding: "14px", borderRadius: "8px", border: "1px solid #ddd", outline: "none" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button 
            type="submit"
            disabled={loading}
            style={{ padding: "16px", background: "#111", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", transition: "0.3s", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Authenticating..." : "Login to Dhaka Threads"}
          </button>
        </form>
        
        <p style={{ textAlign: "center", marginTop: "20px", color: "#888", fontSize: "14px" }}>
          Dont have an account? <span onClick={() => navigate("/register")} style={{ color: "#111", fontWeight: "600", cursor: "pointer" }}>Sign Up</span>
        </p>
      </div>
    </div>
  )
}

export default Login