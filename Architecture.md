# Layrd System Architecture

> **Goal:** Production-ready architecture for StyleSync. This document contains only design decisions and architecture. No implementation code.

---

# Folder Structure

```text
stylesync/
├── client/
│   ├── src/
│   │   ├── components/      # reusable UI pieces
│   │   ├── pages/           # route-level components
│   │   ├── context/         # global state
│   │   ├── hooks/           # custom hooks
│   │   ├── utils/           # api.js, helpers
│   │   └── assets/          # static images if any
│   └── package.json
└── server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── data/                # your JSON files
    ├── seed.js
    └── index.js
```

---

# React Component Hierarchy

```text
App
├── LandingPage
├── AuthPages
│   ├── Login
│   └── Register
└── AppLayout (authenticated wrapper)
    ├── Navbar
    │   ├── GenderToggle
    │   ├── NavLinks
    │   └── ProfileMenu
    ├── LibraryPage
    │   ├── CategoryTabs
    │   ├── ItemGrid
    │   │   └── ItemCard (draggable)
    │   └── EmptyState
    ├── CanvasPage
    │   ├── LibrarySidebar
    │   │   ├── CategoryTabs
    │   │   └── ItemCard (draggable)
    │   ├── OutfitCanvas
    │   │   ├── SlotZone × 4 (droppable)
    │   │   └── AIIndicator (on AI-filled slots)
    │   └── CanvasControls
    │       ├── GetSuggestionsButton
    │       ├── SaveOutfitButton
    │       └── ClearButton
    └── WardrobePage
        ├── OutfitCard × n
        └── EmptyState
```

---

# MongoDB Schema Relationships

Three collections. Relationships are reference-based, not embedded.

## User

```text
_id
name
email
passwordHash
```

## ClothingItem

```text
_id
id (custom string, indexed, unique)

name
gender
category
subCategory

style[]
occasion[]
season[]
tags[]

color
material
fit
pattern

formality (1–5)
warmth (1–5)
statementLevel (1–5)

layering (bool)

imageUrl
```

## Outfit

```text
_id

userId → ref User

slots
 ├── top        → ObjectId → ref ClothingItem (nullable)
 ├── bottom     → ObjectId → ref ClothingItem (nullable)
 ├── shoes      → ObjectId → ref ClothingItem (nullable)
 └── accessory  → ObjectId → ref ClothingItem (nullable)

savedAt
```

Outfit slots are nullable ObjectIds — a saved outfit doesn't require all 4 slots filled. This prevents forcing users to complete every slot before saving.

---

# REST API Contract

## AUTH

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/auth/register` | `{ name, email, password }` |
| POST | `/auth/login` | `{ email, password }` |
| GET | `/auth/me` | Bearer Token |

---

## ITEMS (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items?category=top&gender=men` | Filter items |
| GET | `/items/:id` | Get single item by MongoDB `_id` |

---

## OUTFITS (Protected)

| Method | Endpoint | Body |
|--------|----------|------|
| GET | `/outfits` | Logged-in user's saved outfits |
| POST | `/outfits` | `{ top, bottom, shoes, accessory }` |
| DELETE | `/outfits/:id` | Delete saved outfit |

---

## AI (Protected)

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/ai/suggest` | `{ filledSlots, emptySlots }` |

No PATCH on outfits — if a user wants to change a saved outfit, they delete and re-save. Keeps the API simple.

---

# Backend Architecture

Architecture follows the MVC pattern (same pattern as CodeQuest).

```text
index.js
    │
    ├── mounts middleware
    └── mounts routers

routes/
    │
    └── maps URLs to controllers

controllers/
    │
    └── business logic

models/
    │
    └── Mongoose schemas

middleware/auth.js
    │
    └── JWT verification
