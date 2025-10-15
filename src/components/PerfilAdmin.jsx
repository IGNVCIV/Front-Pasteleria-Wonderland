// src/components/PerfilAdmin.jsx
import { useState } from "react";



function PerfilAdmin() {
  const admin = {
    nombre: "Taylor Swift",
    correo: "admin@wonderland.cl",
    telefono: "+56998765432",
  };

  const [formData, setFormData] = useState(admin);
  const [editando, setEditando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    setEditando(false);
    alert("Perfil actualizado correctamente ✅");
  };

  return (
    <div className="card shadow-sm p-4">
      <h2 className="h5 mb-3">Perfil Administrador</h2>
      <p className="text-muted mb-4">
        Administra tu información de contacto y credenciales principales.
      </p>

      <form onSubmit={handleGuardar}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            disabled={!editando}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Correo</label>
          <input
            type="email"
            name="correo"
            className="form-control"
            value={formData.correo}
            onChange={handleChange}
            disabled={!editando}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            value={formData.telefono}
            onChange={handleChange}
            disabled={!editando}
          />
        </div>

        <div className="d-flex justify-content-end">
          {editando ? (
            <>
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-skin"
              onClick={() => setEditando(true)}
            >
              Editar Perfil
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PerfilAdmin;
