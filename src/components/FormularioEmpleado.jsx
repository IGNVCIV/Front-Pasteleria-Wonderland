import { useState, useEffect } from "react";

function EmpleadoForm({ empleadoEdit, handleGuardar, cancelar }) {
  const [formData, setFormData] = useState({
    rut: "",
    dv: "",
    nombres: "",
    apellido1: "",
    apellido2: "",
    correo: "",
    telefono: "",
    cargo: "",
    direccion: "",
    fecha_nacimiento: "",
  });

  // Inicializar datos si es edición
  useEffect(() => {
    if (empleadoEdit) {
      setFormData(empleadoEdit);
    } else {
      setFormData({
        rut: "",
        dv: "",
        nombres: "",
        apellido1: "",
        apellido2: "",
        correo: "",
        telefono: "",
        cargo: "",
        direccion: "",
        fecha_nacimiento: "",
      });
    }
  }, [empleadoEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault(); // evita recargar la página
    handleGuardar(formData);
  };

  return (
    <section className="card shadow-sm p-3 mt-3">
      <h5>{empleadoEdit ? "Editar Empleado" : "Agregar Empleado"}</h5>
      <form onSubmit={onSubmit}>
        <div className="row g-2">
          <div className="col-md-4">
            <label className="form-label">RUT</label>
            <input
              name="rut"
              type="text"
              className="form-control"
              value={formData.rut}
              onChange={handleChange}
              disabled={!!empleadoEdit}
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">DV</label>
            <input
              name="dv"
              type="text"
              className="form-control"
              value={formData.dv}
              onChange={handleChange}
              disabled={!!empleadoEdit}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Nombres</label>
            <input
              name="nombres"
              type="text"
              className="form-control"
              value={formData.nombres}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Apellidos y correo */}
        <div className="row g-2 mt-2">
          <div className="col-md-4">
            <label className="form-label">Apellido 1</label>
            <input
              name="apellido1"
              type="text"
              className="form-control"
              value={formData.apellido1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Apellido 2</label>
            <input
              name="apellido2"
              type="text"
              className="form-control"
              value={formData.apellido2}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Correo</label>
            <input
              name="correo"
              type="email"
              className="form-control"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Teléfono y cargo */}
        <div className="row g-2 mt-2">
          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input
              name="telefono"
              type="text"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Cargo</label>
            <input
              name="cargo"
              type="text"
              className="form-control"
              value={formData.cargo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Dirección y fecha de nacimiento */}
        <div className="mt-2">
          <label className="form-label">Dirección</label>
          <input
            name="direccion"
            type="text"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="mt-2">
          <label className="form-label">Fecha de nacimiento</label>
          <input
            name="fecha_nacimiento"
            type="date"
            className="form-control"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            onClick={cancelar}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </section>
  );
}

export default EmpleadoForm;
