import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

function AcademicData() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    G1: "",
    G2: "",
    studytime: "",
    failures: "",
    absences: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState(null);

  // Load previously saved academic data
  useEffect(() => {
    const loadAcademicData = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const dataRef = doc(
          db,
          "academicData",
          user.uid
        );

        const dataSnap = await getDoc(dataRef);

        if (dataSnap.exists()) {
          const savedData = dataSnap.data();

          setFormData({
            G1: savedData.G1 ?? "",
            G2: savedData.G2 ?? "",
            studytime: savedData.studytime ?? "",
            failures: savedData.failures ?? "",
            absences: savedData.absences ?? "",
          });

          if (
            savedData.predictedPercentage !== undefined
          ) {
            setPrediction({
              predicted_percentage:
                savedData.predictedPercentage,

              predicted_grade:
                savedData.predictedGrade,

              risk_level:
                savedData.riskLevel,
            });
          }
        }
      } catch (error) {
        console.error(
          "Error loading academic data:",
          error
        );
      } finally {
        setLoadingData(false);
      }
    };

    loadAcademicData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      setMessage("You must be logged in.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Prepare data expected by our ML API
      const studentData = {
        G1: Number(formData.G1),
        G2: Number(formData.G2),
        studytime: Number(formData.studytime),
        failures: Number(formData.failures),
        absences: Number(formData.absences),
      };

      // Send student data to FastAPI
      const response = await fetch(
         `${API_URL}/predict`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(studentData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Prediction API returned ${response.status}`
        );
      }

      const result = await response.json();

      console.log("ML Prediction:", result);

      // Save both inputs and prediction to Firestore
      await setDoc(
        doc(db, "academicData", user.uid),
        {
          ...studentData,

          predictedGrade:
            result.predicted_grade,

          predictedPercentage:
            result.predicted_percentage,

          riskLevel:
            result.risk_level,

            explanation:
            result.explanation,

          updatedAt:
            serverTimestamp(),
        },
        { merge: true }
      );

      // Save prediction to history
      await addDoc(
      collection(
      db,
      "users",
      user.uid,
      "predictions"
      ),
      {
      ...studentData,

    predictedGrade:
      result.predicted_grade,

    predictedPercentage:
      result.predicted_percentage,

    riskLevel:
      result.risk_level,

     explanation:
      result.explanation, 

    createdAt:
      serverTimestamp(),
  }
);

      setPrediction(result);

      setMessage(
        "Academic data analyzed successfully."
      );
    } catch (error) {
      console.error(
        "Prediction error:",
        error
      );

      setMessage(
        "Unable to analyze data. Make sure the prediction server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="academic-page">
        Loading academic data...
      </div>
    );
  }

  return (
    <div className="academic-page">

      <div className="academic-card">

        <div className="academic-header">
          <div>
            <h1>Academic Performance</h1>

            <p>
              Enter your academic information to
              generate an AI/ML performance prediction.
            </p>
          </div>

          <button
            className="back-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Dashboard
          </button>
        </div>

        <form
          className="academic-form"
          onSubmit={handleSubmit}
        >

          <div className="academic-input">
            <label>
              First Period Grade (G1)
            </label>

            <input
              type="number"
              name="G1"
              min="0"
              max="20"
              step="0.1"
              placeholder="0 - 20"
              value={formData.G1}
              onChange={handleChange}
              required
            />

            <small>
              Your earlier assessment grade.
            </small>
          </div>


          <div className="academic-input">
            <label>
              Second Period Grade (G2)
            </label>

            <input
              type="number"
              name="G2"
              min="0"
              max="20"
              step="0.1"
              placeholder="0 - 20"
              value={formData.G2}
              onChange={handleChange}
              required
            />

            <small>
              Your most recent assessment grade.
            </small>
          </div>


          <div className="academic-input">
            <label>Weekly Study Time</label>

            <select
              name="studytime"
              value={formData.studytime}
              onChange={handleChange}
              required
            >
              <option value="">
                Select study time
              </option>

              <option value="1">
                Less than 2 hours/week
              </option>

              <option value="2">
                2 - 5 hours/week
              </option>

              <option value="3">
                5 - 10 hours/week
              </option>

              <option value="4">
                More than 10 hours/week
              </option>
            </select>
          </div>


          <div className="academic-input">
            <label>
              Previous Class Failures
            </label>

            <select
              name="failures"
              value={formData.failures}
              onChange={handleChange}
              required
            >
              <option value="">
                Select
              </option>

              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4 or more</option>
            </select>
          </div>


          <div className="academic-input full-width">
            <label>Number of Absences</label>

            <input
              type="number"
              name="absences"
              min="0"
              placeholder="Example: 4"
              value={formData.absences}
              onChange={handleChange}
              required
            />
          </div>


          <button
            className="save-data-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Analyzing..."
              : "Analyze Performance"}
          </button>


          {message && (
            <p className="academic-message">
              {message}
            </p>
          )}

        </form>


        {prediction && (
          <div className="prediction-result">

            <p className="prediction-label">
              ML PREDICTION
            </p>

            <div className="prediction-result-grid">

              <div>
                <span>Predicted Score</span>

                <strong>
                  {prediction.predicted_percentage}%
                </strong>
              </div>

              <div>
                <span>Predicted Grade</span>

                <strong>
                  {prediction.predicted_grade}/20
                </strong>
              </div>

              <div>
                <span>Risk Level</span>

                <strong>
                  {prediction.risk_level}
                </strong>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default AcademicData;