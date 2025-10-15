import { useEffect, useState } from "react";

function TopProductosCriticos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const catalogo = JSON.parse(localStorage.getItem("catalogoProductos")) || [];

    const catalogoConVentas = catalogo.map((prod) => ({
      ...prod,
      ventasSemanales: Math.floor(Math.random() * (60 - 5 + 1)) + 5,
    }));

    const top10 = catalogoConVentas.slice(0, 10);

    setProductos(top10);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        <span style={{ display: "inline-block", marginRight: "8px" }}>🍰</span>
        Top 10 Productos Críticos
      </h2>

      <div
        className="d-flex flex-row overflow-auto p-3 gap-3"
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          scrollBehavior: "smooth",
        }}
      >
        {productos.length > 0 ? (
          productos.map((prod, index) => (
            <div
              key={prod.id}
              className="p-3 text-center"
              style={{
                minWidth: "250px",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                backgroundColor: "#fdfaf9",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h5 className="mb-2 text-primary">#{index + 1}</h5>
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className="d-block mx-auto mb-2"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p className="mb-1">
                <strong>ID:</strong> {prod.id}
              </p>
              <p className="mb-1">
                <strong>Nombre:</strong> {prod.nombre}
              </p>
              <p className="mb-0">
                <strong>Ventas semanales:</strong> {prod.ventasSemanales} unidades
              </p>
            </div>
          ))
        ) : (
          <p className="text-center w-100">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default TopProductosCriticos;
