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


  // const handlePageReload=(user)=>{
  //   // const users = user;
  //   dispatch({ type: "LOGIN", payload: user });
  //   navigate("/dashboard");
  // }

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
//   // show loading if the user is already logged in,but user object is null-ex-when the user closes the website and reopens it later
// if(localStorage.getItem("token")&&!user){
//   return <p>loading...</p>
// }// try to implemnyt this to avoid the if(!user) in every page
 return (
    <AuthContext.Provider
      value={{ ...state, dispatch, handleLogin, handleLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}


