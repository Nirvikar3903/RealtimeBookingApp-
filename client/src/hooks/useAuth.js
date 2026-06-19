import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout as logoutAction } from "../store/slices/authSlice.js";
import axiosInstance from "../utils/axiosInstance.js";
import { useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const login = async (email, password) => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const response = await axiosInstance.post("/api/auth/login", { email, password });
      const result = response.data;
      dispatch(
        setCredentials({
          user: {
            name: result.name,
            email: result.email,
            birthdate: result.birthdate,
            phone: result.phone,
          },
          token: result.token,
        })
      );
      return result;
    } catch (err) {
      const errorData = err.response?.data || { message: err.message };
      setLoginError(errorData);
      throw errorData;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const register = async (name, email, password) => {
    setIsRegistering(true);
    setRegisterError(null);
    try {
      const response = await axiosInstance.post("/api/auth/register", { name, email, password });
      return response.data;
    } catch (err) {
      const errorData = err.response?.data || { message: err.message };
      setRegisterError(errorData);
      throw errorData;
    } finally {
      setIsRegistering(false);
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    isLoggingIn,
    isRegistering,
    loginError,
    registerError,
  };
};

export default useAuth;

