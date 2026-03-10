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

      if (res.message === "Login successful" && res.token) {
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", username)
        localStorage.setItem("is_admin", res.isAdmin)

        navigate("/")
        window.location.reload()
      } else {
        alert("Login failed")
      }
    } catch {
      alert("Network error.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "clamp(25px,5vw,40px)",
        borderRadius: "15px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
        background: "#fff",
        border: "1px solid #f0f0f0"
      }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "30px", textAlign: "center" }}>
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            style={{ padding: "14px", borderRadius: "8px", border: "1px solid #ddd" }}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            style={{ padding: "14px", borderRadius: "8px", border: "1px solid #ddd" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "16px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Authenticating..." : "Login to Dhaka Threads"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#888", fontSize: "14px" }}>
          Dont have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#111", fontWeight: "600", cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login