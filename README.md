Grocery E-commerce Web App

A modern grocery e-commerce web application built with React on the frontend and MongoDB/Node.js on the backend, featuring dynamic product browsing, secure authentication, and a responsive design.

This project showcases my skills in full-stack development, state management, UI design, and backend integrations.



Features

Browse Products: View grocery items with images, titles, prices, and categories.

Product Details: Click on a product to see detailed information.

Search & Filter: Find products by name or category.

Shopping Cart:

Add/remove products.

Update quantity in the cart.

Persistent cart state using React Context API.

User Authentication:

Secure signup and login system.

Password hashing implemented with bcrypt for security.

Image Uploads: Product images uploaded and served using Cloudinary.

Backend:

MongoDB used for storing products, users, and orders.

Express.js server handles APIs for product retrieval, cart updates, and authentication.

Responsive Design: Built with Bootstrap for mobile-friendly layouts and components.

Reusable Components: Banner, product cards, and cart components built for modularity.

Technologies Used

Frontend: React, React Router, Context API, Bootstrap

Backend: Node.js, Express.js

Database: MongoDB

Authentication: bcrypt password hashing

Image Storage: Cloudinary

Icons: FontAwesome

Development Tools: VS Code, Git & GitHub

# Grocery App — Full‑Stack (React + Node/Express + MongoDB Atlas + Cloudinary)

This is a full‑stack product management app featuring a React frontend and a Node/Express backend with MongoDB Atlas (Mongoose) and Cloudinary for image storage. It supports creating, editing, deleting, and listing products, including image uploads that are stored on Cloudinary and referenced by secure URLs.

## Features
- Admin product management UI (create, edit, delete, list)
- Image uploads via `multipart/form-data` using `multer-storage-cloudinary`
- Cloudinary integration for secure image URLs
- MongoDB Atlas (Mongoose) for persistent product storage
- Title and weight are immutable on edit to preserve product IDs
- `products.json` kept in sync for static fallback/debugging
- CORS enabled for local frontend dev on `http://localhost:3000`

## Tech Stack
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB Atlas (Mongoose)
- Media: Cloudinary
- Uploads: `multer` + `multer-storage-cloudinary`
- Env management: `dotenv`

## Project Structure
```
my-react-app/
├── backend/
│   ├── .env
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── cloudinary.js
│   │   ├── models/
│   │   │   └── Product.js
│   │   └── routes/
│   │       └── productRoutes.js
│   ├── products.json
├── frontend/
│   └── src/
│       └── pages/admin/AdminProductManagement.jsx
└── products.json (root-level copy used for fallback)
```

## Product Model
`backend/src/models/Product.js`
- `id` (String, unique): Generated from title + weight via slugify
- `title` (String, required)
- `price` (String, required) — stored as string in schema for compatibility; numeric parsing handled at routes
- `category` (String, required)
- `subcategory` (String, optional)
- `short_description` (String, optional)
- `weight` (String, required)
- `images` (String[]) — Cloudinary URLs or provided image URLs

## Environment Variables (backend/.env)
Make sure these are set correctly. Do not commit secrets.

```
MONGO_URI=mongodb+srv://admin:<password>@cluster0.trzqxle.mongodb.net/GroceryApp?retryWrites=true&w=majority&appName=Cluster0
MONGO_DB=GroceryApp
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
PORT=5000
```

Notes:
- Use a valid Atlas URI with a real database name (e.g., `GroceryApp`).
- The backend connects with `mongoose.connect(uri, { dbName: process.env.MONGO_DB })`.

## Backend

Start the API server:
```
cd grocery-app/frontend
npm install
cd grocery-app/backend
node src/server.js
```

API base: `http://localhost:5000/api/products`

Endpoints:
- `GET /` — List all products
- `POST /` — Create product
  - Accepts `multipart/form-data`
  - Files: `images` (multiple)
  - Or body: `images` as URLs (will be uploaded to Cloudinary)
- `PUT /:id` — Update product (title and weight are immutable)
  - Accepts `multipart/form-data`
  - Body `imagesJson`: JSON array of existing image URLs
  - Files: `images` (additional uploads)
- `DELETE /:id` — Delete by product `id`

Price handling:
- Routes parse price input into a numeric value, store in DB, and ensure `products.json` sync writes price as a string (for compatibility with earlier data).

Cloudinary:
- Config in `backend/src/config/cloudinary.js` using env vars.
- Uploads handled by `multer-storage-cloudinary`; on successful upload, image paths are Cloudinary URLs.

Static sync:
- Backend writes a synchronized copy to `products.json` at the repository root to aid with fallback and debugging.

## Frontend

Start the frontend:
```
cd my-react-app/frontend
npm install
npm start
```

Admin page: `src/pages/admin/AdminProductManagement.jsx`
- Fetches products from `http://localhost:5000/api/products`
- Add Product: uses `FormData` to send image files via `images`
- Edit Product:
  - Title and Weight inputs are disabled with a warning (immutable)
  - Displays existing images with Remove buttons (updates `imagesJson`)
  - Upload New Images file input (appends to `FormData` as `images`)
- Delete Product: removes item by `id`

## Usage Examples

Create with files (curl):
```
curl -X POST http://localhost:5000/api/products \
  -F "title=Apple" \
  -F "price=12.50" \
  -F "category=Fruits" \
  -F "short_description=Fresh apples" \
  -F "weight=500g" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

Update with existing + new images:
```
curl -X PUT http://localhost:5000/api/products/apple-500g \
  -F "price=13.00" \
  -F "imagesJson=[\"https://res.cloudinary.com/.../existing.jpg\"]" \
  -F "images=@/path/to/new.jpg"
```

Delete:
```
curl -X DELETE http://localhost:5000/api/products/apple-500g
```

## Troubleshooting
- Images not converting to Cloudinary URLs:
  - Ensure the frontend sends `FormData` and you do NOT manually set `Content-Type` (browser sets multipart boundary).
  - Verify Cloudinary env vars are correct.
  - Check backend logs for `POST /api/products - files:` and any errors.
- No products after moving to Atlas:
  - Use a valid URI with a database name and set `MONGO_DB`.
  - Confirm backend logs show `MongoDB Connected: <host>/<database>`.
- CORS blocked:
  - Backend enables CORS for `http://localhost:3000`; keep frontend dev at that origin or adjust CORS.

## Notes
- Do not commit `.env` with credentials.
- Title and Weight are immutable during edit to preserve product IDs (generated via slugify of title + weight).

---
This app was developed as part of frontend/backend internship and portfolio work. It demonstrates full‑stack development with secure media handling and practical admin workflows.
