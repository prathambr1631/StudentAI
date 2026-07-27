import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import PerformanceChart from "../components/PerformanceChart";
import SubjectProgress from "../components/SubjectProgress";
import RecentActivity from "../components/RecentActivity";
import RecommendationCard from "../components/RecommendationCard";


function Dashboard() {
  // =========================
  // STATE
  // =========================

  const [student, setStudent] = useState(null);

  const [academicData, setAcademicData] =
    useState(null);

  const [predictionHistory, setPredictionHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // =========================
  // FETCH DASHBOARD DATA
  // =========================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setLoading(false);
          return;
        }


        // =========================
        // 1. USER PROFILE
        // =========================

        const userRef = doc(
          db,
          "users",
          user.uid
        );

        const userSnap =
          await getDoc(userRef);

        if (userSnap.exists()) {
          setStudent(
            userSnap.data()
          );
        }


        // =========================
        // 2. LATEST ACADEMIC DATA
        // =========================

        const academicRef = doc(
          db,
          "academicData",
          user.uid
        );

        const academicSnap =
          await getDoc(academicRef);

        if (academicSnap.exists()) {
          setAcademicData(
            academicSnap.data()
          );
        }


        // =========================
        // 3. PREDICTION HISTORY
        // =========================

        const historyRef = collection(
          db,
          "users",
          user.uid,
          "predictions"
        );

        const historyQuery = query(
          historyRef,
          orderBy(
            "createdAt",
            "desc"
          ),
          limit(10)
        );

        const historySnap =
          await getDocs(historyQuery);


        const historyData =
          historySnap.docs.map(
            (historyDocument) => ({
              id: historyDocument.id,
              ...historyDocument.data(),
            })
          );


        // Firestore gives newest → oldest.
        // Chart needs oldest → newest.

        setPredictionHistory(
          historyData.reverse()
        );

      } catch (error) {
        console.error(
          "Error loading dashboard:",
          error
        );

      } finally {
        setLoading(false);
      }
    };


    fetchDashboardData();

  }, []);


  // =========================
  // DASHBOARD VALUES
  // =========================

  const predictedScore =
    academicData?.predictedPercentage !== undefined
      ? `${academicData.predictedPercentage}%`
      : "--";


  const predictedGrade =
    academicData?.predictedGrade !== undefined
      ? `${academicData.predictedGrade}/20`
      : "--";


  const riskLevel =
    academicData?.riskLevel || "--";


  const absences =
    academicData?.absences !== undefined
      ? academicData.absences
      : "--";


  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading StudentAI...
      </div>
    );
  }


  // =========================
  // DASHBOARD
  // =========================

  return (
    <div className="dashboard-container">

      {/* NAVBAR */}

      <Navbar student={student} />


      <main className="dashboard-content">

        {/* =========================
            HEADER
        ========================= */}

        <div className="dashboard-header">

          <div className="welcome-section">

            <h1>
              Welcome back,{" "}
              {student?.name || "Student"}! 👋
            </h1>

            <p>
              Here's your latest academic
              performance and AI-powered
              prediction.
            </p>

          </div>


          <a
            href="/academic-data"
            className="update-data-button"
          >
            Update Academic Data
          </a>

        </div>


        {/* =========================
            MAIN GRID
        ========================= */}

        <div className="dashboard-grid">


          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="dashboard-left">


            {/* STAT CARDS */}

            <div className="stats-grid">

              <StatCard
                title="Predicted Score"
                value={predictedScore}
                subtitle="ML Performance Forecast"
              />


              <StatCard
                title="Predicted Grade"
                value={predictedGrade}
                subtitle="Final Grade Prediction"
              />


              <StatCard
                title="Risk Level"
                value={riskLevel}
                subtitle="Academic Risk Analysis"
              />


              <StatCard
                title="Absences"
                value={absences}
                subtitle="Recorded Absences"
              />

            </div>


            {/* =========================
                ACADEMIC PROGRESS
            ========================= */}

            <SubjectProgress
              G1={academicData?.G1}
              G2={academicData?.G2}
              predictedGrade={
                academicData?.predictedGrade
              }
            />

          </div>


          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="dashboard-right">

            <PerformanceChart
              history={
                predictionHistory
              }
            />

          </div>

        </div>


        {/* =========================
            RECENT ACTIVITY
        ========================= */}

        <RecommendationCard
          academicData={academicData}
        />

        <RecentActivity
          academicData={
            academicData
          }
        />

      </main>

    </div>
  );
}


export default Dashboard;