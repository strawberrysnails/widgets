
# Creating and Deploying a Widget

## 1️1 Create a new Cloudflare Worker for your widget

1. Open a terminal in your development folder.
2. Run:

```bash
wrangler init my-widget
cd my-widget
```

3. When prompted for a template:Choose **“Worker only”** (you just need the JS route, no full-stack assets).
4. This creates a folder with a **default `src/index.js`** and **`wrangler.jsonc`** config.

## 2️ Add your API key(s) as a secret

1. In your Worker folder, add the secret using Wrangler:

```bash
wrangler secret put MY_API_KEY
```

2. Do **not** put your API key directly in `index.js`.
3. Reference it in your code via `env.MY_API_KEY`:

```js
const apiKey = env.MY_API_KEY;
```

## 3️ Write your Worker code

1. Open `src/index.js`.
2. Example structure (Steam widget):

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/steam") {
      const steamId = url.searchParams.get("steamid");
      if (!steamId) return new Response("Missing steamid", { status: 400 });

      try {
        const res = await fetch(
          `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}`
        );
        const json = await res.json();

        return new Response(JSON.stringify(json), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // IMPORTANT for cross-site use
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          status: 500,
        });
      }
    }

    return new Response("Not found", { status: 404 });
  },
};
```

**Tips:**

* Always add `Access-Control-Allow-Origin: *` so your widget works on CodePen, GitHub Pages, or any site.
* Include error handling and check for missing parameters.


## 4️ Deploy the Worker

1. Make sure you’re logged in with Wrangler:

```bash
wrangler login
```

2. Deploy:

```bash
wrangler deploy
```

3. Copy the **Worker URL** for your widget, e.g.:

```
https://steam-widget.YOURACCOUNT.workers.dev/api/steam
```

---

## 5️ Create the embeddable JS file for your repo

1. In your `widgets` repo (`public/js/`), create a file for your widget:

```
widgets/public/js/steam-widget.js
```

2. Template code:

```js
(async () => {
  const script = document.currentScript;
  const params = new URL(script.src).searchParams;
  const steamId = params.get("steamid");
  if (!steamId) return;

  const div = document.createElement("div");
  div.className = "steam-widget";
  div.textContent = "Loading...";
  script.parentNode.insertBefore(div, script.nextSibling);

  const WORKER_URL = "https://steam-widget.YOURACCOUNT.workers.dev/api/steam";

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
    div.textContent = "Error fetching data";
    console.error(err);
  }

  const style = document.createElement("style");
  style.textContent = `
    .steam-widget { padding: 0.5rem 1rem; background:#1b2838; color:#c7d5e0; border-radius:8px; font-family:Arial,sans-serif; display:inline-block; max-width:300px; margin:0.5rem 0; }
    .steam-widget strong { color:#66c0f4; }
  `;
  document.head.appendChild(style);
})();
```

* Replace `WORKER_URL` with the URL from your Worker.
* This JS is what users will embed with a `<script>` tag and a query string for their Steam ID.

---

## 6️ Test the widget

1. Open CodePen (or JSFiddle) and add:

```html
<script src="https://strawberrysnails.github.io/widgets/js/steam-widget.js?steamid=STEAM_ID_HERE"></script>
```

2. Check the **browser console** (F12 → Console) for any errors.
3. Make sure the widget renders and shows the Steam data.

---

## 7️ Add the widget to your repo and GitHub Pages

1. Place the new JS file in `widgets/public/js/`.
2. Push changes to GitHub.
3. GitHub Pages will serve it at:

```
https://strawberrysnails.github.io/widgets/js/steam-widget.js
```

4. Users can embed with:

```html
<script src="https://strawberrysnails.github.io/widgets/js/steam-widget.js?steamid=STEAM_ID_HERE"></script>
```

---

## 8️ Save templates for future widgets

1. **`wrangler.jsonc` template**:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "WIDGET_NAME",
  "main": "src/index.js",
  "compatibility_date": "2025-09-30",
  "observability": { "enabled": true }
}
```

2. **Embeddable JS template** (like `steam-widget.js`):

* Keep a blank version with placeholders for `WORKER_URL` and query params.
* Copy and rename it for each new widget.

