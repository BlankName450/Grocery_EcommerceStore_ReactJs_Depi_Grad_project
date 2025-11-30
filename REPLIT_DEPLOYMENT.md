# Deploying Grocery App on Replit

This guide will help you deploy your full-stack grocery app on Replit.

## Prerequisites

1. A Replit account
2. MongoDB Atlas account (for database)
3. Cloudinary account (for image storage)

## Step 1: Import Your Project to Replit

1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Choose "Import from GitHub" or upload your project files
4. Select "Node.js" as the template

## Step 2: Install Dependencies

Run this command in the Replit shell:

```bash
npm run install-all
```

This will install dependencies for both frontend and backend.

## Step 3: Set Up Environment Variables

In Replit, go to the "Secrets" tab (lock icon in the sidebar) and add the following environment variables:

### Backend Environment Variables

```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/GroceryApp?retryWrites=true&w=majority
MONGO_DB=GroceryApp
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
PORT=5000
FRONTEND_PORT=3000
```

### ⚠️ IMPORTANT SECURITY NOTES:
- **NEVER commit real credentials to GitHub!**
- Replace ALL placeholders (YOUR_USERNAME, YOUR_PASSWORD, YOUR_CLUSTER, etc.) with your actual credentials
- These should only be set in Replit Secrets, never in code files
- If you accidentally commit credentials, immediately rotate/change them
- The `PORT` variable is for the backend (default: 5000)
- The `FRONTEND_PORT` variable is for the frontend (default: 3000)

## Step 4: Create Backend .env File (Optional)

Alternatively, you can create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Then add the environment variables in the format:
```
MONGO_URI=YOUR_MONGODB_URI_HERE
MONGO_DB=GroceryApp
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
PORT=5000
```

**⚠️ WARNING: If using a .env file, make sure it's in .gitignore (it already is) and NEVER commit it!**

## Step 5: Run the Application

Click the "Run" button in Replit, or run:

```bash
npm start
```

This will start both the backend and frontend servers.

## Step 6: Access Your Application

1. **Backend API**: The backend will run on port 5000
   - Replit will automatically create a URL like: `https://your-repl-name.your-username.repl.co:5000`

2. **Frontend**: The frontend will run on port 3000
   - Replit will automatically create a URL like: `https://your-repl-name.your-username.repl.co:3000`

3. **Access the App**: Open the frontend URL in your browser to use the application

## Step 7: Configure Ports in Replit

Replit may require you to expose ports:

1. Look for the "Ports" section in the Replit interface
2. Make sure ports 3000 and 5000 are exposed
3. If not, click "Add Port" and add both ports

## Troubleshooting

### Backend not starting
- Check that all environment variables are set correctly
- Verify MongoDB Atlas connection string is correct
- Check the Replit console for error messages

### Frontend not connecting to backend
- Verify the `frontend/src/config.js` file is correctly detecting Replit URLs
- Check CORS settings in `backend/src/server.js`
- Ensure both servers are running

### CORS Errors
- The backend is configured to allow Replit URLs automatically
- If you still see CORS errors, check that the frontend URL matches the allowed origins

### Port Issues
- Replit may assign different ports
- Check the Replit console for the actual ports being used
- Update environment variables if needed

## Production Considerations

1. **Security**: Never commit `.env` files or expose API keys
2. **Database**: Use MongoDB Atlas (already configured)
3. **Image Storage**: Cloudinary is already set up
4. **HTTPS**: Replit provides HTTPS automatically

## Additional Resources

- [Replit Documentation](https://docs.replit.com)
- [MongoDB Atlas Setup](https://www.mongodb.com/cloud/atlas)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## Support

If you encounter issues:
1. Check the Replit console for error messages
2. Verify all environment variables are set
3. Ensure both frontend and backend dependencies are installed
4. Check that MongoDB Atlas allows connections from Replit IPs (or use 0.0.0.0/0 for development)

