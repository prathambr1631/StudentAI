from pathlib import Path

import joblib
import pandas as pd

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# ==========================================
# PATHS
# ==========================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = (
    BASE_DIR.parent
    / "ml"
    / "models"
    / "student_score_model.pkl"
)


# ==========================================
# LOAD ML MODEL
# ==========================================

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"ML model not found at: {MODEL_PATH}"
    )

model = joblib.load(MODEL_PATH)


# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI(
    title="StudentAI Prediction API",
    description="ML API for predicting student performance",
    version="1.0.0",
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# REQUEST MODEL
# ==========================================

class StudentData(BaseModel):
    G1: float = Field(ge=0, le=20)
    G2: float = Field(ge=0, le=20)

    studytime: int = Field(ge=1, le=4)
    failures: int = Field(ge=0, le=4)
    absences: int = Field(ge=0)


# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():
    return {
        "message": "StudentAI API is running",
        "model": "Linear Regression",
    }


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True,
    }


# ==========================================
# PREDICTION
# ==========================================

@app.post("/predict")
def predict(data: StudentData):

    try:

        input_data = pd.DataFrame(
            [
                {
                    "G1": data.G1,
                    "G2": data.G2,
                    "studytime": data.studytime,
                    "failures": data.failures,
                    "absences": data.absences,
                }
            ]
        )

        prediction = model.predict(input_data)[0]

        # ==========================================
        # MODEL EXPLAINABILITY
        # ==========================================

        feature_names = [
            "G1",
            "G2",
            "studytime",
            "failures",
            "absences",
        ]

        feature_values = [
            data.G1,
            data.G2,
            data.studytime,
            data.failures,
            data.absences,
        ]

        coefficients = model.coef_

        feature_contributions = []

        for feature, value, coefficient in zip(
            feature_names,
            feature_values,
            coefficients
        ):
            contribution = (
                float(value) *
                float(coefficient)
            )

            feature_contributions.append({
                "feature": feature,
                "value": float(value),
                "coefficient": round(
                    float(coefficient),
                    4
                ),
                "contribution": round(
                    contribution,
                    4
                ),
            })

        # Keep prediction inside dataset range
        prediction = max(
            0,
            min(20, float(prediction))
        )

        percentage = (
            prediction / 20
        ) * 100

        # Simple application-level risk interpretation
        if percentage >= 75:
            risk_level = "Low"

        elif percentage >= 50:
            risk_level = "Medium"

        else:
            risk_level = "High"

        return {
            "predicted_grade": round(
                prediction,
                2
            ),

            "predicted_percentage": round(
                percentage,
                2
            ),

            "risk_level": risk_level,
            "explanation": feature_contributions
        }


    except Exception as error:

        print(
            "Prediction error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Prediction failed"
        )