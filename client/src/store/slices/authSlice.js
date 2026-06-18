import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      return {
        user,
        token,
        isAuthenticated: true,
      };
    }
  } catch (e) {
    console.error("Failed to parse initial auth state:", e);
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
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
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
