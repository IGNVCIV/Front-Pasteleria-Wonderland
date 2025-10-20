import { useState, useEffect } from "react";

export default function NoticiaHome() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //const API_KEY = "71a7428258ef478daa17af3c1b1ef133";
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
    const URL = `https://newsapi.org/v2/everything?q=repostería&language=es&sortBy=publishedAt&apiKey=${API_KEY}`;

    const obtenerNoticias = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Error al obtener noticias");
        const data = await res.json();
        setNoticias(data.articles.slice(0, 9));
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerNoticias();
  }, []);

  if (cargando)
    return <p className="text-center my-4">Cargando dulces noticias...</p>;
  if (error)
    return <p className="text-center text-danger">Error: {error}</p>;

  // Agrupar las noticias en grupos de 3 para cada slide
  const grupos = [];
  for (let i = 0; i < noticias.length; i += 3) {
    grupos.push(noticias.slice(i, i + 3));
  }

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Noticias del Mundo de la Pastelería</h2>

      <div
        id="carouselNoticias"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-inner">
          {grupos.map((grupo, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <div className="row">
                {grupo.map((n, j) => (
                  <div key={j} className="col-md-4 mb-3">
                    <div className="card h-100 shadow-sm">
                      {n.urlToImage && (
                        <img
                          src={n.urlToImage}
                          className="card-img-top"
                          alt={n.title}
                          style={{
                            height: "200px",
                            objectFit: "cover",
                            borderTopLeftRadius: "0.5rem",
                            borderTopRightRadius: "0.5rem",
                          }}
                        />
                      )}
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{n.title}</h5>
                        <p className="card-text text-muted small">
                          {n.description
                            ? n.description.slice(0, 100) + "..."
                            : "Sin descripción disponible."}
                        </p>
                        <a
                          href={n.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm mt-auto"
                        >
                          Leer más →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselNoticias"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselNoticias"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}
    