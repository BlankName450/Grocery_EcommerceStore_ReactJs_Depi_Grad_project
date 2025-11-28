const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const User = require('../models/User');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

const auth = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create order - THIS WAS MISSING THE ROUTE WRAPPER!
router.post('/', auth, async (req, res) => {
  try {
    const { items, total, deliveryPrice, deliveryTime, address } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const order = await Order.create({
      userId: req.userId,
      items,
      total,
      deliveryPrice,
      deliveryTime,
      address,
    });

    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;