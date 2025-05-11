---

````markdown
# ReachOut Frontend

This is the frontend of **ReachOut**, a community-based platform where users can request or offer help. Built with **React**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI**, the application emphasizes clean design, responsiveness, and smooth user experience.

---

## 🚀 Tech Stack

- **React 19 + TypeScript**
- **Tailwind CSS + ShadCN UI**
- **React Query** – For data fetching and caching
- **Redux Toolkit** – For state management
- **React Hook Form + Zod** – For form handling and validation
- **React Router DOM** – For routing
- **Axios** – For API interaction
- **WebSocket** – For real-time messaging
- **React Toastify / React Spinners** – For notifications and loaders

---

## 🔧 Project Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create a `.env` file in the root of the `frontend/` directory with the following environment variables:**

   ```env
   VITE_BASE_URL=your_local_backend_url
   VITE_BASE_URL=your_production_backend_url
   ```

   > Replace the above values with your actual backend URLs.

3. **Run development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

---

## 📁 Folder Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── features/       # Redux slices and features
│   ├── hooks/          # Custom hooks
│   ├── lib/            # API utilities and axios instance
│   ├── pages/          # Application pages (routes)
│   ├── router/         # React Router configuration
│   ├── schemas/        # Zod schemas
│   ├── store/          # Redux store
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── .env                # Environment variables
├── tailwind.config.ts  # Tailwind config
├── vite.config.ts      # Vite config
└── README.md           # This file
```

---

## 📦 Available Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

---

## 📄 Notes

- Make sure the backend is running and accessible via the base URL configured in `.env`.
- Uses modular design for better maintainability and scalability.
