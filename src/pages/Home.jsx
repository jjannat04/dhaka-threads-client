import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [isHovered, setIsHovered] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "The New Era of Dhaka Style",
      subtitle: "COLLECTION 01",
      img: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1400",
    },
    {
      title: "Heritage Meets Modernity",
      subtitle: "PREMIUM SILKS",
      img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400",
    },
    {
      title: "Crafted for the Discerning",
      subtitle: "ETHICAL COTTON",
      img: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1400",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#111", lineHeight: "1.6", backgroundColor: "#fff", overflowX: "hidden" }}>
      
      {/* --- DYNAMIC HERO CAROUSEL --- */}
      <section style={{ position: "relative", height: "90vh", width: "100%", overflow: "hidden", background: "#000" }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: activeSlide === index ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              zIndex: activeSlide === index ? 1 : 0
            }}
          >
            <div style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, rgba(0,0,0,0.7) 20%, transparent 80%)",
              zIndex: 2
            }} />
            <img src={slide.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Hero" />
            
            <div style={{
              position: "absolute",
              top: "50%",
              left: "8%",
              transform: "translateY(-50%)",
              color: "white",
              zIndex: 3,
              maxWidth: "700px"
            }}>
              <p style={{ letterSpacing: "4px", fontSize: "14px", fontWeight: "700", marginBottom: "20px", color: "#aaa" }}>{slide.subtitle}</p>
              <h1 style={{ fontSize: "clamp(40px, 8vw, 85px)", lineHeight: "0.9", fontWeight: "900", marginBottom: "30px", letterSpacing: "-3px" }}>
                {slide.title}
              </h1>
              <Link to="/products">
                <button style={{
                  padding: "18px 40px",
                  background: "white",
                  color: "black",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "16px"
                }}>Explore Now</button>
              </Link>
            </div>
          </div>
        ))}
        {/* Carousel Indicators */}
        <div style={{ position: "absolute", bottom: "40px", left: "8%", zIndex: 4, display: "flex", gap: "10px" }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setActiveSlide(i)} style={{ width: activeSlide === i ? "40px" : "10px", height: "4px", background: "white", cursor: "pointer", transition: "0.3s" }} />
          ))}
        </div>
      </section>

      {/* --- SCROLLING MARQUEE --- */}
      <div style={{ background: "#111", color: "#fff", padding: "20px 0", overflow: "hidden", whiteSpace: "nowrap", display: "flex", borderBottom: "1px solid #333" }}>
        <div style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "10px", textTransform: "uppercase", display: "inline-block", paddingLeft: "100%", animation: "marquee 20s linear infinite" }}>
          DHAKA THREADS • ETHICALLY SOURCED • HANDCRAFTED HERITAGE • PREMIUM QUALITY • DHAKA THREADS • 
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-100%, 0); }
          }
        `}</style>
      </div>

      {/* --- TRUST STATS BAR --- */}
      <section style={{ display: "flex", justifyContent: "space-around", padding: "60px 8%", borderBottom: "1px solid #eee" }}>
        {[
          { label: "Happy Customers", val: "10k+" },
          { label: "Artisans Employed", val: "250+" },
          { label: "Design Awards", val: "12" },
          { label: "Sustainability Score", val: "98%" }
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "900", margin: 0 }}>{stat.val}</h2>
            <p style={{ color: "#888", fontSize: "12px", textTransform: "uppercase", fontWeight: "700" }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* --- CATEGORIES GRID --- */}
      <section style={{ padding: "100px 8%" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2 style={{ fontSize: "48px", fontWeight: "900", letterSpacing: "-1px" }}>Shop the Essentials</h2>
          <div style={{ width: "60px", height: "4px", background: "#111", margin: "20px auto" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {[
            { id: 1, name: "Panjabi", img: "https://images.unsplash.com/photo-1684688635718-9839255b7061?q=80&w=1188" },
            { id: 2, name: "Saree", img: "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=1074" },
            { id: 3, name: "T-Shirts", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b" }
          ].map((cat) => (
            <Link to="/products" key={cat.id} style={{ textDecoration: "none", color: "inherit" }}>
              <div 
                onMouseEnter={() => setIsHovered(cat.id)}
                onMouseLeave={() => setIsHovered(null)}
                style={{ cursor: "pointer", position: "relative", overflow: "hidden", borderRadius: "8px" }}
              >
                <div style={{ height: "600px", overflow: "hidden" }}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      transition: "1.2s cubic-bezier(0.19, 1, 0.22, 1)",
                      transform: isHovered === cat.id ? "scale(1.1)" : "scale(1)"
                    }}
                  />
                </div>
                <div style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "30px",
                  color: "white",
                  zIndex: 2
                }}>
                  <h3 style={{ fontSize: "32px", fontWeight: "800", margin: 0 }}>{cat.name}</h3>
                  <p style={{ margin: "5px 0 0 0", fontSize: "14px", opacity: 0.8 }}>EXPLORE COLLECTION →</p>
                </div>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)", zIndex: 1 }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- EDITORIAL LOOKBOOK --- */}
      <section style={{ padding: "100px 8%", background: "#fdfdfd" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <img src="https://images.stockcake.com/public/c/b/8/cb816dbf-e2e3-45f2-9af1-7b635b199369_large/traditional-weaving-art-stockcake.jpg" style={{ width: "100%", borderRadius: "20px", boxShadow: "0 40px 80px rgba(0,0,0,0.1)" }} alt="Model" />
          </div>
          <div style={{ flex: 1, minWidth: "300px", padding: "40px" }}>
            <span style={{ color: "#888", fontWeight: "700", letterSpacing: "2px" }}>OUR STORY</span>
            <h2 style={{ fontSize: "42px", fontWeight: "900", margin: "20px 0" }}>Beyond the Fabric</h2>
            <p style={{ fontSize: "18px", color: "#555", marginBottom: "30px" }}>
              Founded in Dhaka, we believe that fashion is a thread that connects our rich history to our vibrant future. 
              We do not just sell clothes; we preserve the dying arts of traditional weaving and give them a global stage.
            </p>
            <Link to="/about" style={{ color: "#111", fontWeight: "800", textDecoration: "none", borderBottom: "2px solid #111" }}>Read Full Story</Link>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER GLASS CARD --- */}
      <section style={{ padding: "100px 8%" }}>
        <div style={{ 
          background: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1548')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 40px",
          borderRadius: "30px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "900", color: "#fff", marginBottom: "20px" }}>Join the Thread</h2>
            <p style={{ color: "#ccc", marginBottom: "40px" }}>Sign up for early access to limited edition drops.</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{ flex: 1, padding: "18px 25px", borderRadius: "50px", border: "none", outline: "none", fontSize: "16px" }}
              />
              <button style={{ padding: "18px 40px", background: "#fff", color: "#111", border: "none", borderRadius: "50px", fontWeight: "800", cursor: "pointer" }}>Join Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ padding: "100px 8% 40px 8%", background: "#000", color: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "60px", marginBottom: "80px" }}>
          <div>
            <h3 style={{ fontSize: "28px", fontWeight: "900", marginBottom: "20px" }}>DHAKA THREADS.</h3>
            <p style={{ color: "#666" }}>Elevating traditional silhouettes for a modern world.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: "700", marginBottom: "25px" }}>Collections</h4>
            <ul style={{ listStyle: "none", padding: 0, color: "#666", lineHeight: "2.5" }}>
              <li><Link to="/products" style={{ color: "inherit", textDecoration: "none" }}>Shop All</Link></li>
              <li>New Arrivals</li>
              <li>Limited Drops</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: "700", marginBottom: "25px" }}>Help</h4>
            <ul style={{ listStyle: "none", padding: 0, color: "#666", lineHeight: "2.5" }}>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: "700", marginBottom: "25px" }}>Social</h4>
            <div style={{ display: "flex", gap: "20px", color: "#666" }}>
              <span>Instagram</span>
              <span>Facebook</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #111", paddingTop: "40px", textAlign: "center", color: "#333", fontSize: "14px" }}>
          <p>© 2026 Dhaka Threads. Handmade in Bangladesh.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;