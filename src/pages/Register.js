// ./pages/Register.js
import { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register({ fullName, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <input
        placeholder="Name"
        style={styles.input}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        placeholder="Email"
        style={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        style={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleRegister}>
        Register
      </button>
      <hr />
      <p style={{ marginTop: "20px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: { width: "350px", margin: "80px auto", display: "flex", flexDirection: "column" },
  input: { margin: "10px 0", padding: "10px" },
  button: { padding: "10px", marginTop: "10px" },
};

export default Register;