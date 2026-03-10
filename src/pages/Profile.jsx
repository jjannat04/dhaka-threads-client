import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch current user data on load
useEffect(() => {
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://final-exam-delta-two.vercel.app/api/profile/", {
        method: "GET",
        headers: {
          "Authorization": `Token ${token}`,
        },
      });
      const data = await res.json();
      
      console.log("Profile Data received:", data); // ADD THIS LINE
      
      if (res.ok) {
        setUser(data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchUserData();
}, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch("https://final-exam-delta-two.vercel.app/api/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update profile." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Try again later." });
    }
  };

  if (loading) return <div style={{ padding: "100px", textAlign: "center" }}>Loading Profile...</div>;

  return (
    <div style={{ padding: "60px 8%", fontFamily: "'Inter', sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "10px" }}>Account Settings</h2>
      <p style={{ color: "#666", marginBottom: "40px" }}>Update your personal information below.</p>

      {message.text && (
        <div style={{ 
          padding: "15px", 
          borderRadius: "8px", 
          marginBottom: "20px",
          background: message.type === "success" ? "#e1f5e6" : "#fdeaea",
          color: message.type === "success" ? "#2ecc71" : "#ff4757",
          border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleUpdate} style={{ display: "grid", gap: "25px" }}>
        {/* Read Only Fields */}
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>Username</label>
            <input type="text" value={user.username} disabled style={disabledInputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>Email</label>
            <input type="email" value={user.email} disabled style={disabledInputStyle} />
          </div>
        </div>

        {/* Editable Fields */}
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>First Name</label>
            <input 
              type="text" 
              value={user.first_name} 
              onChange={(e) => setUser({...user, first_name: e.target.value})}
              placeholder="Enter first name"
              style={inputStyle} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px" }}>Last Name</label>
            <input 
              type="text" 
              value={user.last_name} 
              onChange={(e) => setUser({...user, last_name: e.target.value})}
              placeholder="Enter last name"
              style={inputStyle} 
            />
          </div>
        </div>

        <button type="submit" style={buttonStyle}>Save Changes</button>
      </form>
    </div>
  );
}

// Simple Styles
const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
  outline: "none"
};

const disabledInputStyle = {
  ...inputStyle,
  background: "#f5f5f5",
  color: "#888",
  cursor: "not-allowed"
};

const buttonStyle = {
  padding: "15px",
  background: "#111",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  marginTop: "10px"
};

export default Profile;