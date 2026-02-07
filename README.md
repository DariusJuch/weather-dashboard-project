# 🌦️ Weather Forecast Dashboard

Full-stack application for global weather monitoring with user activity logging. Built as a technical task for the IBM Internship program.

## 🚀 Live Demo
The application is containerized with Docker and deployed on Google Cloud Run:
**[View Live Demo](https://weather-app-635681483958.europe-west3.run.app)**

---

## 🛠️ Tech Stack

* **Frontend**: React.js, SASS (Responsive Design)
* **Backend**: Node.js, Express.js
* **Database**: SQLite (for search history logging)
* **DevOps**: Docker, Google Cloud Platform (Cloud Run)
* **API**: OpenWeatherMap API

---

## ✨ Features

- **Global City Search**: Real-time weather data for any city worldwide.
- **Current Conditions**: Displays temperature, humidity, and wind speed.
- **5-Day Forecast**: Visualized daily breakdown of upcoming weather.
- **Activity Logging**: Every search is automatically logged into a SQLite database with a timestamp.
- **Responsive UI**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Production-Ready**: Containerized using Docker for consistent deployment.

---

## 📦 Local Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/DariusJuch/weather-dashboard-project.git](https://github.com/DariusJuch/weather-dashboard-project.git)
   cd weather-dashboard-project
2. **Install Dependencies**:

Backend:

Bash
cd backend
npm install

Frontend:

Bash
cd frontend
npm install

3. **Environment Variables: Create a .env file in the backend folder and add your API key**:

WEATHER_API_KEY=your_api_key_here
PORT=8080

4. **Run the Application**:

- Start Backend: cd backend && npm start

- Start Frontend: cd frontend && npm start

🐳 Docker Support
You can also run the entire stack using Docker:

Bash
docker build -t weather-app .
docker run -p 8080:8080 weather-app
📝 Project Structure
/frontend: React application, components, and SASS styles.

/backend: Express server, SQLite configuration, and API routes.

Dockerfile: Configuration for cloud deployment.
