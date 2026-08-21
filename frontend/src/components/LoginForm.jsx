import { useState } from "react";
import { login, register } from "../api/studentAPI.js";

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = isRegister ? await register(form) : await login(form);
      localStorage.setItem("token", result.token);
      onLogin(result.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth">
      <h1>{isRegister ? "Créer un compte" : "Connexion"}</h1>
      {error && <p className="error">{error}</p>}
      <form className="form-stack" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn-primary" type="submit">
          {isRegister ? "S'inscrire" : "Se connecter"}
        </button>
      </form>
      <p>
        <button className="link-btn" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;