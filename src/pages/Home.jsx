import '../style/style.css';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer.jsx';
import { Carousel } from "bootstrap";

function Home(){
    
    return (
    <>
        <Navbar />
        <main>
        <section id="Carousel" className="carousel slide carousel-fade">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#Carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#Carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#Carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>    
            
            <div className="carousel-inner">            
                <div className="carousel-item active">
                <img src="/assets/img/Carousel/carousel-1.webp" className="d-block" alt="Bandeja de panes de chocolate recién horneados en la pastelería"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Bienvenido al sabor de siempre</h5>
                    <p>Recién horneados, crujientes y con el aroma que despierta sonrisas. Te invitamos a comenzar tu día con lo mejor de nuestra pastelería.</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src="/assets/img/Carousel/carousel-2.webp" className="d-block" alt="Vista del interior acogedor de la pastelería con vitrinas y estantes de pan"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>El espacio que ya conoces</h5>
                    <p>Con años de tradición, nuestra pastelería sigue siendo el lugar donde disfrutas del sabor y la calidez de siempre.</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src="/assets/img/Carousel/carousel-3.webp" className="d-block" alt="Selección de tortas artesanales"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Tu torta, a tu manera</h5>
                    <p>Variedad de sabores únicos para cada ocasión especial.</p>
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#Carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#Carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </section>
        <section id="bannerInicio">
            <Link to="/productos">Revisa nuestra carta</Link>
        </section>

        <section className="productos-mas-vendidos section-pad">
            <div className="container">
            <h2 id="top-ventas-letra">Productos más vendidos</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center"
                    id="top-ventas-container">

            </div>
            </div>
        </section>

        <article id="Noticia" aria-labelledby="tit-inspira">
            <header>
            <h2 id="tit-inspira">Técnica internacional que inspira nuestra pastelería</h2>
            <p className="meta"><time dateTime="2025-09-06">6 de septiembre de 2025</time> · Inspiración profesional</p>
            </header>
            <p>En Pastelería <strong>Wonderland</strong> creemos en la formación continua…</p>
            <ul className="resumen">
            <li>Control de fermentación para migas ligeras y crujiente uniforme.</li>
            <li>Consistencia de producto a escala.</li>
            </ul>
                <figure className="video">
                    <iframe
                    title="A day in the life of a baker (inspiración)"
                    src="https://www.youtube.com/embed/lCCuZ1DTaWo?start=52"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    ></iframe>
                    <figcaption>
                    Fuente: “A day in my life working as a baker” (YouTube). Subtítulos disponibles.
                    </figcaption>
                </figure>
            <footer>
            <Link className="btn-primario" to="/productos">
              Conoce nuestras tortas artesanales
            </Link>
            </footer>
        </article>
        </main>
        <Footer />
        </>    
    )
}
export default Home;