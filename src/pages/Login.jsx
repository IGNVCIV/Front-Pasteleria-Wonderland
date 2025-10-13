import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  // Cargar admin.json desde public
  useEffect(() => {
    fetch("/admin.json")
      .then((res) => res.json())
      .then((data) => setUsuario(data))
      .catch((err) => console.error("Error cargando usuario:", err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!usuario) {
      setError("Usuario no cargado aún, intenta de nuevo.");
      return;
    }

    if (correo === usuario.correo && contrasena === usuario.contrasena) {
      sessionStorage.setItem("rol", "admin");
      sessionStorage.setItem("authUser", correo);
      navigate("/admin");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div
          className="card p-5 shadow"
          style={{ minWidth: "380px", maxWidth: "450px", width: "100%" }}
        >
          <h2 className="text-center mb-4">Inicio de Sesión</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo
              </label>
              <input
                id="correo"
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasena" className="form-label">
                Contraseña
              </label>
              <input
                id="contrasena"
                type="password"
                className="form-control"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-end">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Acceder
              </button>
              <button type="button" className="btn btn-outline-secondary">
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="bg-light text-center py-3"
        style={{ borderTop: "1px solid #ddd" }}
      >
        <div className="footer-content">
          <p className="mb-1">&copy; Pastelería Wonderland — 2025</p>
          <a href="#">Política de privacidad</a>
        </div>
      </footer>
    </div>
  );
}

export default Login;
