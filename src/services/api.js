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
  const response = await fetch(`${API_BASE}/reviews/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  return await response.json();
}

export async function getWishlist() {
  const response = await fetch(`${API_BASE}/wishlist/`);
  return await response.json();
}