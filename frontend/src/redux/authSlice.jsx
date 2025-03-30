import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("🟢 Redux loginSuccess Called with:", action.payload);

      if (!action.payload.token || !action.payload.user) {
        console.error("❌ Token or user data is missing in API response!");
        return;
      }

      // ✅ Store user data with isAdmin derived from role
      state.user = {
        ...action.payload.user,
        isAdmin: action.payload.user.role === "admin", // Fix here
      };
      state.token = action.payload.token;

      // ✅ Store in localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);

      console.log("✅ Updated User Stored:", localStorage.getItem("user"));
    },
    logout: (state) => {
      console.log("🔴 Logging out user...");
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
