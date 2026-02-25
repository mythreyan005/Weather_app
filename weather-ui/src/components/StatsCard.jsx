function StatsCard({ stats }) {
  if (!stats) return null;

  return (
    <div className="card">
      <h3>Temperature Statistics</h3>
      <p><strong>Highest:</strong> {stats.high} °C</p>
      <p><strong>Median:</strong> {stats.median} °C</p>
      <p><strong>Minimum:</strong> {stats.min} °C</p>
    </div>
  );
}

export default StatsCard;