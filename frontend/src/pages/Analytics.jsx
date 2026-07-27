import { Link } from "react-router-dom";


function Analytics() {

  const models = [
    {
      name: "Linear Regression",
      mae: 0.746,
      rmse: 1.155,
      r2: 0.863,
      selected: true,
    },

    {
      name: "Random Forest",
      mae: 0.800,
      rmse: 1.329,
      r2: 0.819,
      selected: false,
    },

    {
      name: "Gradient Boosting",
      mae: 0.771,
      rmse: 1.343,
      r2: 0.815,
      selected: false,
    },
  ];


  const features = [
    {
      name: "G1",
      description:
        "Student's first-period academic grade.",
    },

    {
      name: "G2",
      description:
        "Student's second-period academic grade.",
    },

    {
      name: "Study Time",
      description:
        "Weekly study-time category from 1 to 4.",
    },

    {
      name: "Failures",
      description:
        "Number of previous class failures.",
    },

    {
      name: "Absences",
      description:
        "Number of recorded school absences.",
    },
  ];


  return (
    <div className="analytics-page">

      <div className="analytics-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="analytics-header">

          <div>

            <span className="analytics-label">
              STUDENTAI · ML ANALYTICS
            </span>

            <h1>
              Model Analytics
            </h1>

            <p>
              Performance, evaluation and
              technical information about the
              machine-learning model powering
              StudentAI.
            </p>

          </div>


          <Link
            to="/dashboard"
            className="analytics-back-button"
          >
            ← Dashboard
          </Link>

        </div>


        {/* =========================
            SELECTED MODEL
        ========================= */}

        <section className="analytics-section">

          <div className="analytics-section-title">

            <div>
              <h2>Selected Model</h2>

              <p>
                Best-performing model from our
                evaluation experiments.
              </p>
            </div>

            <span className="selected-model-badge">
              BEST MODEL
            </span>

          </div>


          <div className="selected-model-card">

            <div className="model-main-info">

              <span>
                MACHINE LEARNING MODEL
              </span>

              <h2>
                Linear Regression
              </h2>

              <p>
                Predicts the student's final
                academic grade using five
                academic and behavioral features.
              </p>

            </div>


            <div className="model-metrics">

              <div>
                <span>R² Score</span>
                <strong>0.863</strong>
              </div>

              <div>
                <span>MAE</span>
                <strong>0.746</strong>
              </div>

              <div>
                <span>RMSE</span>
                <strong>1.155</strong>
              </div>

            </div>

          </div>

        </section>


        {/* =========================
            METRIC EXPLANATIONS
        ========================= */}

        <section className="analytics-section">

          <div className="analytics-section-title">

            <div>
              <h2>Evaluation Metrics</h2>

              <p>
                Metrics used to evaluate
                prediction quality.
              </p>
            </div>

          </div>


          <div className="metric-explanation-grid">


            <div className="metric-explanation-card">

              <span className="metric-symbol">
                R²
              </span>

              <h3>
                R² Score
              </h3>

              <strong>
                86.3%
              </strong>

              <p>
                Indicates how much of the
                variation in final grades is
                explained by the model.
              </p>

            </div>


            <div className="metric-explanation-card">

              <span className="metric-symbol">
                MAE
              </span>

              <h3>
                Mean Absolute Error
              </h3>

              <strong>
                0.746
              </strong>

              <p>
                The model's predictions differ
                from the actual grade by about
                0.75 grade points on average.
              </p>

            </div>


            <div className="metric-explanation-card">

              <span className="metric-symbol">
                RMSE
              </span>

              <h3>
                Root Mean Squared Error
              </h3>

              <strong>
                1.155
              </strong>

              <p>
                Measures prediction error while
                penalizing larger errors more
                heavily.
              </p>

            </div>

          </div>

        </section>


        {/* =========================
            MODEL COMPARISON
        ========================= */}

        <section className="analytics-section">

          <div className="analytics-section-title">

            <div>

              <h2>
                Model Comparison
              </h2>

              <p>
                Three regression algorithms were
                evaluated before selecting the
                final model.
              </p>

            </div>

          </div>


          <div className="model-table-wrapper">

            <table className="model-table">

              <thead>

                <tr>
                  <th>Model</th>
                  <th>MAE ↓</th>
                  <th>RMSE ↓</th>
                  <th>R² ↑</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                {models.map((model) => (

                  <tr
                    key={model.name}
                    className={
                      model.selected
                        ? "selected-row"
                        : ""
                    }
                  >

                    <td>
                      <strong>
                        {model.name}
                      </strong>
                    </td>

                    <td>
                      {model.mae.toFixed(3)}
                    </td>

                    <td>
                      {model.rmse.toFixed(3)}
                    </td>

                    <td>
                      {model.r2.toFixed(3)}
                    </td>

                    <td>

                      {model.selected ? (

                        <span className="table-best-badge">
                          Selected
                        </span>

                      ) : (

                        <span className="table-tested-badge">
                          Tested
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          <div className="model-selection-note">

            <strong>
              Why Linear Regression?
            </strong>

            <p>
              Linear Regression achieved the
              highest R² score and the lowest MAE
              and RMSE among the three evaluated
              models. It is also highly
              interpretable, allowing StudentAI
              to expose individual feature
              contributions.
            </p>

          </div>

        </section>


        {/* =========================
            FEATURES
        ========================= */}

        <section className="analytics-section">

          <div className="analytics-section-title">

            <div>

              <h2>
                Model Features
              </h2>

              <p>
                Inputs used by the trained model
                to predict the final grade.
              </p>

            </div>

            <span className="feature-count">
              5 FEATURES
            </span>

          </div>


          <div className="feature-grid">

            {features.map(
              (feature, index) => (

                <div
                  className="feature-card"
                  key={feature.name}
                >

                  <div className="feature-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div>

                    <h3>
                      {feature.name}
                    </h3>

                    <p>
                      {feature.description}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* =========================
            PIPELINE
        ========================= */}

        <section className="analytics-section">

          <div className="analytics-section-title">

            <div>

              <h2>
                Prediction Pipeline
              </h2>

              <p>
                How academic data moves through
                StudentAI.
              </p>

            </div>

          </div>


          <div className="pipeline">

            <div className="pipeline-item">
              <span>01</span>
              <strong>Student Input</strong>
              <p>Academic data entered</p>
            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-item">
              <span>02</span>
              <strong>FastAPI</strong>
              <p>Validation & preprocessing</p>
            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-item">
              <span>03</span>
              <strong>ML Model</strong>
              <p>Linear Regression inference</p>
            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-item">
              <span>04</span>
              <strong>Prediction</strong>
              <p>Score & risk generated</p>
            </div>

            <div className="pipeline-arrow">
              →
            </div>

            <div className="pipeline-item">
              <span>05</span>
              <strong>Firestore</strong>
              <p>Results stored securely</p>
            </div>

          </div>

        </section>


        {/* =========================
            TECH STACK
        ========================= */}

        <section className="analytics-section">

          <div className="analytics-section-title">

            <div>
              <h2>Technology Stack</h2>

              <p>
                Technologies used throughout
                StudentAI.
              </p>
            </div>

          </div>


          <div className="tech-stack">

            <span>React</span>
            <span>Vite</span>
            <span>Firebase Auth</span>
            <span>Firestore</span>
            <span>FastAPI</span>
            <span>Python</span>
            <span>Pandas</span>
            <span>Scikit-learn</span>
            <span>Joblib</span>

          </div>

        </section>

      </div>

    </div>
  );
}


export default Analytics;