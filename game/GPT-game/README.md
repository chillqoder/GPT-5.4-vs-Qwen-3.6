# GPT Game

Lightweight Phaser 3 survival prototype built from the `game.md` spec.

## Run locally

Use any static server from the `GPT-game` folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Controls

- Move: steer toward the mouse cursor
- Goal: eat food and weaker molecules to evolve from Stage 1 to Stage 5
- Lose: touch a larger molecule
- Equal-sized molecules bounce instead of consuming each other

## Structure

- `index.html`: static entrypoint
- `src/scenes`: boot, game, and UI scenes
- `src/entities`: player, food, and AI molecules
- `src/systems`: pooling, AI, collisions, textures, and health bars
