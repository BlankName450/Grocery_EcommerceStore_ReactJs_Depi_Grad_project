import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children, user }) => {
  const [cart, setCart] = useState([]);

  // Load cart when user logs in
  useEffect(() => {
    if (user?._id) {
      loadCart(user._id);
    } else {
      setCart([]); // logout
    }
  }, [user]);

  // Load from backend
  const loadCart = async (userId) => {
    try {
      const res = await fetch(`/api/cart/${userId}`);
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.log("Error loading cart:", err);
    }
  };

  // Save to backend
  const saveCart = async (items) => {
    if (!user?._id) return;
    try {
      await fetch(`/api/cart/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    } catch (err) {
      console.log("Error saving cart:", err);
    }
  };

  // Add item
  const addToCart = (product) => {
    const exists = cart.find((i) => i._id === product._id);

    let updated;
    if (exists) {
      updated = cart.map((i) =>
        i._id === product._id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      updated = [...cart, { ...product, qty: 1 }];
    }

    setCart(updated);
    saveCart(updated);
  };

  // Update qty
  const updateQty = (id, amount) => {
    const updated = cart
      .map((i) => {
        if (i._id === id) return { ...i, qty: i.qty + amount };
        return i;
      })
      .filter((i) => i.qty > 0);

    setCart(updated);
    saveCart(updated);
  };

  // Clear
  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ⬅️ Required by StickyCartBar.jsx, ProductView.jsx, etc.
export const useCart = () => useContext(CartContext);