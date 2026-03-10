import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#111", backgroundColor: "#fff", overflowX: "hidden" }}>
      
      {/* --- HERO: EMOTIVE & BOLD --- */}
      <section style={{ padding: "120px 8% 80px 8%", textAlign: "center", background: "linear-gradient(to bottom, #f9f9f9, #fff)" }}>
        <span style={{ letterSpacing: "6px", fontSize: "12px", fontWeight: "700", color: "#888", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>
          Our Heritage. Your Canvas.
        </span>
        <h1 style={{ fontSize: "clamp(45px, 7vw, 90px)", fontWeight: "900", margin: "0", letterSpacing: "-4px", lineHeight: "0.9" }}>
          Where Every Loop <br /> <span style={{ color: "#aaa" }}>Tells a Legend.</span>
        </h1>
      </section>

      {/* --- MAIN STORY IMAGE: THE LOOM --- */}
      <div style={{ width: "90%", margin: "0 auto", position: "relative" }}>
        <img 
          src="https://static.vecteezy.com/system/resources/thumbnails/048/925/205/small/traditional-indian-weaver-crafting-on-handloom-in-village-settingries-photo.jpeg" 
          alt="Traditional Bangladeshi Weaver" 
          style={{ width: "100%", height: "70vh", objectFit: "cover", borderRadius: "24px", boxShadow: "0 40px 100px rgba(0,0,0,0.1)" }}
        />
        <div style={{
          position: "absolute",
          bottom: "-40px",
          right: "40px",
          background: "#111",
          color: "white",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "300px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
        }}>
          <p style={{ margin: 0, fontSize: "14px", fontStyle: "italic", opacity: 0.8 }}>
            The rhythm of the loom is the heartbeat of Dhaka. We do not just weave cotton; we weave time.
          </p>
          <p style={{ margin: "15px 0 0 0", fontWeight: "700", fontSize: "12px", textTransform: "uppercase" }}>— Master Weaver, Jamdani Studio</p>
        </div>
      </div>

      {/* --- THE MANIFESTO --- */}
      <section style={{ padding: "120px 8%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "100px", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "42px", fontWeight: "900", marginBottom: "30px", letterSpacing: "-1px" }}>The Soul of <br/>Dhaka Threads</h2>
          <p style={{ fontSize: "20px", color: "#444", lineHeight: "1.8", marginBottom: "20px" }}>
            In an era of disposable fashion, we chose the path of <strong>slow craft</strong>. Dhaka Threads was born from a desire to bridge the gap between the ancient looms of Sonargaon and the modern streets of Dhanmondi.
          </p>
          <p style={{ fontSize: "18px", color: "#666", lineHeight: "1.8" }}>
            Our artisans are not workers; they are historians. Using techniques passed down through six generations, they manipulate natural fibers into textiles that breathe, move, and age with grace. We use 100% organic cotton and hand-spun silk, ensuring every garment is a living piece of art.
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <img src="https://thekindcraft.com/content/images/size/w1200/2024/11/peru1_988.jpg" style={{ width: "100%", borderRadius: "20px" }} alt="Artisan Hands" />
          <div style={{ position: "absolute", top: "-20px", left: "-20px", width: "100px", height: "100px", border: "10px solid #eee", borderRadius: "50%", zIndex: -1 }} />
        </div>
      </section>

      {/* --- MEET THE ARTISANS: GRID SECTION --- */}
      <section style={{ padding: "100px 8%", background: "#111", color: "white" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2 style={{ fontSize: "48px", fontWeight: "900" }}>The Hands Behind the Thread</h2>
          <p style={{ color: "#888", maxWidth: "600px", margin: "20px auto" }}>Meet the master craftsmen who bring our vision to life using century-old techniques.</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
          {[
            { name: "Rafiqul Islam", role: "Master Jamdani Weaver", bio: "40 years of experience in intricate geometry.", img: "https://www.shutterstock.com/editorial/image-editorial/M1T7M00fNcz8Uaw7NjA3MDI=/weaver-abu-hossain-last-generation-carry-forward-440nw-13359553u.jpg" },
            { name: "Fatema Begum", role: "Natural Dye Expert", bio: "Specializes in indigo and madder root ferments.", img: "data:image/jpeg;base64,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" },
            { name: "Zahir Uddin", role: "Embroidery Specialist", bio: "Brings modern aesthetics to Nakshi Kantha.", img: "https://garlandmag.com/wp-content/uploads/2023/11/K9A3116-e1700096483516.jpg" }
          ].map((artisan, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ height: "400px", overflow: "hidden", borderRadius: "15px", marginBottom: "20px" }}>
                <img src={artisan.img} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) brightness(0.8)" }} alt={artisan.name} />
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "5px" }}>{artisan.name}</h3>
              <p style={{ color: "#aaa", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", marginBottom: "10px" }}>{artisan.role}</p>
              <p style={{ color: "#666", fontSize: "16px" }}>{artisan.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- OUR PROCESS: STEP BY STEP --- */}
      <section style={{ padding: "120px 8%" }}>
        <h2 style={{ fontSize: "42px", fontWeight: "900", marginBottom: "60px", textAlign: "center" }}>The Journey of a Garment</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
          {[
            { step: "01", title: "Sourcing", desc: "We select the finest long-staple cotton from local farmers." },
            { step: "02", title: "Spinning", desc: "The yarn is hand-spun to create a unique, organic texture." },
            { step: "03", title: "Weaving", desc: "Months of work on traditional wooden handlooms." },
            { step: "04", title: "Tailoring", desc: "Modern cuts meet traditional fabric in our Dhaka studio." }
          ].map((item, i) => (
            <div key={i} style={{ padding: "30px", borderLeft: "1px solid #eee" }}>
              <span style={{ fontSize: "60px", fontWeight: "900", color: "#f0f0f0", display: "block", marginBottom: "-30px" }}>{item.step}</span>
              <h4 style={{ fontSize: "20px", fontWeight: "800", position: "relative", zIndex: 1 }}>{item.title}</h4>
              <p style={{ color: "#666", marginTop: "10px" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- LARGE IMPACT IMAGE --- */}
      <section style={{ padding: "0 8% 100px 8%" }}>
        <div style={{ 
          height: "500px", 
          background: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470')", 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          borderRadius: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center"
        }}>
          <div style={{ background: "rgba(0,0,0,0.4)", padding: "60px", borderRadius: "30px", backdropFilter: "blur(5px)" }}>
            <h2 style={{ fontSize: "48px", fontWeight: "900" }}>Empowering 250+ Families</h2>
            <p style={{ fontSize: "20px", maxWidth: "500px", margin: "20px auto" }}>Every purchase directly supports the preservation of traditional weaving communities.</p>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section style={{ padding: "100px 8% 150px 8%", textAlign: "center" }}>
        <h2 style={{ fontSize: "42px", fontWeight: "900", marginBottom: "40px" }}>Be Part of the Story.</h2>
        <Link to="/products">
          <button style={{
            padding: "22px 60px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "18px",
            fontWeight: "800",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}
          onMouseEnter={(e) => e.target.style.background = "#333"}
          onMouseLeave={(e) => e.target.style.background = "#111"}
          >
            Explore Collection
          </button>
        </Link>
      </section>
    </div>
  );
}

export default About;