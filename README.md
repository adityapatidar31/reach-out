# ReachOut

ReachOut is a full-stack community-based web application designed to connect people who need help with those willing to offer it. Whether it's organizing a local event, getting assistance for a task, or finding like-minded collaborators, ReachOut creates a seamless platform for real-time collaboration and mutual support.

---

## 🌟 Features

- ✅ Create and respond to help requests
- 🧠 Role-based access and authentication
- 💬 Real-time messaging using WebSocket
- 📦 Scalable full-stack architecture
- 📱 Mobile-first responsive UI
- ⚙️ Secure API with JWT authentication
- 📊 Dashboard with platform analytics
- 🧩 Modular frontend and backend codebase

---

## 🖥️ Frontend

**Summary:**  
The frontend of ReachOut is built with **React**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI**. It uses **React Query** for data fetching, **Redux Toolkit** for state management, and **React Router** for navigation. Form handling is done using **React Hook Form** with schema validation through **Zod**. Animations and loading states are enhanced with **React Spinners** and **Toast notifications**.

**🔗 Link to Frontend:**  
[ReachOut Frontend](./frontend)

---

## 🛠️ Backend

**Summary:**  
The backend is developed using **Java (Spring Boot)** and **PostgreSQL**. It follows a modular architecture with well-structured layers for controller, service, and repository. The backend handles authentication (JWT-based), CRUD operations for help requests, and integrates with **Cloudinary** for media handling. It also supports **real-time communication** through **WebSocket**.

**🔗 Link to Backend:**  
[ReachOut Backend](./backend)

---

## 📁 Project Structure

```
ReachOut/
├── frontend/              # React + TS + Tailwind app
├── backend/               # Spring Boot REST API
├── README.md              # Project overview (you are here)
```
