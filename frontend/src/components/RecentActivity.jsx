function RecentActivity({ academicData }) {

  if (!academicData) {
    return (
      <div className="recent-activity">

        <div className="section-heading">
          <h3>Recent Activity</h3>
        </div>

        <p className="empty-activity">
          No academic analysis yet.
        </p>

      </div>
    );
  }


  return (
    <div className="recent-activity">

      <div className="section-heading">

        <div>
          <h3>Recent Activity</h3>

          <span>
            Latest StudentAI analysis
          </span>
        </div>

      </div>


      <div className="activity-table">

        <div className="activity-row activity-header">

          <span>Activity</span>

          <span>Score</span>

          <span>Status</span>

        </div>


        <div className="activity-row">

          <div>

            <strong>
              ML Performance Prediction
            </strong>

            <small>
              G1: {academicData.G1}/20 ·
              {" "}
              G2: {academicData.G2}/20
            </small>

          </div>


          <span>
            {academicData.predictedPercentage}%
          </span>


          <span
            className={`risk-badge ${
              academicData.riskLevel
                ? academicData.riskLevel.toLowerCase()
                : ""
            }`}
          >
            {academicData.riskLevel || "--"}
          </span>

        </div>

      </div>

    </div>
  );
}

export default RecentActivity;