# 🎓 StudentAI

StudentAI is an AI/ML-powered academic performance prediction platform that predicts student performance, identifies academic risk, tracks prediction history, and provides explainable recommendations.

The project combines machine learning with a full-stack web application using React, Firebase, FastAPI, and Scikit-learn.

---

## 🚀 Features

- 🔐 Firebase Authentication
- 📚 Academic data collection
- 🤖 ML-based final grade prediction
- 📊 Academic risk classification
- 📈 Prediction history and performance trends
- 💡 Personalized study recommendations
- 🧠 Model explainability
- 📊 ML model analytics
- ☁️ Firestore data storage
- ⚡ FastAPI prediction API

---

## 🧠 Machine Learning

StudentAI predicts a student's final academic grade using:

- G1 — First-period grade
- G2 — Second-period grade
- Study Time
- Previous Failures
- Absences

### Models Evaluated

| Model | MAE | RMSE | R² |
|---|---:|---:|---:|
| **Linear Regression** | **0.746** | **1.155** | **0.863** |
| Random Forest | 0.800 | 1.329 | 0.819 |
| Gradient Boosting | 0.771 | 1.343 | 0.815 |

Linear Regression was selected because it achieved the best evaluation results among the tested models while remaining highly interpretable.

---

## 🏗️ Architecture

```text
Student
   │
   ▼
React Frontend
   │
   ├──────────────► Firebase Authentication
   │
   ├──────────────► Cloud Firestore
   │
   ▼
FastAPI Backend
   │
   ▼
Scikit-learn Model
   │
   ▼
Grade Prediction
   │
   ├── Predicted Score
   ├── Risk Level
   └── Feature Contributions
   │
   ▼
Firestore
   │
   ▼
Student Dashboard
```

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- React Router

### Backend

- Python
- FastAPI
- Uvicorn
- Pandas
- Joblib

### Machine Learning

- Scikit-learn
- Pandas
- NumPy
- Jupyter Notebook

### Cloud

- Firebase Authentication
- Cloud Firestore

---

## 📁 Project Structure

```text
StudentAI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── firebase/
│   │   └── pages/
│   └── package.json
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── ml/
│   ├── data/
│   ├── models/
│   │   └── student_score_model.pkl
│   ├── notebooks/
│   ├── student_performance_eda.ipynb
│   └── train_model.py
│
├── docs/
│
├── .gitignore
└── README.md
```

---

## ⚙️ Running Locally

### 1. Clone the repository

```bash
git clone <repository-url>
cd StudentAI
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

### 3. Start the backend

Open another terminal:

```bash
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🔮 Future Improvements

- Additional academic datasets
- More advanced ML models
- Cross-validation and hyperparameter tuning
- SHAP-based model explanations
- Subject-level prediction
- GenAI-powered academic coaching
- Production deployment

---

## ⚠️ Model Scope

StudentAI is an educational machine-learning project.

Predictions are based on patterns learned from the training dataset and should not be interpreted as definitive assessments of an individual student's academic ability or future performance.