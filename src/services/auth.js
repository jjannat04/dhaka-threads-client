const API = "https://final-exam-delta-two.vercel.app/api"

export async function registerUser(userData) {

  const res = await fetch(`${API}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })

  return res.json()
}

export async function loginUser(userData) {
  const res = await fetch(`${API}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  // Handle cases where the server might return an error status (400, 401, 500)
  const data = await res.json();
  
  // Just return the data to the component
  return data;
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // Force redirect on logout
}