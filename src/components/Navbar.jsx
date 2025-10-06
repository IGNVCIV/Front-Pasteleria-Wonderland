import '../style/style.css';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="nav">
        <img src="/assets/img/Logos/Header.png" alt="Pastelería Wonderland" className="logo-img" />
          <ul className="menu">
            <li className="menu-item"><Link to="/home">Inicio</Link></li>

            <li className="menu-item has-children">
              <Link to="/productos">Productos ▾</Link>
              <button className="submenu-toggle">▾</button>
                <ul className="sub-menu">
                <li className="menu-item"><Link to="/productos?categoria=Tortas Cuadradas">Tortas Cuadradas</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Tortas Circulares">Tortas Circulares</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Postres">Postres</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Pastelería Tradicional">Pastelería Tradicional</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Sin Ázucar">Sin Azúcar</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Sin Gluten">Sin Gluten</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Veganos">Vegano</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Tortas Especiales">Tortas Especiales</Link></li>
                </ul>
          </li>
          <li className="menu-item"><Link to="/contacto">Contáctanos</Link></li>
          <li className="menu-item"><Link to="/login">Mi Cuenta</Link></li>
          </ul>
          
          <Link to="/Carrito" className="action-btn">Carrito de Compras</Link>
      </nav>
    </header>
  )
}
export default Navbar;
