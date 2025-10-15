// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const forceLogin = params.get("forceLogin"); // detecta si se fuerza login

  // Credenciales válidas (demo)
  const usuario = {
    correo: "admin@wonderland.cl",
    contrasena: "clave123",
  };

  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    const rol = localStorage.getItem("rol");

    // Redirige solo si hay sesión y NO se fuerza el login
    if (!forceLogin && usuarioActivo && rol === "admin") {
      navigate("/administracion");
    }
  }, [navigate, forceLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (correo === usuario.correo && contrasena === usuario.contrasena) {
      localStorage.setItem("usuarioActivo", correo);
      localStorage.setItem("rol", "admin");
      navigate("/administracion");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page vh-100 d-flex flex-column">
      {/* HEADER */}
      <header>
        <nav className="nav">
          <Link to="/">
            <img
              src="/assets/img/Logos/Header.png"
              alt="Pastelería Wonderland"
              className="logo-img"
            />
          </Link>
        </nav>
      </header>

      {/* MAIN */}
      <main>
        <div className="wrap" id="Login">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2>
                Inicio de Sesión<span className="title-underline"></span>
              </h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit} noValidate>
                <div className="field mb-3">
                  <label className="label" htmlFor="correo">
                    CORREO
                  </label>
                  <input
                    id="correo"
                    type="email"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>

                <div className="field mb-2">
                  <label className="label" htmlFor="contrasena">
                    CONTRASEÑA
                  </label>
                  <input
                    id="contrasena"
                    type="password"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                </div>

                <div className="links mb-3 text-end">
                  <a href="#" className="small text-decoration-none">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <div className="actions d-flex gap-2">
                  <button className="btn btn-primary flex-grow-1" type="submit">
                    Acceder
                  </button>
                  <button className="btn btn-outline flex-grow-1" type="button">
                    Crear cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer id="site-footer-login" className="mt-auto py-3">
        <div className="footer-content text-center">
          <p className="mb-1">&copy; Pastelería Wonderland — 2025</p>
          <a href="#" className="small text-decoration-none">
            Política de privacidad
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Login;
