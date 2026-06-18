import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logOut } from "../store/slices/authSlice.js";
import { useLoginMutation, useRegisterMutation } from "../store/api/eventApi.js";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  const [loginApi, { isLoading: isLoggingIn, error: loginError }] = useLoginMutation();
  const [registerApi, { isLoading: isRegistering, error: registerError }] = useRegisterMutation();

  const login = async (email, password) => {
    const result = await loginApi({ email, password }).unwrap();
    // result contains { token, name, email }
    dispatch(
      setCredentials({
        user: { name: result.name, email: result.email },
        token: result.token,
      })
    );
    return result;
  };

  const register = async (name, email, password) => {
    const result = await registerApi({ name, email, password }).unwrap();
    return result;
  };

  const logout = () => {
    dispatch(logOut());
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
