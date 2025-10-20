export default async function handler(req, res) {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      console.error("Falta API key");
      return res.status(500).json({ error: "Falta API key" });
    }

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=pastelería&language=es&pageSize=9&apiKey=${apiKey}`
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Error desde NewsAPI:", text);
      return res.status(response.status).json({
        error: "Error al obtener noticias desde NewsAPI",
        details: text,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error interno del servidor:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
