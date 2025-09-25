import { useLocation } from "react-router-dom";

function Productos() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoria = queryParams.get("categoria");

  return (
    <main>
      <h1>Productos</h1>
      {categoria && <p>Mostrando categoría: {categoria}</p>}
    </main>
  );
}

export default Productos;