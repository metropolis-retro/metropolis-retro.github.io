# React Snake

A fully functional Snake game built with **React 19**, **TypeScript**, **TailwindCSS 4**, and **HTML5 Canvas**. Exportable as a `<SnakeGame />` component for use in any React/Next.js project.

## Features

- Classic Snake gameplay on a 20×20 grid
- Keyboard controls (Arrow keys / WASD) + mobile swipe & D-pad
- Three difficulty levels: Easy, Medium, Hard
- Optional obstacles that spawn on the board
- Power-ups that appear randomly after eating food:
  - **Slow Motion** - reduces snake speed temporarily
  - **Double Points** - 2× score multiplier
  - **Phase Mode** - pass through walls, obstacles, and yourself
- Progressive leveling - speed increases every 5 food eaten
- High score persistence via `localStorage`
- 8-bit sound effects (Web Audio API) with mute toggle
- Pause/resume support (Esc / P)
- Smooth 60 FPS rendering via `requestAnimationFrame`
- Fully responsive canvas with mobile-friendly layout
- Embeddable via iframe or importable as a React component

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Production Build

```bash
npm run build
npm run preview
```

## Use as a Component

The game is published as a library (`ES` + `CJS`). Import it into any React project:

```tsx
import { SnakeGame } from "react-game-snake";

export default function App() {
  return <SnakeGame className="w-full h-screen" />;
}
```

## Embed in an Iframe

After building, serve the `dist/` folder and embed it:

```html
<iframe
  src="https://your-domain.com/snake/"
  width="600"
  height="680"
  style="border: none;"
  title="Snake Game"
></iframe>
```

## Project Structure

```
src/
  components/     UI components (SnakeGame, GameBoard, GameHUD, GameOverlay, DPad, MuteButton)
  config/         Game configuration & difficulty presets
  game/
    engine/       Pure game logic (tick, collision, food, snake, powerups, renderer)
    hooks/        React hooks (useGameController, useGameLoop, useInput, etc.)
    sound/        Web Audio sound effects
    utils/        Shared helpers (score formatting, power-up display config)
  types/          TypeScript type definitions
```

## Controls

| Action         | Keyboard           | Mobile          |
| -------------- | ------------------ | --------------- |
| Move           | Arrow keys / WASD  | Swipe / D-pad   |
| Pause / Resume | Esc / P            | -               |
| Start / Retry  | Enter / Space      | Tap button      |

## License

MIT
