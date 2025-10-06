import './style/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Contacto from './pages/Contacto.jsx'

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
