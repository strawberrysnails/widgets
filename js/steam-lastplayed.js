(async () => {
  const script = document.currentScript;
  if (!script) return;

  const theme = script.className || 'default';

  const params = new URL(script.src).searchParams;
  const steamId = params.get("steamid");
  if (!steamId) {
    console.error("Steam ID not provided in script URL");
    return;
  }

  const div = document.createElement("div");
  div.className = `steam-widget ${theme}`;
  div.textContent = "Loading last played game...";
  script.parentNode.insertBefore(div, script.nextSibling);

const WORKER_URL = "https://api.strawberryjam.workers.dev/api/steam-lastplayed";
  try {
    const res = await fetch(`${WORKER_URL}?steamid=${steamId}`);
    const data = await res.json();

    if (!data || !data.name) {
      div.textContent = "No recent games";
      return;
    }

    div.innerHTML = `
      <strong>Last played game:</strong> ${data.name}<br>
      <strong>Hours played:</strong> ${data.hours}hrs
    `;
  } catch (err) {
    div.textContent = "Error fetching Steam data";
    console.error(err);
  }
})();
