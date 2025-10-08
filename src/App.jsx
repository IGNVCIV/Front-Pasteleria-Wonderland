import './style/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Contacto from './pages/Contacto.jsx'
import Carro from './pages/Carro.jsx'

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carro-de-compras" element={<Carro />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
