# Replit Troubleshooting Guide

## Issue: Products Not Loading / Database Not Connected

### Step 1: Check Backend is Running
1. Look at the Replit console/logs
2. You should see: `Server running on port 5001` (or 5000)
3. You should see: `MongoDB Connected: <host>`
4. If you see errors, check the steps below

### Step 2: Set Environment Variables in Replit Secrets

**CRITICAL:** You MUST set these in Replit's Secrets tab (🔒 icon):

1. Go to **Secrets** tab in Replit
2. Add these environment variables:

```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/GroceryApp?retryWrites=true&w=majority
MONGO_DB=GroceryApp
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
PORT=5001
FRONTEND_PORT=5000
```

**Replace ALL placeholders with your actual credentials!**

### Step 3: Check Port Configuration

The app is configured as:
- **Frontend**: Port 5000 (visible in webview)
- **Backend**: Port 5001 (API server)

Make sure both ports are exposed in Replit's Ports section.

### Step 4: Verify Backend is Accessible

1. Check the backend URL in Replit's Ports section
2. It should show something like: `https://5001-username-replname.repl.co`
3. Try opening that URL in a new tab - you should see the API response or an error (not "connection refused")

### Step 5: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for:
   - `Replit detected - API_URL: <url>` - This shows what URL the frontend is trying to use
   - Any CORS errors
   - Any fetch errors

### Step 6: Test API Directly

In Replit's shell, try:
```bash
curl http://localhost:5001/api/products
```

Or test the backend URL directly in your browser.

### Common Issues:

#### "MongoDB connection failed"
- Check `MONGO_URI` is set correctly in Secrets
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or Replit IPs
- Check the connection string format is correct

#### "Cannot GET /api/products"
- Backend might not be running
- Check backend logs for errors
- Verify port 5001 is exposed

#### CORS errors
- Backend CORS is configured to allow Replit URLs
- If still seeing errors, check the exact frontend URL matches allowed origins

#### Products array is empty
- Database might be empty
- Check MongoDB Atlas to see if products exist
- Try adding a product through the admin panel

### Quick Fix Commands:

```bash
# Restart the app
# Stop current process (Ctrl+C) then:
npm start

# Check if backend is running
ps aux | grep node

# Check environment variables (in Replit shell)
echo $MONGO_URI
```

### Still Not Working?

1. Check backend console for MongoDB connection errors
2. Verify all environment variables are set
3. Check that both ports (5000 and 5001) are exposed
4. Try accessing backend URL directly in browser
5. Check browser console for API fetch errors

