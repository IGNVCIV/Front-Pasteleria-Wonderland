import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeaderAdmin from "../components/HeaderAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import BandejaContacto from "../components/BandejaContacto";
import ProductoForm from "../components/ProductoForm";
import SeccionEmpleados from "../components/SeccionEmpleados";
import PerfilAdmin from "../components/PerfilAdmin";
import TopProductos from "../components/TopProductos";

function Admin() {
  const [mensajes, setMensajes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState(
    () => JSON.parse(localStorage.getItem("catalogoProductos")) || []
  );

  const [tabActivo, setTabActivo] = useState("bandeja");
  const [productoEdit, setProductoEdit] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  // 🔹 Cargar mensajes y empleados al iniciar
  useEffect(() => {
    fetch("/mensajes.json")
      .then(res => res.json())
      .then(data => setMensajes(data))
      .catch(err => console.error("Error cargando mensajes:", err));

    fetch("/personal.json")
      .then(res => res.json())
      .then(data => setEmpleados(data))
      .catch(err => console.error("Error cargando empleados:", err));
  }, []);

  // 🔹 Mostrar u ocultar Sidebar
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  // 🔹 Cerrar sesión
  const logout = () => {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("rol");
    navigate("/inicio-sesion");
  };

  // 🔹 Agregar producto
  const handleAgregarProducto = () => {
    setProductoEdit(null);
    setTabActivo("agregarProducto");
  };

  // 🔹 Editar producto
  const handleEditarProducto = (producto) => {
    if (!producto) return alert("Selecciona un producto primero");
    setProductoEdit(producto);
    setTabActivo("editarProducto");
  };

  // 🔹 Guardar producto
  const handleGuardarProducto = (producto) => {
    const nuevosProductos = productoEdit
      ? productos.map(p => (p.id === producto.id ? producto : p))
      : [...productos, producto];

    setProductos(nuevosProductos);
    setProductoEdit(null);
    setTabActivo("bandeja");
    localStorage.setItem("catalogoProductos", JSON.stringify(nuevosProductos));
  };

  // 🔹 Abrir perfil administrador
  const abrirPerfil = () => {
    setTabActivo("perfil");
    setSidebarVisible(false);
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <HeaderAdmin toggleOffcanvas={toggleSidebar} />

      {/* Sidebar */}
      <SidebarAdmin
        visible={sidebarVisible}
        toggleOffcanvas={toggleSidebar}
        setTabActivo={setTabActivo}
        handleAgregarEmpleado={() => setTabActivo("empleados")}
        handleEditarEmpleado={() => setTabActivo("empleados")}
        handleAgregarProducto={handleAgregarProducto}
        abrirPerfil={abrirPerfil}
        logout={logout}
      />

      {/* Contenido principal */}
      <main className="px-3 px-md-4 mt-3">
        {tabActivo === "bandeja" && <BandejaContacto mensajes={mensajes} />}
        {tabActivo === "empleados" && (
          <SeccionEmpleados empleados={empleados} setEmpleados={setEmpleados} />
        )}
        {(tabActivo === "agregarProducto" || tabActivo === "editarProducto") && (
          <ProductoForm
            productoEdit={productoEdit}
            handleGuardarProducto={handleGuardarProducto}
            cancelar={() => setTabActivo("bandeja")}
          />
        )}
        {tabActivo === "perfil" && <PerfilAdmin key="perfil" />}
        {tabActivo === "topProductos" && <TopProductos />}
      </main>
    </div>
  );
}

export default Admin;
