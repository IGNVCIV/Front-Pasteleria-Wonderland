export default async function handler(req, res) {
  const apiKey = process.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not found" });
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `NewsAPI error: ${response.statusText}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
