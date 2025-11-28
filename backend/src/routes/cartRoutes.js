import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Load user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.json({ items: [] }); // empty cart if user has nothing
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user's cart
router.put("/:userId", async (req, res) => {
  try {
    const { items } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items },
      { new: true, upsert: true }
    );

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;