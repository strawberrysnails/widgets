# Steam Widgets

Embeddable Steam widgets for personal websites.

Display your:
- Last played game
- Most played game

⚠️ Your Steam profile must be public for this to work.

## Example:
![Steam Widget Demo](https://github.com/strawberrysnails/steam-widgets/blob/main/demo/screenshot.png)

# How to use
## 1. Simple installation:

Paste one of the snippets below where you want the widget to appear.
### Last Played
```
<script src="https://strawberrysnails.github.io/steam-widgets/js/steam-widget.js?steamid=YOUR_STEAM_ID_HERE"></script>
```
### Most Played
```
<script src="https://strawberrysnails.github.io/steam-widgets/js/steam-widget.js?steamid=YOUR_STEAM_ID_HERE"></script>
```

Replace YOUR_STEAM_ID_HERE with your Steam 64-bit ID.

Find your Steam ID here: [steamid.io](https://steamid.io/)

## 2. Optional: Custom Styling
### Pre-made Themes
Change the theme by modifying the ```class``` on the ```<script>``` tag.

### Custom Styling
You can override styles using CSS:
```
.steam-widget {
  font-family: "Segoe UI", sans-serif;
}

.steam-widget strong {
  color: hotpink;
}
```
# Demo 
View a live demo and theme examples here:

[https://strawberrysnails.github.io/steam-widgets/demo/](https://strawberrysnails.github.io/steam-widgets/demo/)

# Contributing Themes
Want to submit a theme?

1. Add your CSS styles to themes/steam.css
2. Create a pull request
3. I’ll review, merge, and credit you
