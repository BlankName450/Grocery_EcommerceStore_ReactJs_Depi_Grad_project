import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
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
          <button type="submit" style={styles.button}>Register</button>
        </form>

        <div style={styles.options}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
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