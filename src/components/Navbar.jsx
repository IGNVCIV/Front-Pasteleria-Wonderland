import '../style/style.css';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="nav">
        <img src="/assets/img/Logos/Header.png" alt="Pastelería Wonderland" className="logo-img" />
          <ul className="menu">
            <li className="menu-item"><Link to="/home" className="text-decoration-none">Inicio</Link></li>

            <li className="menu-item has-children">
              <Link to="/productos" className="text-decoration-none">Productos ▾</Link>
              <button className="submenu-toggle">▾</button>
                <ul className="sub-menu">
                <li className="menu-item"><Link to="/productos?categoria=Tortas Cuadradas">Tortas Cuadradas</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Tortas Circulares">Tortas Circulares</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Postres Individuales">Postres</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Pastelería Tradicional">Pastelería Tradicional</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Productos Sin Azúcar">Sin Azúcar</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Productos Sin Gluten">Sin Gluten</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Productos Veganos">Vegano</Link></li>
                <li className="menu-item"><Link to="/productos?categoria=Tortas Especiales">Tortas Especiales</Link></li>
                </ul>
          </li>
          <li className="menu-item"><Link to="/contacto" className="text-decoration-none">Contáctanos</Link></li>
          <li className="menu-item"><Link to="/login" className="text-decoration-none">Mi Cuenta</Link></li>
          </ul>
          <Link to="/carro-de-compras" className="action-btn text-decoration-none">Carro de Compras</Link>
      </nav>
    </header>
  )
}
export default Navbar;
