import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import API_URL from "../../config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.user, data.token); // store user in context
      alert("Login successful!");
      navigate("/"); // redirect to home
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={styles.options}>
          Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f3f4f6" },
  card: { width: "400px", padding: "40px", borderRadius: "12px", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", textAlign: "center" },
  title: { marginBottom: "20px", fontSize: "24px", fontWeight: 600 },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" },
  button: { padding: "12px", fontSize: "16px", borderRadius: "8px", border: "none", background: "#222", color: "#fff", cursor: "pointer", fontWeight: 500 },
  options: { marginTop: "15px" },
  link: { color: "#007bff", textDecoration: "none", fontWeight: 500 },
};