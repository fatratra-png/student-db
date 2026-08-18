import { useEffect, useState } from "react";
import { createStudent, getStats, getStudents } from "./api/studentAPI.js";
import LoginForm from "./components/LoginForm.jsx";
import StudentStats from "./components/StudentStats.jsx";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
  });

  const loadStudents = () => {
    Promise.all([getStudents(), getStats()])
      .then(([studentList, statsData]) => {
        setStudents(studentList);
        setStats(statsData);
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    if (token) loadStudents();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setStudents([]);
    setStats(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createStudent({ ...form, age: form.age ? Number(form.age) : null });
      setForm({ first_name: "", last_name: "", email: "", age: "" });
      loadStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>Liste des Étudiants</h1>
        <button onClick={handleLogout}>Déconnexion</button>
      </header>

      {error && <p className="error">{error}</p>}

      {stats && <StudentStats stats={stats} />}

      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          name="last_name"
          placeholder="Nom"
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <input
          name="first_name"
          placeholder="Prénom"
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Âge"
          value={form.age}
          onChange={handleChange}
        />
        <button className="btn-primary" type="submit">Ajouter</button>
      </form>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Âge</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="id">{s.id}</td>
                <td>{s.last_name}</td>
                <td>{s.first_name}</td>
                <td>{s.email}</td>
                <td className="age">{s.age ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;