# 🌦️ Weather Forecast Dashboard

Full-stack application for global weather monitoring with user activity logging. Built as a technical task for the IBM Internship program.

## 🚀 Live Demo
The application is containerized with Docker and deployed on Google Cloud Run:
**[View Live Demo](https://weather-app-635681483958.europe-west3.run.app)**

---

## 🛠️ Tech Stack
* **Frontend**: React.js, SASS (Responsive Design)
* **Backend**: Node.js, Express.js
* **Database**: SQLite (Activity logging)
* **DevOps**: Docker, Google Cloud Platform

---

## 📦 Local Setup & Installation

### Step 1: Clone the repository
`git clone https://github.com/DariusJuch/weather-dashboard-project.git`
`cd weather-dashboard-project`

### Step 2: Install Dependencies
**Backend:** `cd backend && npm install`
**Frontend:** `cd ../frontend && npm install`

### Step 3: Environment Variables
Create a `.env` file in the `backend` folder:
`WEATHER_API_KEY=your_api_key_here`
`PORT=8080`

### Step 4: Run the Application
* **Terminal 1 (Backend):** `cd backend && npm start`
* **Terminal 2 (Frontend):** `cd frontend && npm start`

---

## 🐳 Docker Support
1. **Build**: `docker build -t weather-app .`
2. **Run**: `docker run -p 8080:8080 weather-app`

