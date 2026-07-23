import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth.jsx";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrmessage] = useState("");
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrmessage("All fields are required");
      return;
    }

    const formData = { email, password };

    // 🟢 POST request to your backend login route
    axios
      .post("http://localhost:3050/login", formData)
      .then((res) => {
        const token = res.data.token;

        // Fetch user profile immediately using the received token
        return axios
          .get("http://localhost:3050/profile", {
            headers: { Authorization: token },
          })
          .then((profileRes) => {
            handleLogin(profileRes.data, token);
            setErrmessage("");
          });
      })
      .catch((error) => {
        // Read the custom express-validator structure from your controller
        if (error.response && error.response.data) {
          const data = error.response.data;
          if (data.errors && data.errors.length > 0) {
            setErrmessage(data.errors[0].msg);
          } else if (data.message) {
            setErrmessage(data.message);
          } else {
            setErrmessage("Invalid email or password");
          }
        } else {
          setErrmessage("Server error. Try again later.");
        }
      });
  };

  return (
    <div>
      <h2>Login Component</h2>
      {errMessage && <p className="error">{errMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
}
