# React Pac-Man

A fully functional Pac-Man-style game built with **React 19**, **TypeScript**, **TailwindCSS 4**, and **HTML5 Canvas**.

## Features

- Keyboard-controlled Pac-Man (Arrow keys / WASD)
- 4 ghosts with distinct AI personalities (Blinky, Pinky, Inky, Clyde)
- Collision detection (walls, ghosts, pellets)
- Power pellets that let you eat ghosts
- Score system with lives
- Game states: Start → Playing → Game Over / Win
- Responsive canvas that scales to fit any container
- Smooth 60 FPS animation via `requestAnimationFrame`
- Iframe-embeddable

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Embed in an Iframe

After building, serve the `dist/` folder and embed it:

```html
<iframe
  src="https://your-domain.com/pacman/"
  width="600"
  height="680"
  style="border: none;"
  title="Pac-Man Game"
></iframe>
```

The game is fully self-contained — no global state or environment-specific APIs. It works as a standalone page.

### Ghost AI

Each ghost has a unique targeting strategy inspired by the original game:

- **Blinky** (red): Directly chases Pac-Man
- **Pinky** (pink): Targets 4 tiles ahead of Pac-Man
- **Inky** (cyan): Uses Blinky's position to calculate a flanking target
- **Clyde** (orange): Chases when far, scatters to corner when close

When scared (power pellet active), ghosts move randomly at reduced speed.

## License

MIT
