const StudentStats = ({ stats }) => (
  <section>
    <h2>Statistiques</h2>
    <div className="stats-grid">
      <div className="stat">
        <span className="stat-label">Total</span>
        <strong className="stat-value">{stats.total}</strong>
      </div>
      <div className="stat">
        <span className="stat-label">Âge moyen</span>
        <strong className="stat-value">{stats.average_age ?? "-"}</strong>
      </div>
      <div className="stat">
        <span className="stat-label">Âge min</span>
        <strong className="stat-value">{stats.min_age ?? "-"}</strong>
      </div>
      <div className="stat">
        <span className="stat-label">Âge max</span>
        <strong className="stat-value">{stats.max_age ?? "-"}</strong>
      </div>
      <div className="stat">
        <span className="stat-label">Ajoutés cette semaine</span>
        <strong className="stat-value">{stats.created_this_week}</strong>
      </div>
    </div>
  </section>
);

export default StudentStats;