import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [activeTab, setActiveTab] = useState('stats');
    const [allOrders, setAllOrders] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const token = localStorage.getItem('token');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "", 
        size: "M",    
        color: "Black", 
        image: null
    });

    useEffect(() => {
        fetchStats();
        fetchOrders();
        fetchProducts();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get('https://final-exam-delta-two.vercel.app/api/admin-dashboard/', {
                headers: { Authorization: `Token ${token}` }
            });
            setStats(res.data);
        } catch (err) { console.error("Stats error", err); }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get('https://final-exam-delta-two.vercel.app/api/orders/', {
                headers: { Authorization: `Token ${token}` }
            });
            setAllOrders(res.data);
        } catch (err) { console.error("Orders error", err); }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get('https://final-exam-delta-two.vercel.app/api/products/');
            setAllProducts(res.data);
        } catch (err) { console.error("Products error", err); }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(`https://final-exam-delta-two.vercel.app/api/orders/${orderId}/`, 
            { status: newStatus },
            { headers: { Authorization: `Token ${token}` } });
            fetchOrders(); 
            alert("Status Updated!");
        } catch { alert("Error updating status"); }
    };

    const deleteProduct = async (id) => {
        if(window.confirm("Delete this product?")) {
            try {
                await axios.delete(`https://final-exam-delta-two.vercel.app/api/products/${id}/`, {
                    headers: { Authorization: `Token ${token}` }
                });
                fetchProducts();
            } catch { alert("Delete failed"); }
        }
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setProductForm({ 
            name: "", description: "", price: "", stock: "", 
            category: "", size: "M", color: "Black", image: null 
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category, // Assuming backend sends category ID
            size: product.size,
            color: product.color,
            image: null 
        });
        setIsModalOpen(true);
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", productForm.name);
        data.append("description", productForm.description);
        data.append("price", productForm.price);
        data.append("stock", productForm.stock);
        data.append("category", productForm.category);
        data.append("size", productForm.size);
        data.append("color", productForm.color);
        
        if (productForm.image) data.append("image", productForm.image);

        try {
            const config = {
                headers: { 
                    Authorization: `Token ${token}`, 
                    "Content-Type": "multipart/form-data" 
                }
            };

            if (editingProduct) {
                await axios.patch(`https://final-exam-delta-two.vercel.app/api/products/${editingProduct.id}/`, data, config);
            } else {
                await axios.post(`https://final-exam-delta-two.vercel.app/api/products/`, data, config);
            }
            setIsModalOpen(false);
            fetchProducts();
            alert("Success!");
        } catch (err) {
            console.error(err.response?.data);
            alert("Action failed. Check fields and Category ID.");
        }
    };

    if (!stats) return <div className="loading">Loading Dashboard...</div>;

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Dhaka Threads Admin</h1>
                <div className="tab-menu">
                    <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>Insights</button>
                    <button onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>Products</button>
                    <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>Orders</button>
                </div>
            </header>

            {activeTab === 'stats' && (
                <div className="tab-content">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <p className="stat-title">Monthly Revenue</p>
                            <h2 className="stat-value text-green">৳{stats.current_month_sales || 0}</h2>
                        </div>
                        <div className="stat-card">
                            <p className="stat-title">Orders (30d)</p>
                            <h2 className="stat-value text-blue">{stats.orders_last_month}</h2>
                        </div>
                        <div className="stat-card">
                            <p className="stat-title">Top Buyers</p>
                            <h2 className="stat-value text-indigo">{stats.top_buyers?.length || 0}</h2>
                        </div>
                    </div>

                    <div className="details-grid">
                        <div className="list-container">
                            <h3>Top Customers</h3>
                            {stats.top_buyers?.map((user, i) => (
                                <div key={i} className="list-item">
                                    <span>{user}</span>
                                    <strong>VIP</strong>
                                </div>
                            ))}
                        </div>
                        <div className="list-container">
                            <h3>Trending Products</h3>
                            {stats.most_liked_products?.map((item, i) => (
                                <div key={i} className="list-item">
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'products' && (
                <div className="tab-content">
                    <div className="list-container full-width">
                        <div className="flex-header">
                            <h3>Manage Inventory</h3>
                            <button onClick={handleAddClick} className="add-btn">+ Add New Product</button>
                        </div>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProducts.map(p => (
                                    <tr key={p.id}>
                                        <td><img src={p.image} width="40" height="40" style={{objectFit: 'cover', borderRadius: '4px'}} alt="" /></td>
                                        <td>{p.name}</td>
                                        <td>৳{p.price}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(p)} className="edit-btn">Edit</button>
                                            <button onClick={() => deleteProduct(p.id)} className="delete-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="tab-content">
                    <div className="list-container full-width">
                        <h3>Customer Orders</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Change Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders.map(o => (
                                    <tr key={o.id}>
                                        <td>#{o.id}</td>
                                        <td>{o.full_name}</td>
                                        <td>৳{o.total_amount}</td>
                                        <td><span className={`status-badge ${o.status?.toLowerCase()}`}>{o.status}</span></td>
                                        <td>
                                            <select 
                                                defaultValue={o.status}
                                                onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Paid">Paid</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content stylish-form">
                        <div className="modal-header">
                            <h2>{editingProduct ? "Edit Product" : "New Product"}</h2>
                            <button className="close-x" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        
                        <form onSubmit={handleProductSubmit}>
                            <div className="input-group">
                                <label>Product Name</label>
                                <input 
                                    type="text" placeholder="e.g. Classic Panjabi" required
                                    value={productForm.name}
                                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                                />
                            </div>

                            <div className="input-group">
                                <label>Description</label>
                                <textarea 
                                    placeholder="Tell customers about this product..." required
                                    value={productForm.description}
                                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                                />
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Price (৳)</label>
                                    <input 
                                        type="number" placeholder="0.00" required
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Stock Count</label>
                                    <input 
                                        type="number" placeholder="10" required
                                        value={productForm.stock}
                                        onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Category ID</label>
                                    <input 
                                        type="number" placeholder="1, 2, etc." required
                                        value={productForm.category}
                                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Size</label>
                                    <select value={productForm.size} onChange={(e) => setProductForm({...productForm, size: e.target.value})}>
                                        <option value="S">Small</option>
                                        <option value="M">Medium</option>
                                        <option value="L">Large</option>
                                        <option value="XL">Extra Large</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label>Color</label>
                                    <select value={productForm.color} onChange={(e) => setProductForm({...productForm, color: e.target.value})}>
                                        <option value="Red">Red</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Black">Black</option>
                                        <option value="White">White</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Image Upload</label>
                                    <div className="custom-file-upload">
                                        <input 
                                            type="file" id="file-upload"
                                            onChange={(e) => setProductForm({...productForm, image: e.target.files[0]})}
                                        />
                                        <label htmlFor="file-upload" className="file-label">
                                            {productForm.image ? "Selected" : "Upload"}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                                <button type="submit" className="btn-primary">
                                    {editingProduct ? "Update Product" : "Add Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;