```

One addition:

- `ai.js` service file inside controllers handles the Groq call in isolation.
- The AI controller calls this service, not Groq directly.
- This makes the AI logic testable and swappable.

Rate limiting sits only on `/ai/suggest` using **express-rate-limit**.

Limit:

- **10 requests / 15 minutes / IP**

---

# Frontend State Management

No Redux.

No Zustand.

React Context + `useState` is sufficient.

## Contexts

### AuthContext

Stores:

- JWT token
- User object
- Login function
- Logout function

Wraps the entire application.

Every component that needs authentication reads from here.

---

### GenderContext

Stores:

- `"men"`
- `"women"`

Wraps `AppLayout`.

Library and Canvas use it to filter inventory.

---

### Canvas State

Canvas slot state lives locally inside `CanvasPage`.

It is **not global state**.

When the user saves:

1. Send slots to the API.
2. Clear local state.

---

# Drag-and-Drop Data Flow

1. `DndContext` wraps `CanvasPage`.

2. `ItemCard` in `LibrarySidebar`
   - `useDraggable(item._id)`

3. `SlotZone`
   - `useDroppable(slotName)`

4. `onDragEnd`

   - Read `active.id`
   - Read `over.id`
   - Validate category
   - If valid:
     - Update slot state
   - If invalid:
     - Do nothing
     - Item snaps back

5. `SlotZone`

   - Render item image if slot exists
   - Otherwise render placeholder

Category validation is critical.

A shoes item should never land in a top slot.

Validation:

```text
if (draggedItem.category !== slotName) return
```

---

# AI Request Flow

### 1.

User fills at least one slot.

↓

### 2.

Clicks **Get Suggestions**

↓

### 3.

Frontend builds request

```json
{
  "filledSlots": [
    {
      "id": "...",
      "name": "...",
      "color": "...",
      "style": "...",
      "occasion": "...",
      "formality": "...",
      "season": "...",
      "tags": []
    }
  ],
  "emptySlots": [
    "bottom",
    "shoes",
    "accessory"
  ]
}
```

↓

### 4.

POST `/ai/suggest`

↓

### 5.

Backend builds Groq prompt

```text
Given this outfit item: [filled slot details]

Suggest one item for each empty slot from the following inventory.

Return ONLY a JSON object:

{
  bottom: "mb001",
  shoes: "ms001",
  accessory: "ma002"
}

Available bottoms: [...]
Available shoes: [...]
Available accessories: [...]
```

↓

### 6.

Groq returns JSON string.

↓

### 7.

Backend parses JSON.

Fetch each item using its custom id.

↓

### 8.

Backend returns full item objects.

```text
{
  bottom: itemObj,
  shoes: itemObj,
  accessory: itemObj
}
```

↓

### 9.

Frontend fills empty slots.

AI-filled slots display an AI indicator.

---

The prompt explicitly tells Groq to return only a JSON object — no prose.

Always parse with `try/catch`.

If parsing fails:

- Return fallback items.
- Never let an AI failure break the UI.

---

# Authentication Flow

### 1.

User visits landing page.

No authentication required.

↓

### 2.

User enters the app.

Library is public.

↓

### 3.

User attempts to save an outfit.

If no token:

→ Redirect to `/login`

↓

### 4.

Login

- Store JWT in `localStorage`
- Store user in `AuthContext`

↓

### 5.

Protected requests

```text
Authorization: Bearer <token>
```

↓

### 6.

401 Response

- Clear token
- Clear context
- Redirect to `/login`

↓

### 7.

App startup

Read token from `localStorage`

↓

Call:

```text
GET /auth/me
```

If valid:

- Populate `AuthContext`

If 401:

- Clear token
- Stay on landing/library as guest

A centralized `api.js` utility attaches the token and handles all 401 responses.

Same pattern as CodeQuest.

---

# Deliberately Excluded (v1)

The following features are intentionally excluded from Version 1:

- Favorites
  - Adds a field on User or a separate collection.
  - Not worth the additional complexity.

- Search
  - Category + gender filtering is sufficient for 60 items.

- Outfit scoring
  - Original timeline included this.
  - Removed for v1.
  - AI suggestions are enough.

- Pagination
  - 30 items per gender fit comfortably in a single request.
  - No pagination needed.