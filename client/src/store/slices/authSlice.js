import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const token = localStorage.getItem("sms_token") || null;
  let user = null;
  try {
    const storedUser = localStorage.getItem("sms_user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (e) {
    console.error("Failed to parse initial auth state:", e);
  }

  return {
    user,
    token,
    isAuthenticated: !!token,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("sms_token", token);
      localStorage.setItem("sms_user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("sms_token");
      localStorage.removeItem("sms_user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;


