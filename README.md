# 🎓 StudentAI — AI-Powered Student Performance Prediction

StudentAI is a full-stack AI/ML web application that predicts a student's academic performance based on academic factors such as previous grades, study time, failures, and absences.

The project combines **Machine Learning, React, Firebase, FastAPI, and cloud deployment** into a complete end-to-end application.

> This project was built primarily as a learning project to understand how an AI/ML model can be integrated into a real full-stack web application and deployed for real-world use.

---

## 🚀 Live Application

### Frontend
StudentAI Web Application:

https://studentai-emj.onrender.com

### Backend API
FastAPI ML API:

https://studentai-api.onrender.com

### API Documentation
Interactive Swagger documentation:

https://studentai-api.onrender.com/docs

---

# 🎯 Project Purpose

The main objective of StudentAI was not only to build a student performance prediction system, but to understand how the different components of a modern AI application work together.

Through this project, I wanted to learn:

- How frontend applications communicate with backend APIs
- How Firebase Authentication works
- How Cloud Firestore stores user and application data
- How a Machine Learning model is trained and evaluated
- How a trained ML model can be saved and reused
- How FastAPI can expose an ML model through a REST API
- How React communicates with an ML backend
- How environment variables are used in development and production
- How CORS works between frontend and backend applications
- How applications are deployed to the cloud
- How Git and GitHub are used in a real project workflow
- How to debug problems across frontend, backend, database, ML, and deployment layers

The biggest focus of this project was **learning and understanding every stage of the development process rather than simply obtaining a finished application.**

---

# 🧠 Machine Learning

StudentAI uses a **Linear Regression model** to predict the student's final academic grade.

The model takes the following features:

| Feature | Description |
|---|---|
| G1 | First-period grade |
| G2 | Second-period grade |
| Study Time | Weekly study-time category |
| Failures | Number of previous class failures |
| Absences | Number of student absences |

The prediction API returns:

- Predicted final grade
- Predicted percentage
- Academic risk level
- Feature contribution/explanation

During model development, multiple regression models were evaluated, including:

- Linear Regression
- Random Forest Regression
- Gradient Boosting Regression

Linear Regression was selected based on the model evaluation results obtained during experimentation.

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       Student       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    React + Vite     │
                    │      Frontend       │
                    └──────┬────────┬─────┘
                           │        │
                 Auth/Data │        │ Prediction Request
                           │        │
                           ▼        ▼
                 ┌────────────┐   ┌──────────────┐
                 │  Firebase  │   │   FastAPI    │
                 │            │   │   Backend    │
                 │ Auth       │   └──────┬───────┘
                 │ Firestore  │          │
                 └────────────┘          ▼
                                  ┌──────────────┐
                                  │ Scikit-learn │
                                  │   ML Model   │
                                  └──────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- React Router

## Backend

- Python
- FastAPI
- Uvicorn
- Pydantic
- Pandas
- Joblib

## Machine Learning

- Scikit-learn
- Pandas
- NumPy
- Jupyter Notebook
- Linear Regression
- Random Forest Regression
- Gradient Boosting Regression

## Database & Authentication

- Firebase Authentication
- Cloud Firestore

## Deployment

- **Render**
  - Static Site for the React frontend
  - Web Service for the FastAPI backend

## Development & Version Control

- Git
- GitHub
- VS Code
- Linux / Ubuntu

---

# 🔥 Firebase Integration

Firebase is used as the backend service for user-related functionality.

### Firebase Authentication

Firebase Authentication handles:

- User registration
- User login
- Authentication state
- Protected application routes
- Logout

### Cloud Firestore

Firestore stores information such as:

- Student profile information
- Academic data
- Prediction-related information

Working with Firebase helped me understand how frontend applications interact with cloud-based backend services without building every backend component from scratch.

---

# ⚡ FastAPI Backend

The Machine Learning model is exposed through a FastAPI REST API.

Main endpoints:

```text
GET /
```

Checks whether the API is running.

```text
GET /health
```

Checks backend and ML model health.

```text
POST /predict
```

Receives student academic data and returns an ML prediction.

Example request:

```json
{
  "G1": 10,
  "G2": 15,
  "studytime": 2,
  "failures": 0,
  "absences": 3
}
```

Example response:

```json
{
  "predicted_grade": 14.2,
  "predicted_percentage": 71.0,
  "risk_level": "Medium"
}
```

---

# ☁️ Deployment with Render

One of the major learning objectives of this project was understanding how a locally developed application becomes a publicly accessible application.

