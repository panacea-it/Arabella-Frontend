import { createSlice } from "@reduxjs/toolkit";

// Helper to safely read from SESSION STORAGE
const getUserFromStorage = () => {
  try {
    const user = sessionStorage.getItem("user"); // ✅ Changed to sessionStorage
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

// Initial state reads from Session Storage to survive page reloads
const initialState = {
  user: getUserFromStorage(),
  token: sessionStorage.getItem("accessToken") || null, // ✅ Changed to sessionStorage
  isAuthenticated: !!sessionStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("🔐 AuthSlice: Setting Credentials...");
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // ✅ Save to Session Storage (Persists on refresh, clears on tab close)
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("accessToken", token);
      console.log("✅ AuthSlice: Saved to SessionStorage");
    },
    logout: (state) => {
      console.log("👋 AuthSlice: Logging Out...");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // ✅ Clear Session Storage on Logout
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("accessToken");
      console.log("✅ AuthSlice: Cleared SessionStorage");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
