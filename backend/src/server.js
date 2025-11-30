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

connectDB();

const app = express();

// CORS configuration - allow localhost and Replit URLs
const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:5000',
  'https://localhost:5000',
];

// Add Replit origins dynamically
if (process.env.REPL_SLUG || process.env.REPL_OWNER) {
  const replSlug = process.env.REPL_SLUG || 'repl';
  const replOwner = process.env.REPL_OWNER || 'user';
  const baseUrl = `https://${replSlug}.${replOwner}.repl.co`;
  
  // Add base URL and port variations
  allowedOrigins.push(baseUrl);
  allowedOrigins.push(`https://3000-${replSlug}.${replOwner}.repl.co`);
  allowedOrigins.push(`https://5000-${replSlug}.${replOwner}.repl.co`);
}

// Allow any Replit URL pattern (port-based subdomains or same domain)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or is a Replit URL
    if (allowedOrigins.indexOf(origin) !== -1 || 
        origin.includes('repl.co') || 
        origin.includes('replit.dev') ||
        origin.match(/^\d+-.*\.repl\.co$/) || // Port-based subdomain: 3000-username-replname.repl.co
        origin.match(/^.*\.repl\.co$/)) {    // Standard Replit domain
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
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
// Listen on all interfaces (0.0.0.0) for Replit compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Backend API available at http://0.0.0.0:${PORT}`);
});