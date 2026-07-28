import "./App.css";
import { Link, Routes, Route,Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"; 
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./components/Category";
 

export default function App() {
  const { isLoggedIn, handleLogout,handlePageReload } = useContext(AuthContext);
// fetching user record on initial render and on page reload -- sir wrote here but then said better in the auth page not here 
//     useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
     
//       axios
//         .get("http://localhost:3050/profile", {
//           headers: {
//             Authorization: token, 
//           },
//         })
//         .then((res) => {
          
//           handlePageReload(res.data)
//         })
//         .catch(() => {
//           handleLogout();
//         });
//     }
//   }, []);

//   // show loading if the user is already logged in,but user object is null-ex-when the user closes the website and reopens it later
// if(localStorage.getItem("token")&&!user){
//   return <p>loading...</p>
// }
  return (
    <div className="App">
      <h1>User Authentication System</h1>
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/category">Category</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              {/* Added Register option when unauthenticated */}
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>


<Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />
  
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/category" element={<Category />} />
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
  <Route
    path="/profile"
    element={
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    }
  />
</Routes>

    </div>
  );
}
