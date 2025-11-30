// top-level server setup
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env'), quiet: true });
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Connect to DB - lazy for serverless (Vercel), immediate for local
if (process.env.VERCEL !== '1') {
  connectDB();
}

const app = express();

// CORS configuration - allow localhost and Vercel URLs
const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:5000',
  'https://localhost:5000',
];

// Add Vercel origins dynamically
if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}
if (process.env.NEXT_PUBLIC_VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`);
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or is a Vercel/localhost URL
    if (allowedOrigins.indexOf(origin) !== -1 || 
        origin.includes('vercel.app') || 
        origin.includes('localhost')) {
      callback(null, true);
    } else {
      // For development, allow all origins (restrict in production)
      callback(null, true);
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to DB on first request (for serverless/Vercel)
app.use(async (req, res, next) => {
  if (process.env.VERCEL === '1') {
    try {
      await connectDB();
    } catch (error) {
      console.error('DB connection error:', error);
    }
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    vercel: process.env.VERCEL === '1',
    mongoUri: process.env.MONGO_URI ? 'Set' : 'Not set'
  });
});

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

// Only start server if not in serverless environment (Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Backend API available at http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;