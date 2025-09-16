import './App.css'

function App() {
  return (
    <header>
      <nav class="nav">
        <img src="/assets/img/Logos/Header.png" alt="Pastelería Wonderland" class="logo-img"></img>
          <ul class="menu">
          <li class="menu-item"><a href="index.html">Inicio</a></li>

          <li class="menu-item has-children">
              <a href="productos.html">Productos ▾</a>
              <button class="submenu-toggle">▾</button>
              <ul class="sub-menu">
                <li class="menu-item"><a href="productos.html?categoria=Tortas Cuadradas">Tortas Cuadradas</a></li>
                <li class="menu-item"><a href="productos.html?categoria=Tortas Circulares">Tortas Circulares</a></li>
                <li class="menu-item"><a href="productos.html?categoria=Postres Individuales">Postres</a></li>
                <li class="menu-item"><a href="productos.html?categoria=Pastelería Tradicional">Pastelería Tradicional</a></li>
                <li class="menu-item"><a href="productos.html?categoria=Productos Sin Azúcar">Sin Azúcar</a></li>
                <li class="menu-item"><a href="productos.html?categoria=Productos Sin Gluten">Sin Gluten</a></li>
                <li class="menu-item"><a href="productos.html?categoria=Productos Veganos">Vegano</a></li>
                <li class="menu-item"><a href="productos.html?categoria=Tortas Especiales">Tortas Especiales</a></li>
                </ul>
          </li>
          <li class="menu-item"><a href="contacto.html">Contactanos</a></li>
          <li class="menu-item"><a href="login.html">Mi Cuenta</a></li>
          </ul>
          
          <a href="carrito.html" class="action-btn">Carrito de Compras</a>
      </nav>
    </header>
  )
}
export default App
