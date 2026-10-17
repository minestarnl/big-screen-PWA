# Big Text

Type a message and it fills the whole iPad screen. Pick your own text and background colors. Works offline from the home screen.

## Use it

1. Open `https://minestarnl.github.io/big-screen-PWA/` (capitals matter) in Safari on the iPad.
2. Tap **Share → Add to Home Screen**.
3. Launch it once from the home screen while online. After that it works without a connection.

Tap anywhere on the sign to edit the text, colors, font and case. Tap again to hide the controls. Your settings stay on the device.

## Features

- Text auto-sizes to the largest size that fits, in portrait and landscape
- Line breaks with Return
- Text and background color pickers, a Swap button and 10 quick color presets
- Fonts: Bold, Rounded, Serif, Mono, Condensed
- Optional UPPERCASE
- Keeps the screen awake where the browser allows it

## Develop

No build step. Edit `index.html`, then bump `CACHE` in `sw.js` so installed copies update. Run locally with:

```sh
python3 -m http.server
```

See `CLAUDE.md` for project notes.
