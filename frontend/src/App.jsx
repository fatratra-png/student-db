import { useEffect, useState } from "react";
import {
  getStudents,
  getStats,
  createStudent,
  login,
  register,
} from "./api/studentAPI.js";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
  });

  function loadStudents() {
    Promise.all([getStudents(), getStats()])
      .then(([studentList, statsData]) => {
        setStudents(studentList);
        setStats(statsData);
      })
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    if (token) loadStudents();
  }, [token]);

  function handleAuthChange(e) {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  }

  async function handleAuthSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const result = isRegister
        ? await register(authForm)
        : await login(authForm);
      localStorage.setItem("token", result.token);
      setToken(result.token);
      setAuthForm({ email: "", password: "" });
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    setStudents([]);
    setStats(null);
  }

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

  if (!token) {
    return (
      <div>
        <h1>Connexion</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleAuthSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={authForm.email}
            onChange={handleAuthChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={authForm.password}
            onChange={handleAuthChange}
            required
          />
          <button type="submit">{isRegister ? "S'inscrire" : "Se connecter"}</button>
        </form>
        <p>
          {isRegister ? "Déjà un compte ? " : "Pas de compte ? "}
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Se connecter" : "S'inscrire"}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Liste des Étudiants</h1>
      <button onClick={handleLogout}>Déconnexion</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {stats && (
        <div>
          <h2>Statistiques</h2>
          <p>Total : {stats.total}</p>
          <p>Âge moyen : {stats.average_age ?? "-"}</p>
          <p>Âge min : {stats.min_age ?? "-"}</p>
          <p>Âge max : {stats.max_age ?? "-"}</p>
          <p>Ajoutés cette semaine : {stats.created_this_week}</p>
        </div>
      )}

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
