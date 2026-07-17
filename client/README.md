# Layrd 👗✨

> **Build your wardrobe. Style your look.**

Layrd is a full-stack MERN wardrobe and outfit planning application that helps users visually create outfits from a curated digital wardrobe. Users can browse clothing, search their wardrobe, drag pieces onto an interactive outfit canvas, save complete looks, and receive AI-powered outfit recommendations generated **only from clothing already available in their own wardrobe**.

![Status](https://img.shields.io/badge/status-v1.0-success?style=flat-square)
![Stack](https://img.shields.io/badge/stack-MERN-blue?style=flat-square)
![AI](https://img.shields.io/badge/AI-Groq-orange?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ⭐ Key Highlights

- Full-stack MERN application
- JWT-based authentication and protected routes
- Interactive drag-and-drop outfit builder
- AI-powered outfit completion using Groq (Llama)
- Wardrobe-constrained AI recommendations
- Responsive editorial-inspired UI built with React and Tailwind CSS

---

## 🚀 Live Demo

**Frontend:** *[Click Here](https://layrd-eight.vercel.app/)*

**Backend:** *[Click Here](https://layrd-backend.onrender.com)*

---

## 🚀 Getting Started

To run Layrd locally:

### Clone & Install

```bash
git clone https://github.com/your-username/layrd.git
cd layrd

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Configuration

Create a `.env` file inside the `server` directory and configure the following environment variables:

- `MONGO_URI`
- `JWT_SECRET`
- `GROQ_API_KEY`

### Run

```bash
# Client
cd client
npm run dev

# Server
cd ../server
npm start
```

---

## 📸 Screenshots

> Add screenshots after deployment.

- Landing Page
- Login / Register
- Clothing Library
- Outfit Builder
- Saved Wardrobe
- AI Stylist

---

## ✨ Features

### 🔐 Authentication

- User Registration & Login
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- User-specific wardrobe

### 👗 Clothing Library

- Browse curated wardrobe
- Search clothing items
- Category filtering
- Responsive editorial UI

### 🎨 Outfit Builder

- Drag & Drop interface
- Four outfit slots
- Category validation
- Replace / remove clothing
- Save outfits
- Clear canvas

### 🧥 My Wardrobe

- View saved outfits
- Delete outfits
- User-specific storage

### 🤖 AI Stylist

- Powered by Groq (Llama)
- Detects missing outfit categories
- Suggests only clothing from the user's wardrobe
- Automatically completes outfits

### 📱 User Experience

- Responsive design
- Toast notifications
- Loading states

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| AI | Groq API (Llama) |
| Drag & Drop | @dnd-kit/core |
| Notifications | react-hot-toast |

---

## 🤖 AI Recommendation Pipeline

```text
User builds outfit
      │
      ▼
Detect missing slots
      │
      ▼
Fetch wardrobe items
      │
      ▼
Create AI prompt
      │
      ▼
Groq selects items
      │
      ▼
Validate response
      │
      ▼
Return clothing objects
      │
      ▼
Update canvas
```

The backend detects missing outfit slots, fetches only the relevant wardrobe items from MongoDB, builds a structured prompt, sends it to Groq, validates the returned response, and fills the missing slots on the frontend.

---

## 🏗 Architecture

```text
React Frontend
      │
      ▼
Express REST API
      │
      ├────────► MongoDB
      │
      └────────► Groq API
                   │
                   ▼
          Recommendation JSON
                   │
                   ▼
         Response Validation
                   │
                   ▼
            React Canvas
```

---

## 📡 API Reference

| Method | Endpoint |
|--------|----------|
| POST | `/auth/register` |
| POST | `/auth/login` |
| GET | `/items` |
| POST | `/outfits` |
| GET | `/outfits` |
| DELETE | `/outfits/:id` |
| POST | `/ai/suggest` |

---

## ⚙ Technical Challenges

- Restricting AI recommendations to existing wardrobe items.
- Designing prompts that consistently return structured JSON.
- Parsing and validating AI responses.
- Building responsive drag-and-drop interactions.
- Managing JWT authentication across protected routes.

---

## 📖 What I Learned

- MERN stack development.
- JWT authentication.
- MongoDB data modeling with Mongoose.
- REST API design.
- Prompt engineering for structured AI responses.
- Groq AI integration.
- Responsive UI development.
- Building an end-to-end full-stack application.

---

## 🎯 Inspiration

Layrd helps users create practical outfits using clothes they already own instead of generating imaginary fashion suggestions. By combining a visual outfit builder with AI-assisted recommendations, the project focuses on making wardrobe planning simple, interactive, and personal.

---

## 📌 Status

✅ **Version 1.0 Complete**

---

<div align="center">

**Built with ❤️ using React • Node.js • Express • MongoDB • Groq AI**

</div>