import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario desde JSON
  useEffect(() => {
  fetch("/assets/json/admin.json")
    .then((res) => res.json())
    .then((data) => setUsuario(data))
    .catch((err) => console.error("Error cargando usuario:", err));
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!usuario) return;

    // Validar usuario
    if (correo === usuario.correo && contrasena === usuario.contrasena) {
      sessionStorage.setItem("authUser", correo);
      sessionStorage.setItem("rol", "admin");
      navigate("/administracion");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page vh-100 d-flex flex-column">
      <header>
        <nav className="nav">
          <a href="/">
            <img src="assets/img/logo.png" alt="Pastelería Wonderland" className="logo-img" />
          </a>
        </nav>
      </header>

      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="card shadow" style={{ minWidth: "400px", maxWidth: "480px", width: "90%" }}>
          <div className="card-body p-4">
            <h2 className="mb-3">Inicio de Sesión<span className="title-underline"></span></h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="field mb-3">
                <label className="label" htmlFor="correo">CORREO</label>
                <input
                  id="correo"
                  type="email"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="field mb-3">
                <label className="label" htmlFor="contrasena">CONTRASEÑA</label>
                <input
                  id="contrasena"
                  type="password"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </div>

              <div className="links mb-3">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>

              <div className="actions d-flex gap-2">
                <button className="btn btn-primary flex-grow-1" type="submit">Acceder</button>
                <button className="btn btn-outline-secondary flex-grow-1" type="button">Crear cuenta</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer id="site-footer-login" className="py-3 mt-auto text-center bg-light">
        <div className="footer-content">
          <p>&copy; Pastelería Wonderland — 2025</p>
          <a href="#">Política de privacidad</a>
        </div>
      </footer>
    </div>
  );
}

export default Login;