// top-level imports and route setup
const express = require('express');
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    resource_type: 'image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});
const upload = multer({ storage });

const slugify = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Get all products
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/products - Fetching products...');
    console.log('MONGO_URI set:', !!process.env.MONGO_URI);
    
    // Check if mongoose is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, attempting connection...');
      const connectDB = require('../config/db');
      await connectDB();
    }
    
    const products = await Product.find();
    console.log(`GET /api/products - Found ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error('GET /api/products - Error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: error.message, 
      error: error.toString(),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});
// Get single product by MongoDB _id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error in GET /api/products/:id:', error);
    res.status(500).json({ message: error.message });
  }
});
// Add a new product
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const {
      id: providedId,
      title,
      price,
      category,
      subcategory,
      short_description,
      weight,
      images: bodyImages = [],
    } = req.body;

    if (!title || !category || !short_description || !weight) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const numericPrice =
      typeof price === 'number'
        ? price
        : parseFloat(
            String(price ?? '')
              .trim()
              .replace(/,/g, '.')
              .replace(/[^\d.]/g, '')
          );

    if (!Number.isFinite(numericPrice)) {
      return res.status(400).json({ message: 'Invalid price. Provide a numeric value (e.g., 12.50).' });
    }

    let uploadedImages = [];
    if (Array.isArray(req.files) && req.files.length > 0) {
      uploadedImages = req.files.map((file) => file.path);
    } else if (Array.isArray(bodyImages) && bodyImages.length > 0) {
      uploadedImages = await Promise.all(
        bodyImages.map(async (img) => {
          const result = await cloudinary.uploader.upload(img, { resource_type: 'image' });
          return result.secure_url;
        })
      );
    }

    const id =
      (providedId && providedId.trim()) ||
      [slugify(title), weight ? slugify(String(weight)) : null].filter(Boolean).join('-');

    const product = new Product({
      id,
      title,
      price: Number(numericPrice),
      category,
      subcategory,
      short_description,
      weight,
      images: uploadedImages,
    });

    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error in /api/products:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a product by id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Product.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Deleted', id });
  } catch (error) {
    console.error('Error in DELETE /api/products/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update a product by id
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, category, subcategory, short_description, weight } = req.body;

    const current = await Product.findOne({ id });
    if (!current) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if ((title != null && title !== current.title) || (weight != null && weight !== current.weight)) {
      return res.status(400).json({
        message: 'Title and weight cannot be updated. Please delete and repost the product to change these fields.',
      });
    }

    const numericPrice =
      typeof price === 'number'
        ? price
        : parseFloat(
            String(price ?? '')
              .trim()
              .replace(/,/g, '.')
              .replace(/[^\d.]/g, '')
          );

    const uploadedPaths = Array.isArray(req.files) ? req.files.map((f) => f.path) : [];

    const rawImagesJson = req.body.imagesJson ?? req.body.images ?? [];
    let imagesFromBody = [];
    if (Array.isArray(rawImagesJson)) {
      imagesFromBody = rawImagesJson;
    } else if (typeof rawImagesJson === 'string') {
      try {
        const parsed = JSON.parse(rawImagesJson);
        imagesFromBody = Array.isArray(parsed) ? parsed : (rawImagesJson.trim() ? [rawImagesJson] : []);
      } catch {
        imagesFromBody = rawImagesJson.trim() ? [rawImagesJson] : [];
      }
    }

    const combinedImages = [...imagesFromBody, ...uploadedPaths];

    const update = {
      ...(category != null && { category }),
      ...(subcategory != null && { subcategory }),
      ...(short_description != null && { short_description }),
      ...(Number.isFinite(numericPrice) && { price: Number(numericPrice) }),
      images: combinedImages,
    };

    const updated = await Product.findOneAndUpdate({ id }, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Product not found after update' });
    }

    return res.json(updated);
  } catch (error) {
    console.error('Error in PUT /api/products/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;