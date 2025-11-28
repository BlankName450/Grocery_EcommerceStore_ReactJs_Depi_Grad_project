import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";

export default function CartPage() {
  const { cart, updateQty, clearCart } = useCart(); // global cart
  const { user, token } = useUser(); // user and JWT token
  const [items, setItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState("");

  const deliveryPrice = 50; // fixed delivery
  const deliveryTime = "30-45 mins";

  // Load product details from DB
  useEffect(() => {
    async function loadItems() {
      const results = [];
      for (let c of cart) {
        try {
          const res = await fetch(`http://localhost:5000/api/products/${c._id}`);
          const data = await res.json();
          results.push({ ...data, qty: c.qty });
        } catch (e) {
          console.log("Error loading product", e);
        }
      }
      setItems(results);
    }
    loadItems();
  }, [cart]);

  // Total calculation
  const totalItemsPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = totalItemsPrice + deliveryPrice;

  // Handle checkout confirmation
  const handleConfirmOrder = async () => {
    if (!user || !token) {
      alert("Please log in to complete checkout");
      return;
    }
    if (!address.trim()) {
      alert("Please enter a delivery address");
      return;
    }

    const order = {
      items: items.map(item => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        qty: item.qty,
      })),
      total,
      deliveryPrice,
      deliveryTime,
      address,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const result = await response.json();
      alert("Order placed successfully!");
      clearCart();
      setShowCheckout(false);
      setAddress("");
    } catch (err) {
      console.error("Error processing order:", err.message);
      alert("Error processing order: " + err.message);
    }
  };

  return (
    <div style={{ padding: 30, paddingBottom: 80 }}>
      <h2 style={{ textAlign: "center", marginBottom: 25 }}>Your Cart</h2>

      <div style={{
        background: "#f6f6f6",
        padding: "15px 20px",
        fontWeight: "bold",
        marginBottom: 20,
        borderRadius: 6,
      }}>
        Total Amount: {totalItemsPrice.toFixed(2)} EGP
      </div>

      {items.map((item) => (
        <div key={item._id} style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 0",
          borderBottom: "1px solid #eee",
        }}>
          <img
            src={item.images?.[0] || "https://via.placeholder.com/70"}
            width="70"
            height="70"
            style={{ objectFit: "contain", marginRight: 20 }}
            alt={item.title}
          />
          <div style={{ flexGrow: 1 }}>
            <p style={{ margin: 0 }}>{item.title}</p>
            <small>{item.price} EGP / unit</small>
          </div>
          <p style={{ width: 80, textAlign: "right", fontWeight: "bold" }}>
            {(item.price * item.qty).toFixed(2)} EGP
          </p>
          <div style={{ marginLeft: 20 }}>
            <button onClick={() => updateQty(item._id, -1)} style={btn}>-</button>
            <span style={{ margin: "0 15px", fontWeight: "bold" }}>{item.qty}</span>
            <button onClick={() => updateQty(item._id, 1)} style={btn}>+</button>
          </div>
        </div>
      ))}

      <button style={checkoutBtnStyle} onClick={() => setShowCheckout(true)}>
        Proceed To Checkout
      </button>

      {showCheckout && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Checkout</h3>

            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {items.map(item => (
                <div key={item._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span>{item.title} x {item.qty}</span>
                  <span>{(item.price * item.qty).toFixed(2)} EGP</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 15 }}>
              <input
                type="text"
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
              />
              <p>Delivery: {deliveryPrice} EGP</p>
              <p>Total: {total.toFixed(2)} EGP</p>
              <p>Estimated delivery: {deliveryTime}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
              <button style={checkoutBtnStyle} onClick={handleConfirmOrder}>Confirm Order</button>
              <button style={cancelBtnStyle} onClick={() => setShowCheckout(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const btn = {
  width: 30,
  height: 30,
  borderRadius: 6,
  border: "1px solid #ccc",
  background: "white",
  cursor: "pointer",
};

const checkoutBtnStyle = {
  padding: 15,
  width: "48%",
  background: "#222",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 500,
};

const cancelBtnStyle = {
  padding: 15,
  width: "48%",
  background: "#ccc",
  color: "#222",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 500,
};

const modalOverlay = {
  position: "fixed",
  top: 0, left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modalContent = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  width: "400px",
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)"
};