The application is deployed using **Render**.

### Frontend

The React/Vite application is deployed as a Render **Static Site**.

```text
GitHub
   ↓
Render
   ↓
npm install
   ↓
npm run build
   ↓
Vite dist/
   ↓
Public Website
```

### Backend

The FastAPI application is deployed as a Render **Web Service**.

```text
GitHub
   ↓
Render
   ↓
Python Environment
   ↓
Dependencies
   ↓
Uvicorn
   ↓
FastAPI
   ↓
ML Model
```

This deployment process also involved learning about:

- Production environment variables
- API URLs
- CORS configuration
- SPA routing and rewrite rules
- Backend health checks
- Build logs
- Deployment logs
- Debugging production errors

---

# 📁 Project Structure

```text
StudentAI/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── firebase/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── ml/
│   ├── data/
│   ├── models/
│   │   └── student_score_model.pkl
│   ├── notebooks/
│   ├── student_performance_eda.ipynb
│   └── train_model.py
│
├── models/
├── docs/
├── .gitignore
└── README.md
```

---

# 💡 What I Learned

This project gave me practical exposure to the complete lifecycle of an AI/ML application.

### Machine Learning

I learned how to:

- Explore and understand a dataset
- Analyze feature correlations
- Select useful features
- Train regression models
- Compare ML models using MAE, RMSE, and R²
- Save a trained model using Joblib
- Load the trained model for inference
- Convert model predictions into useful application outputs

### Backend Development

I learned how to:

- Create REST APIs using FastAPI
- Create GET and POST endpoints
- Validate request data using Pydantic
- Load an ML model inside a backend service
- Send JSON requests and responses
- Configure CORS
- Debug API errors

### Firebase

I learned how to:

- Create and configure a Firebase project
- Implement user authentication
- Register and log in users
- Work with Cloud Firestore
- Store user-specific information
- Retrieve Firebase data inside React

### Frontend

I learned how to:

- Build a React application using Vite
- Create reusable components
- Implement routing
- Create protected routes
- Connect React with Firebase
- Send requests to an external ML API
- Display ML predictions dynamically

### Deployment

I learned how to:

- Prepare frontend and backend applications for production
- Deploy a React application
- Deploy a FastAPI server
- Configure production environment variables
- Connect deployed frontend and backend services
- Fix CORS problems
- Configure SPA rewrite rules
- Read deployment logs
- Debug differences between localhost and production

### Git & GitHub

I also gained practical experience with:

- Git repositories
- Commits
- Branches
- Remote repositories
- GitHub authentication
- Personal Access Tokens
- `.gitignore`
- Pushing project updates
- Using GitHub as the source for cloud deployment

---

# 🤖 AI Assistance & Learning Approach

AI assistance, including **ChatGPT**, was used throughout the development of this project as a learning and debugging tool.

It was used for:

- Understanding unfamiliar concepts
- Breaking the project into manageable steps
- Debugging errors
- Understanding Firebase configuration
- Understanding FastAPI
- Understanding ML integration
- Troubleshooting Git/GitHub issues
- Understanding deployment on Render
- Diagnosing CORS and production issues
- Reviewing and improving code

However, the goal of using AI was **not simply to generate and submit a finished project**.

I followed the development process step by step, manually implemented the project, ran the commands, encountered and debugged errors, tested each component, and worked to understand why each step was required.

The primary purpose of this project was to gain practical knowledge of how:

```text
Frontend
   +
Firebase
   +
Machine Learning
   +
Backend API
   +
Cloud Deployment
```

work together as a complete application.

**The most valuable outcome of this project is not only the final application, but the understanding gained while building, debugging, connecting, and deploying each component.**

---

# 🔮 Future Improvements

Possible future improvements include:

- Advanced student analytics dashboard
- Performance history visualization
- Subject-wise predictions
- Improved ML models
- Larger training datasets
- Personalized study recommendations
- Explainable AI visualizations
- Student performance trends
- Teacher/admin dashboard
- Prediction history
- Model monitoring
- Automated model retraining

---

# 📌 Disclaimer

StudentAI is an educational AI/ML project.

The predictions generated by the Machine Learning model are intended for demonstration and learning purposes and should not be considered definitive assessments of a student's academic ability or future performance.

---

# 👨‍💻 Author

**Pratham B R**
**BTECH : CSE(AIML)**
JAIN (Deemed-to-be-University)

Built as a hands-on project to learn full-stack AI/ML development, Firebase integration, backend APIs, deployment, and production debugging.
