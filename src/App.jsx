import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import Activate from "./pages/Activate";
import Success from "./pages/Success";
import AdminDashboard from './components/AdminDashboard';

// Inside your <Routes>


// Inside <Routes>...

function App() {
  return (
    <>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/payment/success" element={<Success />} />
      <Route path="/activate/:uid/:token" element={<Activate />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
    
    </>
  )
}

export default App