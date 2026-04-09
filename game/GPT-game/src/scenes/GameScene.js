// src/scenes/GameScene.js
import Player from "../entities/Player.js";
import AISystem from "../systems/AISystem.js";
import CollisionSystem from "../systems/CollisionSystem.js";
import HealthBarSystem from "../systems/HealthBarSystem.js";
import SpawnSystem from "../systems/SpawnSystem.js";
import {
  EVOLUTION_THRESHOLD,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "../utils/constants.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.gameEnded = false;

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBackgroundColor("#07273c");

    this.createBackdrop();

    this.player = new Player(this, WORLD_WIDTH / 2, WORLD_HEIGHT / 2);

    this.spawnSystem = new SpawnSystem(this, this.player);
    const { foodGroup, greenGroup, redGroup } = this.spawnSystem.createPools();
    this.foodGroup = foodGroup;
    this.greenGroup = greenGroup;
    this.redGroup = redGroup;

    this.spawnSystem.seedWorld();

    this.aiSystem = new AISystem(this, {
      player: this.player,
      foodGroup: this.foodGroup,
      greenGroup: this.greenGroup,
      redGroup: this.redGroup,
    });

    this.healthBarSystem = new HealthBarSystem(this);

    this.collisionSystem = new CollisionSystem(this, {
      player: this.player,
      foodGroup: this.foodGroup,
      greenGroup: this.greenGroup,
      redGroup: this.redGroup,
      spawnSystem: this.spawnSystem,
      onPlayerDefeat: (predator) => this.handlePlayerDefeat(predator),
      onPlayerWin: () => this.handlePlayerWin(),
      onPlayerProgress: () => this.emitHudState(),
    });

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1);

    this.input.setDefaultCursor("crosshair");

    this.populationTimer = this.time.addEvent({
      delay: 1400,
      loop: true,
      callback: () => this.spawnSystem.maintainPopulation(),
    });

    this.hudTimer = this.time.addEvent({
      delay: 120,
      loop: true,
      callback: () => this.emitHudState(),
    });

    this.game.events.emit("game:reset");

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.populationTimer?.remove(false);
      this.hudTimer?.remove(false);
      this.collisionSystem?.destroy();
      this.healthBarSystem?.destroy();
    });
  }

  createBackdrop() {
    this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, WORLD_WIDTH, WORLD_HEIGHT, 0x0b3651, 1);

    for (let index = 0; index < 56; index += 1) {
      this.add
        .circle(
          Phaser.Math.Between(0, WORLD_WIDTH),
          Phaser.Math.Between(0, WORLD_HEIGHT),
          Phaser.Math.Between(28, 105),
          Phaser.Math.RND.pick([0x14425d, 0x0e5b75, 0x1a6c78]),
          Phaser.Math.FloatBetween(0.08, 0.18),
        )
        .setDepth(-8);
    }

    this.add.particles(0, 0, "bubble", {
      x: { min: 0, max: WORLD_WIDTH },
      y: WORLD_HEIGHT + 20,
      speedX: { min: -8, max: 8 },
      speedY: { min: -55, max: -18 },
      lifespan: 9000,
      scale: { start: 0.35, end: 0.03 },
      alpha: { start: 0.55, end: 0 },
      quantity: 1,
      frequency: 110,
      blendMode: "ADD",
    });
  }

  update(time) {
    if (this.gameEnded) {
      return;
    }

    this.player.update(this.input.activePointer);
    this.aiSystem.update(time);

    this.healthBarSystem.update([
      this.player,
      ...this.greenGroup.getChildren(),
      ...this.redGroup.getChildren(),
    ]);
  }

  emitHudState() {
    this.game.events.emit("hud:update", {
      stage: this.player.stage,
      progress:
        this.player.stage >= 5 ? "Apex" : `${this.player.progress}/${EVOLUTION_THRESHOLD}`,
      food: this.foodGroup.countActive(true),
      greens: this.greenGroup.countActive(true),
      reds: this.redGroup.countActive(true),
    });
  }

  handlePlayerDefeat(predator) {
    if (this.gameEnded) {
      return;
    }

    this.gameEnded = true;
    this.physics.pause();
    this.game.events.emit("game:ended", {
      type: "loss",
      stage: predator.stage,
    });
  }

  handlePlayerWin() {
    if (this.gameEnded) {
      return;
    }

    this.gameEnded = true;
    this.physics.pause();
    this.game.events.emit("game:ended", {
      type: "win",
    });
  }
}
