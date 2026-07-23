import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrmessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrmessage("All fields are required");
      return;
    }

    const formData = { email, password };

    axios
      .post("http://localhost:3050/register", formData)
      .then(() => {
        setErrmessage("");
        setEmail("");
        setPassword("");
        navigate("/login"); 
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          // Extracts the exact validator message from the backend response array
          setErrmessage(error.response.data.errors[0].msg);
        } else {
          setErrmessage("Registration failed. Email might be taken.");
        }
      });
  };

  return (
    <div>
      <h2>Register Component</h2>
      {errMessage && <p className="error" style={{ color: "red" }}>{errMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}
