import { Link } from "react-router-dom";

function Home() {
  return (
    
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#222", lineHeight: "1.6" }}>
      
      {/* HERO SECTION */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "100px 8%",
          background: "linear-gradient(135deg, #fdfdfd 0%, #f4f4f4 100%)",
          minHeight: "70vh"
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <span style={{ textTransform: "uppercase", letterSpacing: "2px", fontSize: "14px", color: "#888" }}>
            New Arrival 2026
          </span>
          <h1 style={{ fontSize: "56px", fontWeight: "800", margin: "10px 0 25px 0", lineHeight: "1.1" }}>
            Elevate Your <br /> Everyday Aesthetic
          </h1>
          <p style={{ fontSize: "19px", marginBottom: "35px", color: "#444", maxWidth: "90%" }}>
            Experience the fusion of heritage and modernity. Dhaka Threads brings you meticulously crafted Panjabis, 
            elegant Sarees, and contemporary essentials designed for the discerning individual.
          </p>
          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/products">
              <button
                style={{
                  padding: "15px 35px",
                  background: "#111",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
              >
                Explore Collection
              </button>
            </Link>
            
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=764&auto=format&fit=crop"
            alt="Dhaka Threads Fashion"
            style={{ width: "480px", height: "600px", objectFit: "cover", borderRadius: "12px", boxShadow: "20px 20px 60px rgba(0,0,0,0.05)" }}
          />
        </div>
      </section>

      {/* BRAND STORY / STATS */}
      <section style={{ padding: "80px 8%", textAlign: "center", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Authentically Bangladeshi</h2>
          <p style={{ fontSize: "18px", color: "#666" }}>
            Founded in the heart of Dhaka, we believe that fashion is a thread that connects our rich history to our vibrant future. 
            Every stitch in our collection tells a story of local craftsmanship, sustainable sourcing, and timeless elegance.
          </p>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section style={{ padding: "60px 8%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <h2 style={{ fontSize: "36px", margin: "0" }}>Shop by Category</h2>
            <p style={{ color: "#777" }}>Find the perfect outfit for any occasion.</p>
          </div>
          <Link to="/products" style={{ color: "#111", fontWeight: "600" }}>View All Categories →</Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px"
          }}
        >
          {[
            { name: "Panjabi", img: "https://images.unsplash.com/photo-1684688635718-9839255b7061?q=80&w=1188" },
            { name: "Saree", img: "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=1074" },
            { name: "T-Shirts", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b" }
          ].map((cat) => (
            <div key={cat.name} style={{ cursor: "pointer", overflow: "hidden" }}>
              <div style={{ borderRadius: "8px", overflow: "hidden", marginBottom: "15px", height: "400px" }}>
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.5s transform" }}
                />
              </div>
              <h3 style={{ fontSize: "22px" }}>{cat.name}</h3>
              <p style={{ color: "#777" }}>Explore the latest trends in {cat.name} fashion.</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPOSITIONS */}
      <section style={{ padding: "100px 8%", background: "#111", color: "#fff" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "50px"
          }}
        >
          {[
            { title: "Ethical Craft", desc: "We partner with local artisans to ensure fair wages and preserve traditional weaving techniques." },
            { title: "Curated Fabrics", desc: "From organic cotton to premium silk, we only use materials that feel as good as they look." },
            { title: "Global Standards", desc: "Experience world-class quality checks and seamless integration from order to delivery." }
          ].map((item) => (
            <div key={item.title}>
              <h3 style={{ fontSize: "24px", marginBottom: "15px", borderBottom: "1px solid #333", paddingBottom: "10px" }}>{item.title}</h3>
              <p style={{ color: "#aaa" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL & SOCIAL PROOF */}
      <section style={{ padding: "100px 8%", textAlign: "center", background: "#fafafa" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "40px" }}>Community Voices</h2>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ fontSize: "24px", fontStyle: "italic", color: "#444", marginBottom: "20px" }}>
            The attention to detail in the embroidery of my Panjabi was breathtaking. It’s rare to find a brand that balances 
            tradition with such a clean, modern aesthetic.
          </p>
          <strong style={{ display: "block", fontSize: "18px" }}>— Arifin S., Verified Customer</strong>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: "100px 8%", textAlign: "center", background: "#fff" }}>
        <div style={{ background: "#f4f4f4", padding: "60px", borderRadius: "20px" }}>
          <h2 style={{ fontSize: "36px", marginBottom: "15px" }}>Join the Thread</h2>
          <p style={{ color: "#666", marginBottom: "30px", fontSize: "18px" }}>
            Sign up for early access to new drops and exclusive member-only styling tips.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                padding: "15px 20px",
                width: "350px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px"
              }}
            />
            <button
              style={{
                padding: "15px 40px",
                background: "#111",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "80px 8% 40px 8%", background: "#111", color: "white" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "60px", textAlign: "left" }}>
          <div>
            <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Dhaka Threads</h3>
            <p style={{ color: "#888" }}>Crafting the future of Bangladeshi fashion, one thread at a time.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: "15px" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0, color: "#888" }}>
              <li style={{ marginBottom: "8px" }}>Shop All</li>
              <li style={{ marginBottom: "8px" }}>New Arrivals</li>
              <li style={{ marginBottom: "8px" }}>Size Guide</li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: "15px" }}>Customer Care</h4>
            <ul style={{ listStyle: "none", padding: 0, color: "#888" }}>
              <li style={{ marginBottom: "8px" }}>Shipping Policy</li>
              <li style={{ marginBottom: "8px" }}>Returns & Exchanges</li>
              <li style={{ marginBottom: "8px" }}>Contact Us</li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #222", paddingTop: "30px", textAlign: "center", color: "#555" }}>
          <p>© 2026 Dhaka Threads. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;