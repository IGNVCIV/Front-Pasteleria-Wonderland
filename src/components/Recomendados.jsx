import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Recomendados({ catalogo, productoId }) {
  const [recomendados, setRecomendados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const relacionados = catalogo
      .filter((r) => r.id !== productoId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setRecomendados(relacionados);
  }, [catalogo, productoId]);

  if (recomendados.length === 0) return null;

  return (
    <div className="container-lg my-5">
      <h4 className="text-center text-secondary mb-4">También te puede gustar</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
        {recomendados.map((relacionado) => (
          <div key={relacionado.id} className="col" style={{ maxWidth: "320px" }}>
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img
                src={relacionado.imagen}
                alt={relacionado.nombre}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-medium text-dark mb-2 fs-5">{relacionado.nombre}</h5>
                <button
                  id="Detalle-boton"
                  className="btn btn-sm px-4"
                  onClick={() => navigate(`/producto/${relacionado.id}`)}
                >
                  <i className="bi bi-eye me-2"></i>Ver Producto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recomendados;
