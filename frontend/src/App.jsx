import { getStudents } from "./api/studentAPI";
import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container">
      <h1>Student database</h1>
      {loading && <p className="status">Loading students...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="id">{s.id}</td>
                <td>{s.first_name}</td>
                <td>{s.last_name}</td>
                <td className="email">{s.email}</td>
                <td className="age">{s.age ?? "-"}</td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="5" className="empty">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default App;