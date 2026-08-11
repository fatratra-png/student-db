import { useEffect, useState } from "react";
import { getStudents, createStudent } from "./api/studentAPI.js";
const App = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
  });

  function loadStudents() {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await createStudent({ ...form, age: form.age ? Number(form.age) : null });
      setForm({ first_name: "", last_name: "", email: "", age: "" });
      loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Liste des Étudiants</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Ajouter</button>
      </form>

      <table border="1" cellPadding="6">
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
              <td>{s.id}</td>
              <td>{s.last_name}</td>
              <td>{s.first_name}</td>
              <td>{s.email}</td>
              <td>{s.age ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default App;
