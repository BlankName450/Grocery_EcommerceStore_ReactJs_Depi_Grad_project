# Quick Start Guide for Replit

## 🚀 Fast Setup (5 minutes)

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Set Environment Variables in Replit Secrets

Go to the **Secrets** tab (🔒 icon) and add:

```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/GroceryApp?retryWrites=true&w=majority
MONGO_DB=GroceryApp
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
PORT=5000
FRONTEND_PORT=3000
```

**⚠️ IMPORTANT: Replace ALL placeholders (YOUR_USERNAME, YOUR_PASSWORD, etc.) with your actual credentials!**

### 3. Run the App
Click the **Run** button or type:
```bash
npm start
```

### 4. Access Your App
- Frontend: Check the port 3000 URL in Replit
- Backend API: Check the port 5000 URL in Replit

## 📝 Notes

- Both servers start automatically
- Backend runs on port 5000
- Frontend runs on port 3000
- CORS is automatically configured for Replit URLs
- Make sure to expose ports 3000 and 5000 in Replit's Ports section

## ❓ Troubleshooting

**Backend won't start?**
- Check MongoDB connection string
- Verify all environment variables are set

**Frontend can't connect?**
- Wait a few seconds for backend to start
- Check browser console for errors
- Verify CORS settings

**Port errors?**
- Go to Replit's Ports section
- Add ports 3000 and 5000 if not visible

