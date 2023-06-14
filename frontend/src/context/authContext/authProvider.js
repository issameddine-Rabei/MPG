import { createContext, useContext, useReducer } from "react";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  authReducer,
  initialAuthState,
} from "./authReducer";
import axios from "axios";
import { LOGIN_FAILED } from "./authReducer";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = (user) => {
    dispatch({
      type: LOGIN,
    });

    axios
      .post("http://localhost:8000/api/v1/users/login", user)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: LOGIN_FAILED,
        })
      );
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
