// ./pages/Login.js
import { useState } from "react";
import { login } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await login({ email, password });

    const userData = response.data.data;

    loginUser(userData);

    if (userData.role === "ROLE_OWNER") {
      navigate("/owner/dashboard");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div style={styles.container}>
      <h2>Login</h2>
<input
  type="email"
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
      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>
      <hr />
      <button style={styles.google}>Continue with Google</button>
      <p style={{ marginTop: "20px" }}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: { width: "350px", margin: "80px auto", display: "flex", flexDirection: "column" },
  input: { margin: "10px 0", padding: "10px" },
  button: { padding: "10px", marginTop: "10px" },
  google: { padding: "10px", background: "#4285F4", color: "white", border: "none" },
};

export default Login;