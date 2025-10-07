import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Catalogo, { CATALOGO_INICIAL } from "../lib/Data_Catalogo";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../style/style.css';

function Productos() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoria = queryParams.get("categoria");

  const { catalogo } = Catalogo();
  const [productos, setProductos] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  useEffect(() => {
    const productosFiltrados = categoria
      ? catalogo.filter((p) => p.categoria === categoria)
      : catalogo;
    setProductos(productosFiltrados);
    setPaginaActual(1);
  }, [categoria, catalogo]);

  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosPagina = productos.slice(indexInicio, indexFin);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const anteriorPagina = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  return (
    <>
      <Navbar />
      <div id="banner-contacto">
          <img src="public/assets/img/Banner/productos.webp" alt="Pastelería Wonderland" className="banner opacity-75" />
          <p id="letra-b-producto">{categoria ? categoria : "Nuestros Productos"}</p>
      </div>
              <div className="d-flex justify-content-center mt-3 gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={anteriorPagina}
            disabled={paginaActual === 1}
          >
            &laquo; Anterior
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={siguientePagina}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente &raquo;
          </button>
        </div>
      <main className="container mt-4">
        <div
          id="productos-container"
          className="row g-3"
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          {productosPagina.length > 0 ? (
            productosPagina.map((prod) => (
              <div
                key={prod.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              >
                <ProductCard producto={prod} />
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>

        <div className="d-flex justify-content-center mt-3 gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={anteriorPagina}
            disabled={paginaActual === 1}
          >
            &laquo; Anterior
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={siguientePagina}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente &raquo;
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Productos;