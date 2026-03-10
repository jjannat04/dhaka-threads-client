// This is your Django Backend URL
export const API_BASE = "https://final-exam-delta-two.vercel.app/api";

export async function getProducts() {
  const response = await fetch(`${API_BASE}/products/`);
  return await response.json();
}

export async function getProduct(id) {
  const response = await fetch(`${API_BASE}/products/${id}/`);
  return await response.json();
}

export async function getProductReviews(id) {
  const response = await fetch(`${API_BASE}/products/${id}/reviews/`);
  return await response.json();
}

export async function createReview(reviewData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}/reviews/`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Token ${token}` 
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Review Error:", errorData);
    throw new Error("Failed to post review");
  }

  return await response.json();
}

export async function getWishlist() {
  const response = await fetch(`${API_BASE}/wishlist/`);
  return await response.json();
}