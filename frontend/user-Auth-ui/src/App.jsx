import "./App.css";
import { Link, Routes, Route,Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"; 
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/Auth";
import PrivateRoute from "./components/PrivateRoute";
 

export default function App() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
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
