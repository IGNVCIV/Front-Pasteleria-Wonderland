import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Catalogo, { CATALOGO_INICIAL } from "../lib/Data_Catalogo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../style/style.css';

function DetalleProducto() {
    const { id } = useParams();
    const { catalogo } = Catalogo();
    const navigate = useNavigate();

    const producto = catalogo.find(p => p.id.toString() === id);

    if (!producto) {
        return (
        <>
            <Navbar />
            <div className="container mt-5 text-center">
            <h2>Producto no encontrado</h2>
            <button className="btn btn-secondary mt-3" onClick={() => navigate("/productos")}>
                Volver a Productos
            </button>
            </div>
            <Footer />
        </>
        );
    }

    const agregarAlCarrito = () => {
        const carritoActual = JSON.parse(localStorage.getItem("cart")) || [];
        const existente = carritoActual.find((p) => p.id === producto.id);

        if (existente) {
        existente.cantidad = Math.min(existente.cantidad + 1, 8);
        } else {
        carritoActual.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(carritoActual));
        alert(`${producto.nombre} agregado al carrito`);
    };

    return(
        <>
            <Navbar />
                <div className="container mt-5">
                    <div className="row align-items-center">
                    {/* Imagen principal */}
                    <div className="col-md-6 text-center">
                        <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    </div>

                    {/* Detalles */}
                    <div className="col-md-6">
                        <h2 className="text-uppercase font-weight-bold text-monospace fs-1" style={{ color: "#b1976b" }}>
                        {producto.nombre}
                        </h2>
                        <h4>${producto.precio.toLocaleString()}</h4>
                        <p className="mt-3">{producto.descripcion}</p>

                        <div className="d-flex align-items-center mt-4 gap-3">
                        <button className="btn btn-outline-secondary" onClick={() => navigate("/productos")}>
                            Volver
                        </button>
                        <button className="btn btn-success" onClick={agregarAlCarrito}>
                            Añadir al carrito
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}
export default DetalleProducto;