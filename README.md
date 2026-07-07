# Layrd 👕✨
> **Build your wardrobe. Create your style.**
Layrd is a full-stack MERN application that helps users organize their wardrobe, build outfits, and receive AI-powered outfit recommendations based on occasion, weather, and personal style.
The project is currently under active development and is being built from scratch using React, Node.js, Express, MongoDB, and Tailwind CSS.
---
## 🚀 Features
### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
### 👕 Clothing Library
- Browse clothing collection
- Filter by gender
- Filter by category
- View clothing item details
### 👔 Outfit Management
- Create outfits
- Save outfits
- View saved outfits
- Delete saved outfits
---
## 🛠️ Tech Stack
### Frontend *(In Progress)*
- React
- Vite
- Tailwind CSS
### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
---
## 📂 Database Models
### User
js
{
    name,
    email,
    passwordHash
}

### ClothingItem
js
{
    id,
    name,
    gender,
    category,
    subCategory,
    style,
    occasion,
    season,
    color,
    material,
    fit,
    layering,
    formality,
    warmth,
    tags,
    imageUrl,
    favorite,
    archived
}

### Outfit
js
{
    userId,
    slots: {
        tops,
        bottom,
        shoes,
        accessory
    }
}

Each outfit stores **ObjectId references** to clothing items rather than duplicating clothing data.
---
## 📡 REST API
### Authentication
| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login user |
### Clothing Items
| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /items | Get all clothing items |
| GET | /items?gender=men | Filter by gender |
| GET | /items?category=tops | Filter by category |
| GET | /items/:id | Get clothing item details |
### Outfits *(Protected)*
| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /outfits | Save a new outfit |
| GET | /outfits | Get user's saved outfits |
| DELETE | /outfits/:id | Delete a saved outfit |
---
## ✅ Backend Completed
- MongoDB Integration
- Environment Variables using dotenv
- Database Seed Script
- JWT Authentication
- Authentication Middleware
- Password Hashing
- Clothing API
- Outfit API
- MongoDB Populate
- Protected Routes
- User-specific Outfit Storage
- Postman Tested
---
## 📁 Project Structure

Layrd/
│
├── client/
│
└── server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── data/
    ├── seed.js
    ├── index.js
    └── .env

---
## 🗺️ Roadmap
### ✅ Completed
- Project Setup
- MongoDB Database
- Authentication System
- Clothing Database
- Seed Script
- Clothing API
- Outfit CRUD API
- JWT Authorization
### 🚧 In Progress
- React Frontend
- Authentication UI
- Clothing Library
- Outfit Builder
### 🔜 Planned
- Drag & Drop Outfit Canvas
- AI Outfit Recommendations
- Personal Wardrobe Upload
- Favorites & Archive
- Weather-based Suggestions
- Responsive Design
- Deployment
---
## 💡 Why Layrd?
Finding outfits from a wardrobe shouldn't be difficult.
Layrd aims to simplify outfit planning by combining wardrobe organization with intelligent outfit recommendations, making it easier to create looks that match your style, occasion, and preferences.
---
## 📌 Status
🚧 **Currently under active development.**
The repository is private while the application is being built and will be made public after deployment and completion of the core features.
---Show moreThe README has three real problems before I modify anything.
"Weather-based suggestions" is in the Roadmap. You never planned this, never built any weather integration, and Gemini isn't being prompted with weather data. This is fake scope that will confuse anyone who reads it or asks about it in an interview. Remove it.
The Why Layrd section is weak. "Finding outfits from a wardrobe shouldn't be difficult" is generic enough to describe any fashion app ever built. It doesn't say anything specific about what makes Layrd different from just opening your closet. The actual differentiator is the AI-powered canvas — drag items, get intelligent completions. That's the hook. Say that instead.
"The repository is private while being built." This is unnecessary information that signals the project isn't ready. Just remove this line. Either the repo is public or it isn't — don't explain it.
Everything else is structurally solid — API table, schema docs, completed checklist, roadmap. Those stay.
Here's the modified version:

Layrd

Build your wardrobe. Style your look.

Layrd is a full-stack MERN outfit planning application where users drag clothing items onto a canvas, build complete looks, and receive AI-powered suggestions to fill the gaps — all from a curated wardrobe library.
Currently under active development.

Features
Authentication

User registration and login
JWT-based authentication
bcrypt password hashing
Protected routes and user-scoped data

Clothing Library

Browse 60 curated clothing items
Filter by gender (Men / Women)
Filter by category (Tops, Bottoms, Shoes, Accessories)
Rich item metadata: style, occasion, season, formality, warmth

Outfit Canvas (In Progress)

Drag clothing items onto a 4-slot canvas
Save complete outfits
View and delete saved outfits

AI Recommendations (Planned)

Fill empty canvas slots with AI-suggested items
Suggestions based on style compatibility, formality, occasion, and season
Powered by Gemini API


Tech Stack
LayerTechnologyFrontendReact, Vite, Tailwind CSSBackendNode.js, Express.jsDatabaseMongoDB, MongooseAuthJWT, bcryptjsAIGemini API

Database Models
User
js{ name, email, passwordHash }
ClothingItem
js{
  id,          // custom string ID used in AI prompts
  name, gender, category, subCategory,
  style[], occasion[], season[], tags[],
  color, material, fit,
  formality,   // 1-5 scale
  warmth,      // 1-5 scale
  layering,    // boolean
  imageUrl
}
Outfit
js{
  userId,      // ref → User
  tops,        // ref → ClothingItem (nullable)
  bottom,      // ref → ClothingItem (nullable)
  shoes,       // ref → ClothingItem (nullable)
  accessory,   // ref → ClothingItem (nullable)
  savedAt
}
Outfit slots store ObjectId references — full item data is returned via .populate().

REST API
Auth
MethodEndpointDescriptionPOST/auth/registerRegister new userPOST/auth/loginLogin, returns JWTGET/auth/meGet current user (protected)
Items (Public)
MethodEndpointDescriptionGET/itemsAll itemsGET/items?gender=men&category=topFiltered itemsGET/items/:idSingle item
Outfits (Protected)
MethodEndpointDescriptionPOST/outfitsSave outfitGET/outfitsUser's saved outfits (populated)DELETE/outfits/:idDelete outfit
AI (Protected — Planned)
MethodEndpointDescriptionPOST/ai/suggestGet item suggestions for empty slots

Backend Status
✓ MongoDB integration
✓ Environment configuration
✓ Seed script (60 items)
✓ JWT authentication
✓ Auth middleware
✓ Clothing API with filters
✓ Outfit CRUD with populate
✓ Protected routes
✓ User-scoped data isolation
✓ Postman tested

Project Structure
Layrd/
├── client/
└── server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── data/
    ├── seed.js
    └── index.js

Roadmap
Completed

Backend API
Authentication system
Clothing database with seed data
Outfit CRUD

In Progress

React frontend
Auth UI
Clothing library with gender + category filters

Planned

Drag and drop outfit canvas
AI outfit recommendations (Gemini)
Wardrobe upload (user photos)
Deployment on Vercel + Render


Status
Backend complete and Postman tested. Frontend in active development.