import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrmessage] = useState("");
  const [success,setSuccess]=useState(false);
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
  const handleCheck=(e)=>{
    const {name,value}=e.target;
    axios.get(`http://localhost:3050/check-field?field=${name}&value=${value}`)//HERE 2 field and value we send b/c sir have  username and email to check but we have only one but in BE we followed sirs code for this api only
    .then((response)=>{
      console.log(response.data);
      setSuccess(false)
    })
    .catch((err)=>{
      console.log(err.response.data);
      setSuccess(true)
    })
  }
  return (
    <div>
      <h2>Register Component</h2>
      {errMessage && <p className="error" style={{ color: "red" }}>{errMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleCheck}
            placeholder="Enter Email"
          />{success&&<p className="error" style={{ color: "red" }}>email is already taken</p>}
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
