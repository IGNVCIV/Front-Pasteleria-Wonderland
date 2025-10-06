import '../style/style.css';
import { useState } from "react";

function Footer() {
    const [correo, setCorreo] = useState("");

    return(
        <>
        <footer className="site-footer" role="contentinfo">
            <div className="footer container">

                <div className="footer-left">
                <ul className="footer-links" aria-label="Secciones del sitio (no interactivas)">
                    <a href="#">Nosotros</a>
                    <a href="#">Tiendas</a>
                    <a href="#">Despacho y retiro</a>
                    <a href="#">Preguntas frecuentes</a>
                    <a href="#">Política de privacidad</a>
                </ul>
                
                <ul className="footer-social" aria-label="Redes sociales (iniciar sesión)">
                    <li>
                    <a className="icon" href="https://www.instagram.com/accounts/login/"
                        target="_blank" rel="noopener noreferrer nofollow"
                        aria-label="Iniciar sesión en Instagram">
                        <i className="bi bi-instagram" aria-hidden="true"></i>
                    </a>
                    </li>
                    <li>
                    <a className="icon" href="https://www.facebook.com/login/"
                        target="_blank" rel="noopener noreferrer nofollow"
                        aria-label="Iniciar sesión en Facebook">
                        <i className="bi bi-facebook" aria-hidden="true"></i>
                    </a>
                    </li>
                    <li>
                    <a className="icon" href="https://www.tiktok.com/login"
                        target="_blank" rel="noopener noreferrer nofollow"
                        aria-label="Iniciar sesión en TikTok">
                        <i className="bi bi-tiktok" aria-hidden="true"></i>
                    </a>
                    </li>
                </ul>
                </div>

                <div className="footer-center">
                <img src="/assets/img/Logos/Footer.png" alt="Pastelería Wonderland" className="footer-logo" />
                </div>

                <div className="footer-right">
                <p className="footer-cta">Únete a nuestro club</p>
                <form id="clubw_email_form" className="footer-form" action="#">
                    <input id="email" 
                    type="email" 
                    name="email" 
                    placeholder="ejemplo@correo.cl" 
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required/>
                    <button type="submit" className="btn-primario">Unirme</button>
                </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© Pastelería Wonderland — 2025</p>
            </div>
        </footer>  
        </>
    )
}
export default Footer;