function HeaderAdmin({ toggleOffcanvas }) {
  return (
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
  );
}

export default HeaderAdmin;
