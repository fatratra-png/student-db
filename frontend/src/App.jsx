import { getStudents } from "./api/studentAPI";
import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <h1>Student database</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
              <td>{s.id}</td>
              <td>{s.first_name}</td>
              <td>{s.last_name}</td>
              <td>{s.email}</td>
              <td>{s.age ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
