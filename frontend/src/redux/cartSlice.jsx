import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/cart"; // 🔗 Backend URL

// ✅ Load Cart from Backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data?.products || [];
    } catch (error) {
        console.error("🚨 Fetch Cart Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "Error fetching cart");
    }
});

// ✅ Add to Cart
export const addToCart = createAsyncThunk("cart/addToCart", async (product, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        await axios.post(`${API_URL}/add`, { productId: product._id, quantity: 1 }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return product;
    } catch (error) {
        console.error("🚨 Add to Cart Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "Error adding to cart");
    }
});

// ✅ Remove from Cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/remove`, {
            data: { productId },
            headers: { Authorization: `Bearer ${token}` }
        });

        return productId;  // ✅ Redux Store से भी हटाएं
    } catch (error) {
        console.error("🚨 Remove from Cart Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "Error removing from cart");
    }
});

// ✅ Clear Cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/clear`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return [];
    } catch (error) {
        console.error("🚨 Clear Cart Error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || "Error clearing cart");
    }
});

// ✅ Redux Cart Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        status: "idle",
        error: null
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.status = "success";
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const existingItem = state.cartItems.find(item => item._id === action.payload._id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.cartItems.push({ ...action.payload, quantity: 1 });
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.cartItems = [];
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer;
