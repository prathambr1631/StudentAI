function RecommendationCard({ academicData }) {
  if (!academicData) {
    return (
      <div className="recommendation-card">
        <div className="recommendation-header">
          <div>
            <h3>Smart Recommendations</h3>
            <p>Personalized academic suggestions</p>
          </div>

          <span className="ai-badge">AI</span>
        </div>

        <p className="recommendation-empty">
          Analyze your academic performance to receive recommendations.
        </p>
      </div>
    );
  }

  const recommendations = [];

  const G1 = Number(academicData.G1);
  const G2 = Number(academicData.G2);
  const studytime = Number(academicData.studytime);
  const failures = Number(academicData.failures);
  const absences = Number(academicData.absences);
  const predictedPercentage = Number(
    academicData.predictedPercentage
  );

  // ==========================================
  // STUDY TIME
  // ==========================================

  if (studytime <= 1) {
    recommendations.push({
      icon: "📚",
      title: "Increase Study Time",
      text: "Your weekly study time is low. Aim for at least 5–10 focused study hours per week.",
      type: "warning",
    });
  } else if (studytime === 2) {
    recommendations.push({
      icon: "📖",
      title: "Improve Study Consistency",
      text: "You currently study around 2–5 hours per week. Moving toward 5–10 hours may improve your performance.",
      type: "info",
    });
  } else {
    recommendations.push({
      icon: "✅",
      title: "Good Study Routine",
      text: "Your current study-time level is strong. Focus on maintaining consistency and effective revision.",
      type: "success",
    });
  }

  // ==========================================
  // ATTENDANCE
  // ==========================================

  if (absences >= 15) {
    recommendations.push({
      icon: "⚠️",
      title: "Attendance Needs Attention",
      text: `You currently have ${absences} recorded absences. Reducing missed classes should be a priority.`,
      type: "danger",
    });
  } else if (absences >= 7) {
    recommendations.push({
      icon: "🗓️",
      title: "Monitor Attendance",
      text: `You have ${absences} recorded absences. Try to avoid unnecessary absences and maintain regular attendance.`,
      type: "warning",
    });
  } else {
    recommendations.push({
      icon: "🎯",
      title: "Maintain Attendance",
      text: "Your recorded absence level is currently under control. Keep attending classes consistently.",
      type: "success",
    });
  }

  // ==========================================
  // GRADE TREND
  // ==========================================

  if (G2 > G1) {
    recommendations.push({
      icon: "📈",
      title: "Performance Improving",
      text: `Your grade increased from ${G1}/20 to ${G2}/20. Continue using the study strategies that contributed to this improvement.`,
      type: "success",
    });
  } else if (G2 < G1) {
    recommendations.push({
      icon: "📉",
      title: "Performance Decline Detected",
      text: `Your grade decreased from ${G1}/20 to ${G2}/20. Review difficult topics and increase revision before the next assessment.`,
      type: "danger",
    });
  } else {
    recommendations.push({
      icon: "➡️",
      title: "Performance Stable",
      text: `Your grades remain at ${G2}/20. Try adjusting your study strategy to create further improvement.`,
      type: "info",
    });
  }

  // ==========================================
  // FAILURES
  // ==========================================

  if (failures > 0) {
    recommendations.push({
      icon: "🧠",
      title: "Strengthen Fundamentals",
      text: "Previous academic failures indicate that some foundational topics may need revision. Prioritize weak subjects before moving to advanced material.",
      type: "danger",
    });
  }

  // ==========================================
  // ML PREDICTION
  // ==========================================

  if (predictedPercentage < 50) {
    recommendations.push({
      icon: "🚨",
      title: "High Academic Risk",
      text: `Your ML forecast is ${predictedPercentage.toFixed(
        1
      )}%. Focus first on attendance, consistent study time, and weak academic areas.`,
      type: "danger",
    });
  } else if (predictedPercentage < 75) {
    recommendations.push({
      icon: "💡",
      title: "Improvement Opportunity",
      text: `Your predicted score is ${predictedPercentage.toFixed(
        1
      )}%. Your performance is moderate, with room for improvement through consistent preparation.`,
      type: "warning",
    });
  } else {
    recommendations.push({
      icon: "🏆",
      title: "Strong Performance Forecast",
      text: `Your predicted score is ${predictedPercentage.toFixed(
        1
      )}%. Maintain your current strengths while continuing to improve weaker areas.`,
      type: "success",
    });
  }

  return (
    <div className="recommendation-card">

      <div className="recommendation-header">

        <div>
          <h3>Smart Recommendations</h3>
          <p>
            Personalized from your academic data
          </p>
        </div>

        <span className="ai-badge">
          AI
        </span>

      </div>

      <div className="recommendation-list">

        {recommendations.map(
          (recommendation, index) => (
            <div
              className={`recommendation-item ${recommendation.type}`}
              key={index}
            >
              <div className="recommendation-icon">
                {recommendation.icon}
              </div>

              <div>
                <h4>
                  {recommendation.title}
                </h4>

                <p>
                  {recommendation.text}
                </p>
              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
}

export default RecommendationCard;