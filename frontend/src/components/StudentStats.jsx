const StudentStats = ({ stats }) => (
  <div>
    <h2>Statistiques</h2>
    <p>Total : {stats.total}</p>
    <p>Âge moyen : {stats.average_age ?? "-"}</p>
    <p>Âge min : {stats.min_age ?? "-"}</p>
    <p>Âge max : {stats.max_age ?? "-"}</p>
    <p>Ajoutés cette semaine : {stats.created_this_week}</p>
  </div>
);

export default StudentStats;