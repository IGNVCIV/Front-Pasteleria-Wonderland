import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Data_Catalogo from "../lib/Data_Catalogo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../style/style.css';

function Productos() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoria = queryParams.get("categoria");

  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  useEffect(() => {
    const catalogo =
      JSON.parse(localStorage.getItem("catalogoProductos")) || Data_Catalogo;

    const productosFiltrados = categoria
      ? catalogo.filter((p) => p.categoria === categoria)
      : catalogo;
    setProductos(productosFiltrados);
    setPaginaActual(1);
  }, [categoria]);

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
        <main className="container mt-4">
          <h2 className="mb-4 text-center">
            {categoria ? categoria : "Nuestros Productos"}
          </h2>

          <div
            id="productos-container"
            className="row g-3"
            style={{
              maxHeight: "70vh",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            {productosPagina .length > 0 ? (
              productosPagina .map((prod) => (
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
        </main>
      <Footer />  
    </>
  );
}
export default Productos;