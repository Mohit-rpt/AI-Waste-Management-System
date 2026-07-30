# ♻️ AI Waste Management System

An AI-powered waste classification and management system that uses Deep Learning and Generative AI to identify waste types from images and provide smart recycling insights.

## 🚀 Features

- 📸 Upload waste images for analysis
- 🤖 AI-based waste classification using Deep Learning
- 🧠 Gemini AI powered waste insights
- 💬 AI chatbot for waste management queries
- ⚡ FastAPI backend API
- 🌐 React-based responsive frontend
- ☁️ Deployed using Vercel and Render

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- Framer Motion

### Backend
- Python
- FastAPI
- TensorFlow
- OpenCV
- NumPy
- Pillow

### AI
- MobileNetV2 Deep Learning Model
- Google Gemini API

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure

```
AI-Waste-Management-System/
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── predict.py
│   ├── waste_info.py
│   ├── requirements.txt
│   └── model/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Mohit-rpt/AI-Waste-Management-System.git

cd AI-Waste-Management-System
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Activate virtual environment

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Create `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

Run backend:

```bash
uvicorn app:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Health Check

```
GET /
```

### Waste Prediction

```
POST /predict
```

Upload an image and get waste classification.

### AI Insight

```
POST /ai-insight
```

Get recycling information.

### AI Chatbot

```
POST /chat
```

Ask waste-related questions.

---

## 🌍 Live Demo

Frontend:
```
Your Vercel URL
```

Backend:
```
Your Render URL
```

---

## 📸 Screenshots

(Add project screenshots here)

---

## 🔮 Future Improvements

- Real-time camera waste detection
- Waste collection tracking
- User dashboard
- Waste recycling history
- Location-based recycling suggestions

---

## 👨‍💻 Author

**Mohit Rajput**

B.Tech Computer Science Engineering (Data Science)

GitHub:
https://github.com/Mohit-rpt

---

⭐ If you like this project, consider giving it a star!