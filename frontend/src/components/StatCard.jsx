function StatCard({ icon, title, value, message, type = "positive" }) {
  return (
    <div className="stat-card">
      <div className="stat-title">
        <span className="stat-icon">{icon}</span>
        <span>{title}</span>
      </div>

      <h2>{value}</h2>

      <span className={`stat-message ${type}`}>
        {message}
      </span>
    </div>
  );
}

export default StatCard;