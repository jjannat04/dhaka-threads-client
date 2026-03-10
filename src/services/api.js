const API_BASE = "https://final-exam-delta-two.vercel.app/api"

export async function getProducts() {
  const response = await fetch(`${API_BASE}/products/`)
  const data = await response.json()
  return data
}
export async function getProduct(id) {
  const response = await fetch(`${API_BASE}/products/${id}/`)
  const data = await response.json()
  return data
}
export async function getProductReviews(id) {
  const response = await fetch(`${API_BASE}/products/${id}/reviews/`)
  const data = await response.json()
  return data
}
export async function createReview(reviewData) {
  const response = await fetch(`${API_BASE}/reviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })

  const data = await response.json()
  return data
}
export async function getWishlist() {
  const response = await fetch(`${API_BASE}/wishlist/`)
  const data = await response.json()
  return data
}