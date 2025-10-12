import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [empleados, setEmpleados] = useState([]);
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false); // control del apartado
  const [empleadoEdit, setEmpleadoEdit] = useState(null);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  // --- Estado y funciones para productos ---
  const [formVisibleProducto, setFormVisibleProducto] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);
  const [productos, setProductos] = useState(() => {
    return JSON.parse(localStorage.getItem("catalogoProductos")) || [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/personal.json")
      .then((res) => res.json())
      .then((data) => setEmpleados(data))
      .catch((err) => console.error("Error cargando empleados:", err));
  }, []);

  const toggleOffcanvas = () => setOffcanvasVisible(!offcanvasVisible);

  const logout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  // --- Funciones empleados ---
  const handleAgregarEmpleado = () => {
    setEmpleadoEdit(null);
    setFormVisible(true);
  };

  const handleEditarEmpleado = (empleado) => {
    setEmpleadoEdit(empleado);
    setFormVisible(true);
  };

  const handleEliminar = (rut) => {
    if (window.confirm("¿Deseas eliminar este empleado?")) {
      setEmpleados(empleados.filter((e) => e.rut !== rut));
      setEmpleadoSeleccionado(null);
    }
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    const form = e.target;
    const nuevoEmpleado = {
      rut: empleadoEdit ? empleadoEdit.rut : Date.now(),
      dv: form.dv.value,
      nombres: form.nombres.value,
      apellido1: form.apellido1.value,
      apellido2: form.apellido2.value,
      correo: form.correo.value,
      fecha_nacimiento: form.fecha_nacimiento.value,
      direccion: form.direccion.value,
      telefono: form.telefono.value,
      cargo: form.cargo.value,
    };

    if (empleadoEdit) {
      setEmpleados(
        empleados.map((emp) => (emp.rut === empleadoEdit.rut ? nuevoEmpleado : emp))
      );
    } else {
      setEmpleados([...empleados, nuevoEmpleado]);
    }

    setFormVisible(false);
  };

  // --- Funciones productos ---
  const generarIdPorCategoria = (categoria) => {
    const CATEGORY_PREFIX = {
      "Tortas Cuadradas": "TC",
      "Tortas Circulares": "TT",
      "Postres Individuales": "PI",
      "Productos Sin Azúcar": "PS",
      "Pastelería Tradicional": "PT",
      "Productos Sin Gluten": "PG",
      "Productos Veganos": "PV",
      "Tortas Especiales": "TE"
    };
    const prefijo = CATEGORY_PREFIX[categoria] || "PR";
    let max = 0;
    for (const p of productos) {
      if (p.id.startsWith(prefijo)) {
        const num = parseInt(p.id.slice(prefijo.length), 10);
        if (!Number.isNaN(num)) max = Math.max(max, num);
      }
    }
    return `${prefijo}${String(max + 1).padStart(3, "0")}`;
  };

  const handleAgregarProducto = () => {
    setProductoEdit(null);
    setFormVisibleProducto(true);
  };

  const handleGuardarProducto = async (e) => {
    e.preventDefault();
    const form = e.target;
    const categoria = form.categoria.value;
    const id = productoEdit ? productoEdit.id : generarIdPorCategoria(categoria);

    let imagen = form.imagen_url.value;
    const archivo = form.imagen_archivo?.files?.[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        guardarProducto({
          id,
          nombre: form.nombre.value,
          precio: parseFloat(form.precio.value),
          categoria,
          imagen: reader.result,
        });
      };
      reader.readAsDataURL(archivo);
    } else {
      guardarProducto({
        id,
        nombre: form.nombre.value,
        precio: parseFloat(form.precio.value),
        categoria,
        imagen: imagen || "",
      });
    }

    setFormVisibleProducto(false);
    form.reset();
  };

  const guardarProducto = (producto) => {
    const nuevosProductos = productoEdit
      ? productos.map((p) => (p.id === producto.id ? producto : p))
      : [...productos, producto];
    setProductos(nuevosProductos);
    localStorage.setItem("catalogoProductos", JSON.stringify(nuevosProductos));
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="navbar bg-white border-bottom sticky-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="navbar-brand fw-semibold">
            <i className="bi bi-cupcake me-2"></i> Pastelería Wonderland • Administración
          </h1>
          <button
            className="btn btn-outline-secondary ms-auto"
            onClick={toggleOffcanvas}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="px-3 px-md-4 mt-3">
        <h2 className="h4 mb-3">Gestión de empleados</h2>
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>RUT</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Cargo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((e) => (
                  <tr
                    key={e.rut}
                    className={empleadoSeleccionado?.rut === e.rut ? "table-active" : ""}
                    onClick={() => setEmpleadoSeleccionado(e)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{`${e.rut}-${e.dv}`}</td>
                    <td>{`${e.nombres} ${e.apellido1} ${e.apellido2}`}</td>
                    <td>{e.correo}</td>
                    <td>{e.cargo}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary me-1"
                        onClick={() => handleEditarEmpleado(e)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleEliminar(e.rut)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {empleados.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No hay empleados registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Apartado de formulario empleados */}
        {formVisible && (
          <section className="card shadow-sm p-3 mt-3">
            <h5>{empleadoEdit ? "Editar Empleado" : "Agregar Empleado"}</h5>
            <form onSubmit={handleGuardar}>
              {/* --- campos del formulario, intactos --- */}
              <div className="row g-2">
                <div className="col-md-4">
                  <label className="form-label">RUT</label>
                  <input
                    name="rut"
                    type="text"
                    className="form-control"
                    defaultValue={empleadoEdit?.rut || ""}
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
                    defaultValue={empleadoEdit?.dv || ""}
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
                    defaultValue={empleadoEdit?.nombres || ""}
                    required
                  />
                </div>
              </div>

              <div className="row g-2 mt-2">
                <div className="col-md-4">
                  <label className="form-label">Apellido 1</label>
                  <input
                    name="apellido1"
                    type="text"
                    className="form-control"
                    defaultValue={empleadoEdit?.apellido1 || ""}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Apellido 2</label>
                  <input
                    name="apellido2"
                    type="text"
                    className="form-control"
                    defaultValue={empleadoEdit?.apellido2 || ""}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Correo</label>
                  <input
                    name="correo"
                    type="email"
                    className="form-control"
                    defaultValue={empleadoEdit?.correo || ""}
                    required
                  />
                </div>
              </div>

              <div className="row g-2 mt-2">
                <div className="col-md-6">
                  <label className="form-label">Teléfono</label>
                  <input
                    name="telefono"
                    type="text"
                    className="form-control"
                    defaultValue={empleadoEdit?.telefono || ""}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cargo</label>
                  <input
                    name="cargo"
                    type="text"
                    className="form-control"
                    defaultValue={empleadoEdit?.cargo || ""}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="form-label">Dirección</label>
                <input
                  name="direccion"
                  type="text"
                  className="form-control"
                  defaultValue={empleadoEdit?.direccion || ""}
                />
              </div>

              <div className="mt-2">
                <label className="form-label">Fecha de nacimiento</label>
                <input
                  name="fecha_nacimiento"
                  type="date"
                  className="form-control"
                  defaultValue={empleadoEdit?.fecha_nacimiento || ""}
                />
              </div>

              <div className="mt-3 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={() => {
                    setEmpleadoEdit(null);
                    setFormVisible(false);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Apartado de formulario productos */}
        {formVisibleProducto && (
          <section className="card shadow-sm p-3 mt-3">
            <h5>{productoEdit ? "Editar Producto" : "Agregar Producto"}</h5>
            <form onSubmit={handleGuardarProducto}>
              <div className="row g-2">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input
                    name="nombre"
                    type="text"
                    className="form-control"
                    defaultValue={productoEdit?.nombre || ""}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Precio</label>
                  <input
                    name="precio"
                    type="number"
                    className="form-control"
                    defaultValue={productoEdit?.precio || ""}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Categoría</label>
                  <select
                    name="categoria"
                    className="form-select"
                    defaultValue={productoEdit?.categoria || "Tortas Cuadradas"}
                    required
                  >
                    {Object.keys({
                      "Tortas Cuadradas": "TC",
                      "Tortas Circulares": "TT",
                      "Postres Individuales": "PI",
                      "Productos Sin Azúcar": "PS",
                      "Pastelería Tradicional": "PT",
                      "Productos Sin Gluten": "PG",
                      "Productos Veganos": "PV",
                      "Tortas Especiales": "TE"
                    }).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row g-2 mt-2">
                <div className="col-md-6">
                  <label className="form-label">Imagen (URL)</label>
                  <input
                    name="imagen_url"
                    type="text"
                    className="form-control"
                    defaultValue={productoEdit?.imagen || ""}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Imagen (Archivo)</label>
                  <input name="imagen_archivo" type="file" className="form-control" />
                </div>
              </div>

              <div className="mt-3 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={() => setFormVisibleProducto(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      {/* Offcanvas */}
      <div
        className={`offcanvas offcanvas-end ${offcanvasVisible ? "show" : ""}`}
        style={{ visibility: offcanvasVisible ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Cuenta</h5>
          <button className="btn-close" onClick={toggleOffcanvas}></button>
        </div>
        <div className="offcanvas-body d-flex flex-column p-0">
          <div className="px-3 pt-2 pb-1 small text-uppercase text-muted">Inicio</div>
          <nav className="list-group list-group-flush mb-2">
            <a className="list-group-item list-group-item-action" href="/admin">
              <i className="bi bi-house-door me-2"></i> Home
            </a>
          </nav>

          <div className="px-3 pt-2 pb-1 small text-uppercase text-muted">Gestión de productos</div>
          <nav className="list-group list-group-flush">
            <button className="list-group-item list-group-item-action" onClick={handleAgregarProducto}>
              <i className="bi bi-plus-circle me-2"></i> Agregar
            </button>
            <button className="list-group-item list-group-item-action">
              <i className="bi bi-pencil-square me-2"></i> Modificar
            </button>
            <a className="list-group-item list-group-item-action" href="#">
              <i className="bi bi-table me-2"></i> Mostrar
            </a>
          </nav>

          <div className="px-3 pt-3 pb-1 small text-uppercase text-muted">Gestión de empleados</div>
          <nav className="list-group list-group-flush">
            <button className="list-group-item list-group-item-action" onClick={handleAgregarEmpleado}>
              <i className="bi bi-person-plus me-2"></i> Agregar
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => {
                if (empleadoSeleccionado) handleEditarEmpleado(empleadoSeleccionado);
                else alert("Selecciona un empleado de la tabla primero");
              }}
            >
              <i className="bi bi-person-gear me-2"></i> Modificar
            </button>
            <a className="list-group-item list-group-item-action" href="#">
              <i className="bi bi-people me-2"></i> Mostrar
            </a>
          </nav>

          <div className="px-3 pt-3 pb-1 small text-uppercase text-muted">Funcionalidades</div>
          <nav className="list-group list-group-flush">
            <a className="list-group-item list-group-item-action" href="#">
              <i className="bi bi-gear me-2"></i> Preferencias
            </a>
            <a className="list-group-item list-group-item-action" href="#">
              <i className="bi bi-shield-lock me-2"></i> Seguridad
            </a>
          </nav>

          <div className="mt-auto p-3 border-top">
            <button className="btn w-100 btn-outline-danger" onClick={logout}>
              <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
