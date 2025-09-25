import '../style/style.css'
import { useState } from "react";

function Footer() {
    const [correo, setCorreo] = useState("");

    <footer class="site-footer" role="contentinfo">
      <div class="footer container">

        <div class="footer-left">
          <ul class="footer-links" aria-label="Secciones del sitio (no interactivas)">
            <a href="#">Nosotros</a>
            <a href="#">Tiendas</a>
            <a href="#">Despacho y retiro</a>
            <a href="#">Preguntas frecuentes</a>
            <a href="#">Política de privacidad</a>
          </ul>
        
          <ul class="footer-social" aria-label="Redes sociales (iniciar sesión)">
            <li>
              <a class="icon" href="https://www.instagram.com/accounts/login/"
                target="_blank" rel="noopener noreferrer nofollow"
                aria-label="Iniciar sesión en Instagram">
                <i class="bi bi-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a class="icon" href="https://www.facebook.com/login/"
                target="_blank" rel="noopener noreferrer nofollow"
                aria-label="Iniciar sesión en Facebook">
                <i class="bi bi-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a class="icon" href="https://www.tiktok.com/login"
                target="_blank" rel="noopener noreferrer nofollow"
                aria-label="Iniciar sesión en TikTok">
                <i class="bi bi-tiktok" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-center">
          <img src="/assets/img/Logos/Footer.png" alt="Pastelería Wonderland" className="footer-logo" />
        </div>

        <div class="footer-right">
          <p class="footer-cta">Únete a nuestro club</p>
          <form id="clubw_email_form" class="footer-form" action="#">
            <input id="email" 
            type="email" 
            name="email" 
            placeholder="ejemplo@correo.cl" 
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required/>
            <button type="submit" class="btn-primario">Unirme</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© Pastelería Wonderland — 2025</p>
      </div>
    </footer>  
}
export default Footer;