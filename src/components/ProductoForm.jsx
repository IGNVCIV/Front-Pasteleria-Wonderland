function ProductoForm({ productoEdit, handleGuardarProducto, setFormVisibleProducto }) {
  const CATEGORIAS = [
    "Tortas Cuadradas",
    "Tortas Circulares",
    "Postres Individuales",
    "Productos Sin Azúcar",
    "Pastelería Tradicional",
    "Productos Sin Gluten",
    "Productos Veganos",
    "Tortas Especiales"
  ];

  return (
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
              {CATEGORIAS.map((cat) => (
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
  );
}

export default ProductoForm;
