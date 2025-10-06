import Data_Catalogo from "../lib/Data_Catalogo.jsx"
 
function ProductCard({ producto }) {
  return (
    <div className="producto-card card shadow-sm">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top"
      />
      <div className="card-body text-center">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text fw-bold">${producto.precio.toLocaleString()}</p>
        <small className="text-muted">{producto.categoria}</small>
      </div>
    </div>
  );
}

export default ProductCard;