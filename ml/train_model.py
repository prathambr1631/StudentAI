from pathlib import Path

import joblib
import pandas as pd

from ucimlrepo import fetch_ucirepo

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)


# ==========================================
# PATHS
# ==========================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(
    parents=True,
    exist_ok=True
)


# ==========================================
# LOAD DATASET
# ==========================================

print("Loading dataset...")

dataset = fetch_ucirepo(id=320)

feature_data = dataset.data.features
target_data = dataset.data.targets


# Combine everything into one DataFrame
df = pd.concat(
    [feature_data, target_data],
    axis=1
)


# ==========================================
# SELECT FEATURES
# ==========================================

features = [
    "G1",
    "G2",
    "studytime",
    "failures",
    "absences",
]

target = "G3"


X = df[features]

y = df[target]


print("\nFeatures used:")
print(features)

print("\nDataset shape:")
print(X.shape)


# ==========================================
# TRAIN / TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)


print("\nTraining samples:", len(X_train))
print("Testing samples :", len(X_test))


# ==========================================
# CREATE MODEL
# ==========================================

model = LinearRegression()


# ==========================================
# TRAIN MODEL
# ==========================================

print("\nTraining Linear Regression...")

model.fit(
    X_train,
    y_train
)


# ==========================================
# MAKE PREDICTIONS
# ==========================================

predictions = model.predict(
    X_test
)


# ==========================================
# EVALUATE MODEL
# ==========================================

mae = mean_absolute_error(
    y_test,
    predictions
)

rmse = mean_squared_error(
    y_test,
    predictions
) ** 0.5

r2 = r2_score(
    y_test,
    predictions
)


print("\nModel Performance")
print("-------------------------")

print(f"MAE  : {mae:.3f}")
print(f"RMSE : {rmse:.3f}")
print(f"R²   : {r2:.3f}")


# ==========================================
# MODEL COEFFICIENTS
# ==========================================

print("\nModel Coefficients")
print("-------------------------")

for feature, coefficient in zip(
    features,
    model.coef_
):
    print(
        f"{feature:12} : {coefficient:.4f}"
    )


print(
    f"Intercept    : {model.intercept_:.4f}"
)


# ==========================================
# SAVE MODEL
# ==========================================

model_path = (
    MODEL_DIR /
    "student_score_model.pkl"
)

joblib.dump(
    model,
    model_path
)


print("\nModel saved successfully!")

print(
    f"Location: {model_path}"
)