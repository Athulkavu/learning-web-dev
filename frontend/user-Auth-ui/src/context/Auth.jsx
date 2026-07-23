import { useReducer, createContext, useEffect } from "react";
import reducer from "../reducers/auth-reducer.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
};

export function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
     
      axios
        .get("http://localhost:3050/profile", {
          headers: {
            Authorization: token, 
          },
        })
        .then((res) => {
          const user = res.data;
          dispatch({ type: "LOGIN", payload: user });
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, []);

  const handleLogin = (user, token) => {
    dispatch({ type: "LOGIN", payload: user });
    localStorage.setItem("token", token); 
    navigate("/dashboard");
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token"); 
    navigate("/login");
  };

 return (
    <AuthContext.Provider
      value={{ ...state, dispatch, handleLogin, handleLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}


