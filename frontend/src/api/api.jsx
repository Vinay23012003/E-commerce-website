import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Update this with your backend URL

// Utility function for handling API errors
const handleError = (error) => {
    console.error(error);
    return { success: false, error: error.response?.data?.message || "Something went wrong" };
};

// ✅ Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// ✅ Fetch a single product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// ✅ Add a new product (Admin)
export const addProduct = async (product, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, product, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        return { success: true, product: response.data };
    } catch (error) {
        return handleError(error);
    }
};

// ✅ Update an existing product (Admin)
export const updateProduct = async (id, updatedProduct, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/products/${id}`, updatedProduct, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        return { success: true, product: response.data };
    } catch (error) {
        return handleError(error);
    }
};

// ✅ Delete a product (Admin)
export const deleteProduct = async (id, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// ✅ Place an order (User)
export const placeOrder = async (orderData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders/place`, orderData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// ✅ Fetch user orders (User)
export const fetchUserOrders = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/user`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// ✅ Fetch all orders (Admin)
export const fetchAllOrders = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/all`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// ✅ Update order status (Admin)
export const updateOrderStatus = async (orderId, status, token) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/orders/update-status`,
            { orderId, status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};


export const deleteOrder = async (orderId, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error.response?.data?.message || error.message);
      throw error;
    }
  };



// Submit Contact Form API
export const submitContactForm = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/contact/submit`, formData);
    return response.data;
};

// Get All Contacts (Admin Only)
export const getAllContacts = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/contact/all`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// ✅ Delete Contact Message (Admin)
export const deleteContactMessage = async (id, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/contact/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("🔴 Error deleting contact:", error);
        throw error;
    }
};

// ✅ Signup API
export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

// ✅ Login API
export const loginUser = async (userData) => {
    try {
        console.log("🔵 Sending Login Request with Data:", userData);
        const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
        
        console.log("🟢 Login API Response:", response.data); // ✅ Debug API Response

        return response.data;
    } catch (error) {
        console.error("🔴 Login API Error:", error.response ? error.response.data : error);
        return handleError(error);
    }
};


//  ✅ Fetch User Profile
export const getProfile = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};
