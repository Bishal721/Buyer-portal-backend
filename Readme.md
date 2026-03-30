# Overview Buyer Portal

A Node.js buyer portal with JWT authentication, MongoDB + Mongoose, and property favourites.

## Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Backend  | Node.js + Express                          |
| Database | MongoDB + Mongoose ODM                     |
| Auth     | JWT (`jsonwebtoken`) + bcrypt (`bcryptjs`) |

---

## Project Structure

```
buyer-portal/
│   ├── config/
│   │   └── ConnectDB.js           # MongoDB connection
│   ├── controller/
│   │   └── propertyContoller.js         # logic related to property and favourites
│   │   └── userController.js         # logic related to user
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT authentication middleware
│   │   └── errorhandler.js         # Error handling
│   ├── models/
│   │   ├── userModel.js         # User schema (bcrypt pre-save hook)
│   │   ├── propertyModel.js     # Property schema
│   │   └── favouriteModel.js    # Favourite schema (unique index: user+property)
│   ├── routes/
│   │   ├── porpertyRoutes.js         # Endpoints for property
│   │   └── userRoutes.js   # Endpoints for authentication
│   ├── index.js           # Express app entry point
│   ├── seeder.js           # Seeds 8 sample properties
│   └── .env                # Environment variables
│   └── .env.examples                # Environment variables example
│   └── Readme.md
│   └── package.json
│   └── .gitignore
└──
```

---

## Prerequisites

- **Node.js**: [Download and install](https://nodejs.org/en/download/) it if you haven't already.
- A MongoDB Atlas account
  (Install: https://www.mongodb.com/atlas/database)
  A Database User created in Atlas
  (with Read & Write permissions)
  Your system’s IP address allowed in Atlas
  (Network Access → Add IP → 0.0.0.0/0 recommended for development)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Bishal721/Buyer-portal-backend.git
```

```bash
cd Buyer-portal-backend
```

### 2. Install dependencies

If you used the CLI to create the template, you can skip this section.

Using yarn:

```shell
yarn install
```

Using npm:

```shell
npm install
```

Using pnpm:

```shell
pnpm install
```

### 3. Configure environment

Copy `.env.examples` to `.env` and update the values:

```bash
cp .env.examples .env
```

### 4. Seed sample properties

This project includes a seeder script (`seeder.js`) used to populate the database with initial data.

Before running the seeder, make sure:

- Your **MongoDB Atlas** cluster is set up
- A database user is created
- Your IP address is whitelisted
- The `MONGO_URI` value in your `.env` file points to your Atlas cluster

### Run Seeder Script

Using yarn:

```shell
yarn seed
```

Using npm:

```shell
npm run seed
```

Using pnpm:

```shell
pnpm seed
```

### 4. Start development

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

---

## Example Flow

1. Run Frontend site on **http://localhost:5173**
2. Click **Register** → enter name, email, password → submit
3. You're auto-logged in and redirected to the profile page
4. Browse **All Properties** → click **♡ Add to Favourites**
5. Switch to **My Favourites** tab to see saved properties
6. Click **♥ Remove from Favourites** to unsave
7. Click **Sign Out** to log out

---

## API Endpoints

- You can find all API endpoints and usage examples in the Postman documentation:
- [Link to documentation](https://documenter.getpostman.com/view/22809464/2sBXinGAak)

## Security Notes

- Passwords are **never stored in plaintext** — bcrypt with cost factor 12
- JWTs expire after **1 day**
- `user_id` is always taken from the **verified JWT**, never from request body
- Duplicate favourites are blocked by a **MongoDB unique compound index**
- Mongoose **validation errors** are caught and returned as clean messages

## 👥 Author

**MT** - **_Bishal Shrestha_**  
💼 Public Repository

---
