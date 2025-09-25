import './style/style.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return(
    <>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>

        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}
export default App
