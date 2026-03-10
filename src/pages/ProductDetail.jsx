import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useCallback } from "react";
import { CartContext } from "../context/CartContext";
import { getProduct, getProductReviews, createReview } from "../services/api";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Use callback to fix the dependency warning and allow re-use in handleReviewSubmit
  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      const [productData, reviewData] = await Promise.all([
        getProduct(id),
        getProductReviews(id)
      ]);
      setProduct(productData);
      setReviews(reviewData);
    } catch (err) {
      console.error("Error loading product details", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]); // loadData is now a stable dependency

  async function handleReviewSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    await createReview({
      product: id,
      rating: rating,
      comment: comment
    });

    setComment("");
    setRating(5);
    await loadData(); 
  }

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "100px", fontSize: "20px" }}>
      Gathering details...
    </div>
  );

  if (!product) return <p style={{ textAlign: "center", padding: "50px" }}>Product not found.</p>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Inter', sans-serif" }}>
      
      {/* UPPER SECTION: PRODUCT INFO */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "60px", marginBottom: "80px" }}>
        
        {/* IMAGE LEFT */}
        <div style={{ background: "#f9f9f9", borderRadius: "12px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "auto", objectFit: "cover", maxHeight: "700px" }}
          />
        </div>

        {/* DETAILS RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "42px", marginBottom: "10px", fontWeight: "700", color: "#111" }}>{product.name}</h1>
          <p style={{ fontSize: "28px", color: "#d32f2f", fontWeight: "600", marginBottom: "20px" }}>৳{product.price}</p>
          
          <div style={{ marginBottom: "30px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <p style={{ marginBottom: "10px" }}><strong>Category:</strong> {product.category?.name || 'Lifestyle'}</p>
            <p style={{ marginBottom: "10px" }}><strong>Available Sizes:</strong> <span style={{ background: "#eee", padding: "4px 12px", borderRadius: "4px", fontSize: "14px" }}>{product.size}</span></p>
            <p style={{ marginBottom: "10px" }}><strong>Color:</strong> {product.color}</p>
          </div>

          <p style={{ lineHeight: "1.8", color: "#555", fontSize: "16px", marginBottom: "40px" }}>
            {product.description || "Indulge in our premium collection crafted with precision. This piece embodies the essence of Dhaka Threads—blending tradition with a contemporary silhouette perfect for any occasion."}
          </p>

          <button 
            onClick={() => addToCart(product)}
            style={{
              padding: "18px",
              background: "#111",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "60px 0" }} />
      <div>
  <h3>{product.name}</h3>
  {/* Add this line to show the rating */}
  <div className="rating">
    Rating: ⭐ {product.average_rating || "No reviews yet"} 
    <span> ({product.review_count} reviews)</span>
  </div>
</div>

      {/* LOWER SECTION: REVIEWS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "80px" }}>
        
        {/* REVIEW FORM */}
        <div>
          <h3 style={{ fontSize: "24px", marginBottom: "25px" }}>Customer Feedback</h3>
          <form onSubmit={handleReviewSubmit} style={{ background: "#fcfcfc", padding: "30px", borderRadius: "12px", border: "1px solid #f0f0f0" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Your Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ddd" }}
              >
                {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Comments</label>
              <textarea
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", minHeight: "120px", fontFamily: "inherit" }}
              />
            </div>

            <button type="submit" style={{ width: "100%", padding: "14px", background: "#444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
              Post Review
            </button>
          </form>
        </div>

        {/* REVIEW LIST */}
        <div>
          <h3 style={{ fontSize: "24px", marginBottom: "25px" }}>Reviews ({reviews.length})</h3>
          {reviews.length === 0 ? (
            <p style={{ color: "#888", fontStyle: "italic" }}>No reviews yet. Be the first to review!</p>
          ) : (
            <div style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
              {reviews.map((review) => (
                <div key={review.id} style={{ padding: "20px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#f39c12", fontWeight: "bold" }}>{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
                    <span style={{ fontSize: "12px", color: "#999" }}>Verified Purchase</span>
                  </div>
                  <p style={{ color: "#333", fontSize: "15px", lineHeight: "1.5" }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;