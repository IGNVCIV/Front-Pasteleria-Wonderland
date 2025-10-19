function SidebarAdmin({
  visible,
  toggleOffcanvas,
  handleAgregarEmpleado,
  handleEditarEmpleado,
  empleadoSeleccionado,
  handleAgregarProducto,
  logout,
  setTabActivo,
  abrirPerfil
}) {
  return (
    
    <div
  data-testid="sidebar-admin"  // <- aquí
  className={`offcanvas offcanvas-end ${visible ? "show" : ""}`}
  style={{ 
    visibility: visible ? "visible" : "hidden",
    width: "280px"
  }}
>

      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Cuenta</h5>
       <button
  className="btn-close"
  onClick={toggleOffcanvas}
  aria-label="Cerrar barra"
/>

      </div>

      
      

      <div className="offcanvas-body d-flex flex-column p-0">
        {/* Inicio */}
        <div className="px-3 pt-2 pb-1 small text-uppercase text-muted">Inicio</div>
        <nav className="list-group list-group-flush mb-2">
          <button
            className="list-group-item list-group-item-action"
            onClick={() => { setTabActivo("bandeja"); toggleOffcanvas(); }}
          >
            <i className="bi bi-house-door me-2"></i> Home
          </button>
        </nav>

        {/* Productos */}
        <div className="px-3 pt-2 pb-1 small text-uppercase text-muted">Gestión de productos</div>
        <nav className="list-group list-group-flush mb-2">
          <button className="list-group-item list-group-item-action" onClick={() => { handleAgregarProducto(); toggleOffcanvas(); }}>
            <i className="bi bi-plus-circle me-2"></i> Agregar
          </button>
          <button className="list-group-item list-group-item-action" onClick={() => { setTabActivo("editarProducto"); toggleOffcanvas(); }}>
            <i className="bi bi-pencil-square me-2"></i> Modificar
          </button>
          <button className="list-group-item list-group-item-action" onClick={() => { setTabActivo("productos"); toggleOffcanvas(); }}>
            <i className="bi bi-table me-2"></i> Mostrar
          </button>
          <button className="list-group-item list-group-item-action" onClick={() => { setTabActivo("topProductos"); toggleOffcanvas(); }}>
            <i className="bi bi-bar-chart me-2"></i> Top 10 Productos
          </button>
        </nav>

        {/* Empleados */}
        <div className="px-3 pt-3 pb-1 small text-uppercase text-muted">Gestión de empleados</div>
        <nav className="list-group list-group-flush mb-2">
          <button className="list-group-item list-group-item-action" onClick={() => { handleAgregarEmpleado(); setTabActivo("empleados"); toggleOffcanvas(); }}>
            <i className="bi bi-person-plus me-2"></i> Agregar
          </button>
          <button className="list-group-item list-group-item-action" onClick={() => { handleEditarEmpleado(empleadoSeleccionado); setTabActivo("empleados"); toggleOffcanvas(); }}>
            <i className="bi bi-person-gear me-2"></i> Modificar
          </button>
          <button className="list-group-item list-group-item-action" onClick={() => { setTabActivo("empleados"); toggleOffcanvas(); }}>
            <i className="bi bi-people me-2"></i> Mostrar
          </button>
        </nav>

        {/* Perfil */}
        <div className="px-3 pt-3 pb-1 small text-uppercase text-muted">Funcionalidades</div>
        <nav className="list-group list-group-flush mb-2">
          <button className="list-group-item list-group-item-action" onClick={() => abrirPerfil()}>
            <i className="bi bi-person-circle me-2"></i> Perfil Administrador
          </button>
          <button className="list-group-item list-group-item-action">
            <i className="bi bi-shield-lock me-2"></i> Seguridad
          </button>
        </nav>

        {/* Logout */}
        <div className="mt-auto p-3 border-top">
          <button className="btn w-100 btn-outline-danger" onClick={logout}>
            <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin;
