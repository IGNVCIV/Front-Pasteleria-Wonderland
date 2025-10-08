import React from "react";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const subtotal = item.precio * item.cantidad;

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          {item.imagen && (
            <img
              src={item.imagen}
              alt={item.nombre}
              className="me-3 rounded"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
              }}
            />
          )}
          <span>{item.nombre}</span>
        </div>
      </td>

      <td>${item.precio.toLocaleString("es-CL")}</td>

      <td className="cantidad-td bg-transparent">
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onDecrease(item.id)}
            title="Disminuir cantidad"
          >
            −
          </button>
          <span className="mx-3 fw-semibold">{item.cantidad}</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onIncrease(item.id)}
            title="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </td>

      <td>${subtotal.toLocaleString("es-CL")}</td>

      <td className="text-center">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onRemove(item.id)}
          title="Eliminar producto"
        >
          <i className="bi bi-trash"></i> Eliminar
        </button>
      </td>
    </tr>
  );
}
export default CartItem;