# Molecule Survival Game

A 2D survival ecosystem game built with Phaser 3, inspired by the "Cell Stage" of Spore.

## 🎮 How to Play

1. **Open the game**: Navigate to `http://localhost:8080` in your browser
2. **Controls**: Move your mouse to control the player molecule
3. **Objective**: Hunt and eat smaller molecules to grow and evolve through 5 stages
4. **Win**: Reach Stage 5 to become the apex predator
5. **Lose**: Get eaten by a larger molecule

## 🧬 Game Mechanics

- **Green Molecules (Herbivores)**: Passively search for and eat green food dots
- **Red Molecules (Carnivores)**: Aggressively hunt any molecule smaller than them
- **Growth System**: Consume 5 food items (or equivalent smaller molecules) to evolve
- **Evolution**: Each stage increases your size but decreases movement speed
- **Health Bars**: Floating bars above all living molecules show progress

## 📁 Project Structure

```
Qwen-game/
├── index.html                 # Main entry point
└── src/
    ├── game.js               # Game configuration
    ├── scenes/
    │   ├── BootScene.js      # Texture generation scene
    │   └── PlayScene.js      # Main gameplay scene
    ├── entities/
    │   ├── Player.js         # Player molecule
    │   ├── AIMolecule.js     # AI-controlled molecules
    │   └── EntityFactory.js  # Procedural graphics factory
    ├── systems/
    │   ├── FoodSystem.js     # Food spawning & pooling
    │   └── AISystem.js       # AI behavior & collisions
    └── ui/
        ├── HealthBar.js      # Health bar component
        └── UIOverlay.js      # Stage display & game over UI
```

## 🚀 Running Locally

### Option 1: Python HTTP Server
```bash
cd "Qwen-game"
python3 -m http.server 8080
```
Then open: `http://localhost:8080`

### Option 2: Node.js HTTP Server
```bash
cd "Qwen-game"
npx http-server -p 8080
```
Then open: `http://localhost:8080`

### Option 3: VS Code Live Server
1. Install the "Live Server" extension
2. Right-click `index.html` and select "Open with Live Server"

## 🎨 Features

- **Procedural Graphics**: No external assets needed - all shapes generated with Phaser.Graphics
- **Object Pooling**: Efficient food and molecule management
- **Arcade Physics**: Circular colliders for all entities
- **Smooth Camera**: Camera follows player with interpolation
- **Visual Effects**: 
  - Consume animations (shrink & pull)
  - Bubble particle effects
  - Evolution growth tweens
  - Health bars

## 🏗️ Technical Details

- **Framework**: Phaser 3.60.0 (loaded via CDN)
- **Module System**: Native ES6 modules (no bundler required)
- **Physics Engine**: Arcade Physics
- **World Size**: 3000x3000px
- **View Resolution**: 1280x720

## 🎯 Architecture Patterns

- **Entity-Component Style**: Separate files for entities, systems, and UI
- **Object Pooling**: Phaser Groups for food reuse
- **State Machine**: AI molecules use wander/hunt/flee states
- **Event System**: Scene events for evolution and death

## 🔧 Customization

Key game balance values can be adjusted in:
- **Player.js**: `baseSpeed`, `maxFoodPerStage`, speed/radius formulas
- **AIMolecule.js**: `baseSpeed`, `radarRadius`, wander behavior
- **FoodSystem.js**: `maxFood`, `foodSpawnInterval`
- **AISystem.js**: `greenCount`, `redCount`, respawn timing

---

Built with Phaser 3 and modular ES6 architecture. No build step required!
