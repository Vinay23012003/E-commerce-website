import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderHistory from "./pages/OrderHistory";
import AdminDashboard from "./admin/AdminDashboard";
import EditProduct from "./pages/EditProducts";
import AddProduct from "./pages/AddProducts";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import Contact from "./pages/Contact";
import AdminContact from "./admin/AdminContact";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminRoute from "./components/AdminRoute";

function App() {
    return (
        <Router>
            <Navbar />
            <main className="pt-20">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/edit-product/:id" element={<EditProduct />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/admin-products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                    <Route path="/admin-orders" element={<AdminRoute> <AdminOrders /></AdminRoute>} />
                    <Route path="/admindashboard" element={<AdminRoute><AdminDashboard /></AdminRoute> } />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin-contact" element={<AdminContact />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>

            <Footer />
        </Router>
    );
}

export default App;
