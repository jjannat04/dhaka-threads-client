import { Link } from "react-router-dom";

function Footer() {
  const footerStyle = {
    padding: "100px 8% 40px 8%",
    background: "#000",
    color: "#fff",
    borderTop: "1px solid #222"
  };

  const columnTitleStyle = {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "25px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  };

  const linkStyle = {
    color: "#888",
    textDecoration: "none",
    fontSize: "15px",
    transition: "0.3s",
    display: "block",
    marginBottom: "12px"
  };

  return (
    <footer style={footerStyle}>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "60px", 
        marginBottom: "80px" 
      }}>
        {/* BRAND COLUMN */}
        <div style={{ maxWidth: "300px" }}>
          <h3 style={{ fontSize: "28px", fontWeight: "900", marginBottom: "20px", letterSpacing: "-1px" }}>
            DHAKA THREADS.
          </h3>
          <p style={{ color: "#666", lineHeight: "1.8" }}>
            Crafting the future of Bangladeshi fashion by honoring the hands that weave our history.
          </p>
        </div>

        {/* SHOP COLUMN */}
        <div>
          <h4 style={columnTitleStyle}>Collections</h4>
          <Link to="/products" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#888"}>Shop All</Link>
          <Link to="/products" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#888"}>New Arrivals</Link>
          <Link to="/products" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#888"}>Limited Drops</Link>
        </div>

        {/* COMPANY COLUMN */}
        <div>
          <h4 style={columnTitleStyle}>Company</h4>
          <Link to="/about" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#888"}>Our Story</Link>
          <Link to="/about" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#888"}>Meet the Makers</Link>
          <Link to="/about" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#888"}>Sustainability</Link>
        </div>

        {/* SUPPORT COLUMN */}
        <div>
          <h4 style={columnTitleStyle}>Support</h4>
          <Link to="/contact" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#888"}>Contact Us</Link>
          <Link to="/shipping" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#888"}>Shipping & Returns</Link>
          <Link to="/faq" style={linkStyle} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#888"}>Size Guide</Link>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{ 
        borderTop: "1px solid #111", 
        paddingTop: "40px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        flexWrap: "wrap", 
        gap: "20px" 
      }}>
        <p style={{ color: "#333", fontSize: "14px", margin: 0 }}>
          © 2026 Dhaka Threads. All Rights Reserved.
        </p>
        <div style={{ display: "flex", gap: "25px" }}>
          <a href="https://instagram.com" style={linkStyle}>Instagram</a>
          <a href="https://facebook.com" style={linkStyle}>Facebook</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;