// db.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGO_URI is set
    if (!process.env.MONGO_URI) {
      console.error('❌ ERROR: MONGO_URI environment variable is not set!');
      console.error('Please set MONGO_URI in Replit Secrets tab (🔒 icon)');
      console.error('Format: mongodb+srv://username:password@cluster.mongodb.net/GroceryApp?retryWrites=true&w=majority');
      process.exit(1);
    }

    console.log('🔌 Attempting to connect to MongoDB...');
    console.log('📍 MONGO_URI:', process.env.MONGO_URI ? 'Set (hidden for security)' : 'NOT SET');
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('💡 Troubleshooting:');
    console.error('   1. Check MONGO_URI is set correctly in Replit Secrets');
    console.error('   2. Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)');
    console.error('   3. Check your MongoDB username and password are correct');
    process.exit(1);
  }
};

module.exports = connectDB;
