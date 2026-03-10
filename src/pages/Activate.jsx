import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function Activate() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function activateAccount() {
      try {
        const res = await fetch(`https://final-exam-delta-two.vercel.app/api/activate/${uid}/${token}/`, {
          method: "GET",
        });

        if (res.ok) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 4000);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }
    activateAccount();
  }, [uid, token, navigate]);

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
        textAlign: "center",
        width: "100%",
        maxWidth: "450px",
        padding: "clamp(25px,5vw,40px)",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.05)"
      }}>
        
        {status === "loading" && (
          <>
            <div className="spinner"
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #111",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px"
              }}
            />
            <h2 style={{ fontSize: "22px" }}>Verifying your account...</h2>
            <p style={{ color: "#666" }}>
              Please wait while we finalize your Dhaka Threads membership.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={{ fontSize: "50px", marginBottom: "20px" }}>✅</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#2ecc71" }}>
              Account Activated!
            </h2>
            <p style={{ color: "#666", marginBottom: "25px" }}>
              Success! Your email has been verified. You are being redirected to login...
            </p>
            <Link to="/login" style={{ color: "#111", fontWeight: "600", textDecoration: "underline" }}>
              Click here if not redirected
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ fontSize: "50px", marginBottom: "20px" }}>❌</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#e74c3c" }}>
              Activation Failed
            </h2>
            <p style={{ color: "#666", marginBottom: "25px" }}>
              The activation link is invalid or expired.
            </p>
            <Link
              to="/register"
              style={{
                padding: "12px 25px",
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "8px"
              }}
            >
              Back to Registration
            </Link>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Activate;