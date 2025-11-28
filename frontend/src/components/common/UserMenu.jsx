import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function UserMenuBox() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const boxRef = useRef();

  const handleToggle = () => setOpen(prev => !prev);

  // Close box if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!user) return null; // hide box if not logged in

  return (
    <div style={{ position: "relative" }} ref={boxRef}>
      <span
        style={{ cursor: "pointer" }}
        onClick={handleToggle}
        title="User menu"
      >
        <FontAwesomeIcon icon={faUser} size="lg" />
      </span>

      {open && (
        <div style={styles.box}>
          <div style={styles.username}>Hello, {user.name}</div>
          <Link to="/orders" style={styles.link}>My Orders</Link>
          <button style={styles.logout} onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  box: {
    position: "absolute",
    top: "30px",
    right: 0,
    width: "180px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    textAlign: "center",
    zIndex: 999,
  },
  username: {
    fontWeight: 600,
    marginBottom: "8px",
  },
  link: {
    display: "block",
    margin: "6px 0",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: 500,
  },
  logout: {
    padding: "6px",
    width: "100%",
    border: "none",
    borderRadius: "6px",
    background: "#e53e3e",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    marginTop: "6px",
  },
};
