import { useState, useEffect } from "react";

function BandejaContacto() {
  const [mensajes, setMensajes] = useState([]);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);

  useEffect(() => {
    fetch("/mensajes.json")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.length === 0) {
          // mensaje de ejemplo
          setMensajes([
            {
              fecha: new Date().toLocaleDateString(),
              nombre: "Torta de matrimonio",
              correo: "fran@duocuc.cl",
              orden: "-",
              mensaje:
                "Necesitamos una torta de boda muy grande, de tres pisos, con decoración elegante y flores comestibles. El evento será el 15 de diciembre y necesitamos que la entrega sea puntual en la iglesia central. Además, queremos que tenga sabor vainilla con relleno de frambuesa en todos los pisos. Por favor, confirmen disponibilidad y precio."
            }
          ]);
        } else {
          setMensajes(data);
        }
      })
      .catch((err) => {
        console.error("Error cargando mensajes:", err);
        setMensajes([
          {
            fecha: new Date().toLocaleDateString(),
            nombre: "Torta de matrimonio",
            correo: "fran@duocuc.cl",
            orden: "-",
            mensaje:
              "Necesitamos una torta de boda muy grande, de tres pisos, con decoración elegante y flores comestibles. El evento será el 15 de diciembre y necesitamos que la entrega sea puntual en la iglesia central. Además, queremos que tenga sabor vainilla con relleno de frambuesa en todos los pisos. Por favor, confirmen disponibilidad y precio."
          }
        ]);
      });
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Bandeja de contacto</h2>
      <p className="text-muted">Mensajes recibidos desde el formulario.</p>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Orden</th>
                <th>Mensaje</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {mensajes.map((m, index) => (
                <tr key={index}>
                  <td>{m.fecha}</td>
                  <td>{m.nombre}</td>
                  <td>{m.correo}</td>
                  <td>{m.orden || "-"}</td>
                  <td>
                    {m.mensaje.length > 50
                      ? m.mensaje.substring(0, 50) + "..."
                      : m.mensaje}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setMensajeSeleccionado(m)}
                    >
                      Ver completo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal simple */}
      {mensajeSeleccionado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setMensajeSeleccionado(null)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "8px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80%",
              overflowY: "auto",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5>Mensaje de {mensajeSeleccionado.nombre}</h5>
            <p>{mensajeSeleccionado.mensaje}</p>
            <div className="text-end">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setMensajeSeleccionado(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BandejaContacto;
