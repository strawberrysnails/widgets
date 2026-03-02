(async () => {
  const script = document.currentScript;
  if (!script) return;

  const theme = script.className;
  const params = new URL(script.src).searchParams;
  const steamId = params.get("steamid");
  if (!steamId) {
    console.error("Steam ID not provided in script URL");
    return;
  }

  if (theme) {
    const CSS_URL = "https://strawberrysnails.github.io/steam-widgets/themes/steam.css";
    if (!document.querySelector(`link[href="${CSS_URL}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_URL;
      document.head.appendChild(link);
    }
  }

  const span = document.createElement("span");
  span.textContent = "Loading most played game...";
  if (theme) {
    span.className = `steam-widget ${theme}`;
  }
  script.parentNode.insertBefore(span, script.nextSibling);

  const WORKER_URL = "https://api.strawberryjam.workers.dev/api/steam-mostplayed";
  try {
    const res = await fetch(`${WORKER_URL}?steamid=${steamId}`);
    const data = await res.json();
    if (!data || !data.name) {
      span.textContent = "No data available";
      return;
    }
    span.textContent = `Most played: ${data.name} — ${data.hours} hours`;
  } catch (err) {
    span.textContent = "Error fetching Steam data";
    console.error(err);
  }
})();