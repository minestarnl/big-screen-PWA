# Big Text (big-screen-PWA)

An iPad home-screen web app that shows a message as large as possible on screen, with custom colors. It must work fully offline once installed.

## Files

- `index.html` is the whole app: markup, CSS and JS in one file. No build step, no dependencies, no frameworks.
- `sw.js` is the service worker. It caches every file in `FILES` on install and serves cache-first.
- `manifest.json` plus the `<meta name="apple-mobile-web-app-*">` tags make it installable. iPadOS reads the meta tags and `apple-touch-icon` more than the manifest.
- `icon-180.png` (apple-touch-icon), `icon-192.png`, `icon-512.png`.
- `.nojekyll` lets GitHub Pages serve the files as-is.

## Rules

- **Offline first.** Never load anything from a CDN or Google Fonts. Use system font stacks only (`-apple-system`, `ui-rounded`, `ui-serif`, `ui-monospace`).
- **When you change any file, bump `CACHE` in `sw.js`** (e.g. `bigtext-v1` → `bigtext-v2`), or installed copies keep the old version. Add any new file to `FILES`.
- Paths stay relative (`./`, `sw.js`) so the app works from a GitHub Pages subpath like `/big-screen-PWA/`.
- Settings persist in `localStorage` under the key `bigtext.v1`. Wrap storage access in try/catch.
- Keep the text-fitting logic in `fitText()`: a binary search on font size that checks `scrollWidth`/`scrollHeight` against the container. Text uses `white-space: pre-wrap` and does not break inside words, so a long word shrinks the text instead of splitting.
- Respect safe-area insets on the stage and the edit sheet.

## Testing

Serve locally with `python3 -m http.server` and open `http://localhost:8000`. Service workers need HTTPS or localhost. To check offline behavior on the iPad: install from the hosted URL, open it once online, then turn on Airplane Mode and relaunch.

## Hosting

GitHub Pages from the `main` branch root. The live URL is `https://<user>.github.io/big-screen-PWA/`.
