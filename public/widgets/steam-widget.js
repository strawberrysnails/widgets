(async () => {
  const script = document.currentScript;
  if (!script) return;
  const params = new URL(script.src).searchParams;
  const steamId = params.get("steamid");
  if (!steamId) {
    console.error("Steam ID not provided in script URL");
    return;
  }
  const div = document.createElement("div");
  div.className = "steam-widget";
  div.textContent = "Loading last played game...";
  script.parentNode.insertBefore(div, script.nextSibling);


  const WORKER_URL = "https://steam-widget.strawberryjam.workers.dev/api/steam";

  try {
    const res = await fetch(`${WORKER_URL}?steamid=${steamId}`);
    const data = await res.json();

    if (!data || !data.name) {
      div.textContent = "No recent games";
      return;
    }

    div.innerHTML = `
      <strong>Last played game:</strong> ${data.name}<br>
      <strong>Hours played:</strong> ${data.hours}h
    `;
  } catch (err) {
    div.textContent = "Error fetching Steam data";
    console.error(err);
  }

  const style = document.createElement("style");
  style.textContent = `
    .steam-widget {
      padding: 0.5rem 1rem;
      background: #1b2838;
      color: #c7d5e0;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      display: inline-block;
      max-width: 300px;
      margin: 0.5rem 0;
    }
    .steam-widget strong {
      color: #66c0f4;
    }
  `;
  document.head.appendChild(style);
})();
