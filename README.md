# Layrd 👗✨

> **Build your wardrobe. Style your look.**

Layrd is a full-stack MERN wardrobe and outfit planning application that
helps users visually create outfits from a curated digital wardrobe.
Users can browse clothing, drag pieces onto an interactive outfit
canvas, save complete looks, and receive AI-powered outfit
recommendations generated from **their own wardrobe** using Gemini.

![Status](https://img.shields.io/badge/status-v1%20complete-success?style=flat-square)
![Stack](https://img.shields.io/badge/stack-MERN-blue?style=flat-square)
![AI](https://img.shields.io/badge/AI-Gemini-purple?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

------------------------------------------------------------------------

# 🚀 Live Demo

**Frontend:** *(Add Vercel URL)*

**Backend:** *(Add Render URL)*

------------------------------------------------------------------------

# 📸 Screenshots

> Add screenshots here after deployment.

-   Landing Page
-   Login
-   Library
-   Outfit Builder
-   Wardrobe

------------------------------------------------------------------------

# ✨ Features

## 🔐 Authentication

-   User Registration & Login
-   JWT Authentication
-   Password Hashing (bcrypt)
-   Protected Routes
-   User-specific saved outfits

## 👗 Clothing Library

-   Browse curated wardrobe
-   Category filters
-   Search clothing
-   Premium editorial UI
-   Rich clothing metadata

## 🎨 Outfit Builder

-   Drag & Drop interface
-   Four dedicated outfit slots
-   Category validation
-   Replace/remove items
-   Clear outfit
-   Save complete outfits

## 🧥 My Wardrobe

-   View saved outfits
-   Outfit preview cards
-   Delete saved outfits
-   User-specific wardrobe

## 🤖 AI Stylist

-   Powered by Gemini
-   Detects missing outfit categories
-   Suggests only wardrobe items
-   Considers style, occasion, season and color compatibility
-   Automatically fills missing outfit slots

------------------------------------------------------------------------

# 🛠 Tech Stack

  Layer            Technology
  ---------------- ---------------------------
  Frontend         React, Vite, Tailwind CSS
  Backend          Node.js, Express.js
  Database         MongoDB, Mongoose
  Authentication   JWT, bcryptjs
  AI               Gemini API
  Drag & Drop      @dnd-kit/core

------------------------------------------------------------------------

# 🤖 AI Recommendation Pipeline

Unlike traditional AI outfit generators, Layrd **never invents
clothing**. Recommendations are restricted to clothing that already
exists inside the wardrobe.

``` text
User builds outfit on Canvas
            │
            ▼
Detect missing categories
            │
            ▼
Fetch only matching wardrobe items
            │
            ▼
Convert wardrobe into structured prompt
            │
            ▼
Gemini generates recommendations
            │
            ▼
Validate returned item names
against MongoDB
            │
            ▼
Return complete clothing objects
            │
            ▼
Automatically fill canvas
```

### Pipeline

1.  User drags clothing onto the outfit canvas.
2.  Backend identifies missing categories.
3.  MongoDB returns only relevant clothing items.
4.  Backend converts wardrobe into structured context.
5.  Gemini receives:
    -   Current outfit
    -   Available wardrobe
    -   Style rules
    -   JSON response instructions
6.  Gemini returns structured JSON.
7.  Backend validates returned names against MongoDB.
8.  Complete clothing documents are returned.
9.  Frontend updates the missing outfit slots.

------------------------------------------------------------------------

# 🏗 Architecture

``` text
React Frontend
      │
      ▼
Express REST API
      │
      ├────────► MongoDB
      │
      └────────► Gemini API
                   │
                   ▼
          Recommendation JSON
                   │
                   ▼
        MongoDB Validation
                   │
                   ▼
            React Canvas
```

------------------------------------------------------------------------

# 📂 Database Models

### User

``` json
{
  "name":"String",
  "email":"String",
  "passwordHash":"String"
}
```

### ClothingItem

``` json
{
  "name":"String",
  "category":"String",
  "subCategory":"String",
  "style":["String"],
  "occasion":["String"],
  "season":["String"],
  "color":"String",
  "imageUrl":"String"
}
```

### Outfit

``` json
{
  "userId":"ObjectId",
  "top":"ObjectId",
  "bottom":"ObjectId",
  "shoes":"ObjectId",
  "accessory":"ObjectId"
}
```

------------------------------------------------------------------------

# 📡 API Reference

  Method   Endpoint              Description
  -------- --------------------- ----------------------
  POST     /auth/register        Register user
  POST     /auth/login           Login
  GET      /items                Fetch clothing
  GET      /items?category=top   Category filter
  POST     /outfits              Save outfit
  GET      /outfits              Get outfits
  DELETE   /outfits/:id          Delete outfit
  POST     /ai/suggest           AI outfit completion

------------------------------------------------------------------------

# ⚙ Technical Challenges

-   Designing structured prompts for consistent JSON responses.
-   Preventing AI from recommending unavailable clothing.
-   Mapping Gemini responses back to MongoDB documents.
-   Building drag-and-drop interactions with category validation.
-   Maintaining user-specific wardrobes using JWT authentication.

------------------------------------------------------------------------

# 📁 Project Structure

``` text
Layrd/
├── client/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── utils/
└── server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── data/
    ├── services/
    └── seed.js
```

------------------------------------------------------------------------

# 📈 Current Improvements

-   Responsive design
-   Loading states
-   Toast notifications
-   Final UI polish
-   Deployment

------------------------------------------------------------------------

# 📖 What I Learned

-   Building JWT authentication.
-   Designing REST APIs.
-   MongoDB data modeling with Mongoose.
-   Drag-and-drop interfaces using @dnd-kit.
-   Prompt engineering for structured AI responses.
-   Integrating Gemini into a complete application workflow.
-   Building an end-to-end MERN project from idea to deployment.

------------------------------------------------------------------------

# 💡 Why Layrd?

Most wardrobe applications focus on organizing clothes.

**Layrd focuses on creating outfits.**

Instead of simply storing clothing, users can visually build outfits on
an interactive canvas while an AI stylist intelligently completes
missing pieces using only items already available in the wardrobe.

The goal is to make outfit planning simple, visual, and personal.

------------------------------------------------------------------------

# 📌 Status

✅ Version 1 Complete

Current focus: - Responsive improvements - Final UI polish -
Deployment

------------------------------------------------------------------------

::: {align="center"}
**Built with ❤️ using React • Node.js • MongoDB • Gemini AI**
:::
