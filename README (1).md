# DevSnippets 🚀

A full-stack code snippet manager built with the MERN stack — save, organize, search, and share reusable code snippets with syntax highlighting, tags, and public share links.

**Live Demo:** [](#) | **API:** [](#)

![DevSnippets](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![CI](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/devsnippets/ci.yml?branch=main)

---

## 📖 Overview

DevSnippets solves a problem every developer has run into: losing track of that one useful function, config snippet, or one-liner buried in an old project. It's a personal, searchable library of code snippets with syntax highlighting for 15+ languages, tag-based organization, and shareable public links — like a self-hosted GitHub Gist.

## ✨ Features

- 🔐 **JWT Authentication** — secure signup/login with hashed passwords
- 📝 **Snippet CRUD** — create, edit, delete, and organize code snippets
- 🎨 **Syntax Highlighting** — supports JavaScript, Python, Java, C++, SQL, and more
- 🏷️ **Tags & Filtering** — organize and filter snippets by tag or language
- 🔍 **Full-Text Search** — instantly search across titles and code content
- ⭐ **Favorites** — pin your most-used snippets
- 🔗 **Public Sharing** — generate a shareable link for any snippet, viewable without login
- 🌗 **Responsive UI** — clean, dark-themed interface that works on any screen size
- ✅ **Fully Tested** — automated test suite covering auth and snippet APIs
- 🔄 **CI/CD Pipeline** — tests run automatically on every push via GitHub Actions

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- TailwindCSS
- React Query (data fetching/caching)
- Zustand (state management)
- React Router
- React Syntax Highlighter
- GSAP (landing page animations)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication + bcrypt
- Zod (request validation)
- Helmet, express-rate-limit, express-mongo-sanitize (security)

**Testing & DevOps**
- Jest + Supertest
- GitHub Actions (CI)
- MongoDB Atlas

## 🏗️ Architecture

```
devsnippets/
├── client/                # React frontend
│   └── src/
│       ├── api/           # Axios API calls
│       ├── components/    # UI components (snippet, auth, layout)
│       ├── pages/          # Route-level pages
│       ├── hooks/          # React Query hooks
│       └── store/          # Zustand auth store
│
├── server/                # Express backend
│   └── src/
│       ├── models/         # Mongoose schemas
│       ├── controllers/    # Route logic
│       ├── routes/         # API routes
│       ├── middleware/     # Auth, validation, error handling
│       └── validators/     # Zod schemas
│   └── tests/              # Jest + Supertest test suites
│
└── .github/workflows/      # CI pipeline
```

|



## 🔌 API Reference

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | `/api/auth/signup` | Create a new account | No |
| POST | `/api/auth/login` | Log in | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/snippets` | List user's snippets (supports `?search=&tag=&language=`) | Yes |
| POST | `/api/snippets` | Create a snippet | Yes |
| GET | `/api/snippets/:id` | Get a single snippet | Yes |
| PUT | `/api/snippets/:id` | Update a snippet | Yes |
| DELETE | `/api/snippets/:id` | Delete a snippet | Yes |
| PATCH | `/api/snippets/:id/favorite` | Toggle favorite status | Yes |
| GET | `/api/public/:shareId` | View a public snippet | No |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/devsnippets.git
   cd devsnippets
   ```

2. Set up the backend
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in `server/`:
   ```
   MONGO_URI=your_mongodb_connection_string
   MONGO_URI_TEST=your_test_database_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

   Start the backend:
   ```bash
   npm run dev
   ```

3. Set up the frontend
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

### Running Tests

```bash
cd server
npm test
```

## 🧪 Testing

The backend includes a full test suite covering:
- User signup/login with validation edge cases
- Duplicate email handling
- Protected route authorization
- Snippet CRUD operations
- Multi-tenant data isolation (users can't access each other's snippets)

Tests run automatically on every push via GitHub Actions.

## 🌐 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com)
- **Backend:** Deployed on [Render](https://render.com)
- **Database:** MongoDB Atlas

## 🗺️ Roadmap

- [ ] Folders/collections for organizing snippets
- [ ] Snippet version history
- [ ] Import from GitHub Gist
- [ ] Keyboard shortcuts (Cmd+K search, Cmd+N new snippet)
- [ ] Browser extension for one-click saving

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Built by [Your Name](https://github.com/YOUR_USERNAME) — feel free to reach out or open an issue.
