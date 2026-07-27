function SubjectProgress({ G1, G2, predictedGrade }) {
  const g1Percentage =
    G1 !== undefined ? (G1 / 20) * 100 : 0;

  const g2Percentage =
    G2 !== undefined ? (G2 / 20) * 100 : 0;

  const predictedPercentage =
    predictedGrade !== undefined
      ? (predictedGrade / 20) * 100
      : 0;

  return (
    <div className="subject-progress">

      <div className="section-heading">
        <h3>Academic Progress</h3>

        <span>Current performance</span>
      </div>

      {/* G1 */}

      <div className="progress-item">

        <div className="progress-info">
          <span>First Period Grade</span>

          <strong>
            {G1 !== undefined
              ? `${G1}/20`
              : "--"}
          </strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${g1Percentage}%`,
            }}
          />
        </div>

      </div>


      {/* G2 */}

      <div className="progress-item">

        <div className="progress-info">
          <span>Second Period Grade</span>

          <strong>
            {G2 !== undefined
              ? `${G2}/20`
              : "--"}
          </strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${g2Percentage}%`,
            }}
          />
        </div>

      </div>


      {/* ML Prediction */}

      <div className="progress-item">

        <div className="progress-info">
          <span>ML Predicted Grade</span>

          <strong>
            {predictedGrade !== undefined
              ? `${predictedGrade}/20`
              : "--"}
          </strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill predicted-progress"
            style={{
              width: `${predictedPercentage}%`,
            }}
          />
        </div>

      </div>

    </div>
  );
}

export default SubjectProgress;