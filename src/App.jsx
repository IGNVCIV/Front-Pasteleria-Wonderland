import './style/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
