# 🎓 E-Courses Client

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/) 
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) 
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)  

---

## 💡 Project Overview
**E-Courses Client** is a modern web application for online learning, designed to provide an intuitive and engaging experience. Users can browse courses, enroll, and track their learning progress via interactive dashboards. The project is built with **React**, powered by **Vite**, and deployed using **Firebase Hosting**.

---

## ✨ Features
- **User-Friendly Interface:** Browse and enroll in courses easily.  
- **Interactive Dashboards:** Role-specific dashboards for students, tutors, and owners.  
- **Authentication & State Management:** Secure login with Firebase and React Context.  
- **Responsive Design:** Mobile-friendly layout using Tailwind CSS and DaisyUI.  
- **Animations:** Engaging animations with Lottie.  
- **Real-Time Feedback:** Toast notifications for actions and alerts.  

---

## 🛠 Tech Stack
| Frontend | Backend / APIs | Tools |
|----------|----------------|-------|
| React.js | Firebase Authentication | Axios |
| Vite | REST APIs | React Query |
| Tailwind CSS | Serverless Hosting | React Router |
| DaisyUI | - | Lottie Animations |

---

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd e-courses-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. Open `http://localhost:5173` (or the provided URL) in your browser.

---

## 📁 Folder Structure
```
e-courses-client/
├── .firebase/              # Firebase cache/configs
├── public/                 # Public assets
│   ├── image/              # Images
│   └── lottie/             # Lottie animations
├── src/                    # Source code
│   ├── assets/             # Static assets
│   ├── component/          # React components
│   │   ├── Dashboard/      # Role-based dashboards
│   │   ├── Pages/          # Pages (About, Contact, Login, Register)
│   │   ├── Provider/       # Firebase & Context providers
│   │   ├── Route/          # Routing components
│   │   ├── component/      # Reusable components (Banner, Feedback)
│   │   └── layouts/        # Layout components (Navbar, Footer)
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── firebase.json           # Firebase hosting config
```

---

## 📄 Page Overview

### **Courses Page**
- Fetches and displays all available courses from the API.  
- Shows title, description, tutor name, average rating, and fee.  

### **Login & Register**
- Login validates user credentials.  
- Register allows new users to create accounts.  

### **Dashboard**
- Role-specific dashboards for students, tutors, and owners.  
- Tutors can create or update courses.  
- Students can view enrolled courses.  

### **About & Contact**
- Static informational pages for platform details and contact form.  

---

## 🌐 Deployment
- **Hosting:** Firebase  
- **Public Directory:** `dist`  
- **SPA Support:** All routes redirect to `index.html`  

---

## 🔗 Links
- **Live Demo:** https://fir-project-b7c55.web.app/(#)  
- **Backend API:** https://github.com/Faysal2123/e-course-server(#)  

---

## 👨‍💻 Author
**Mohammad Foysal**  
Frontend & MERN Stack Developer  

