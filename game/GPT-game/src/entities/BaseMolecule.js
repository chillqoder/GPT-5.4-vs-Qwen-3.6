// src/entities/BaseMolecule.js
import {
  ENTITY_COLORS,
  EVOLUTION_THRESHOLD,
  MAX_STAGE,
  STAGE_SETTINGS,
} from "../utils/constants.js";

export default class BaseMolecule extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config = {}) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.textureKey = texture;
    this.faction = config.faction ?? "neutral";
    this.baseTint = config.tint ?? ENTITY_COLORS.player;
    this.baseAlpha = config.alpha ?? 0.95;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5);
    this.setDepth(10);
    this.setCollideWorldBounds(true);
    this.setAlpha(this.baseAlpha);
    this.setTint(this.baseTint);

    this.stage = 1;
    this.progress = 0;
    this.speed = STAGE_SETTINGS[1].speed;
    this.radius = STAGE_SETTINGS[1].radius;
    this.radarRange = STAGE_SETTINGS[1].radar;
    this.isBeingConsumed = false;
    this.nextThinkAt = 0;

    this.body.setAllowGravity(false);
    this.body.setBounce(0.95);
    this.body.setDrag(110, 110);

    if (config.autoSpawn) {
      this.spawn(x, y, config.startStage ?? 1);
    } else {
      this.deactivate();
    }
  }

  spawn(x, y, stage = 1) {
    this.enableBody(true, x, y, true, true);
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
    this.setAlpha(this.baseAlpha);
    this.setScale(1);
    this.setVelocity(0, 0);
    this.setAngularVelocity(0);
    this.isBeingConsumed = false;
    this.progress = 0;
    this.applyStage(stage);
    return this;
  }

  applyStage(stage) {
    this.stage = Phaser.Math.Clamp(stage, 1, MAX_STAGE);
    const settings = STAGE_SETTINGS[this.stage];
    const diameter = settings.radius * 2;
    const frameWidth = this.frame.realWidth;
    const frameHeight = this.frame.realHeight;
    const offsetX = (frameWidth - diameter) / 2;
    const offsetY = (frameHeight - diameter) / 2;

    this.radius = settings.radius;
    this.speed = settings.speed;
    this.radarRange = settings.radar;

    this.setDisplaySize(diameter, diameter);
    this.setDepth(10 + this.stage);
    this.body.setCircle(settings.radius, offsetX, offsetY);
    this.body.setMaxVelocity(settings.speed * 1.45, settings.speed * 1.45);
  }

  addGrowth(points = 1) {
    if (this.stage >= MAX_STAGE) {
      return false;
    }

    this.progress += points;
    let evolved = false;

    while (this.progress >= EVOLUTION_THRESHOLD && this.stage < MAX_STAGE) {
      this.progress -= EVOLUTION_THRESHOLD;
      this.applyStage(this.stage + 1);
      evolved = true;
    }

    if (this.stage >= MAX_STAGE) {
      this.progress = 0;
    }

    return evolved;
  }

  deactivate() {
    this.disableBody(true, true);
    this.setActive(false);
    this.setVisible(false);
    this.isBeingConsumed = false;
  }

  getGrowthRatio() {
    if (this.stage >= MAX_STAGE) {
      return 1;
    }

    return Phaser.Math.Clamp(this.progress / EVOLUTION_THRESHOLD, 0.08, 1);
  }

  getVitalityRatio() {
    const total = (this.stage - 1) * EVOLUTION_THRESHOLD + this.progress;
    const maxTotal = (MAX_STAGE - 1) * EVOLUTION_THRESHOLD || 1;
    return Phaser.Math.Clamp((total + 1) / (maxTotal + 1), 0.14, 1);
  }

  getBarColor() {
    if (this.faction === "green") {
      return ENTITY_COLORS.green;
    }

    if (this.faction === "red") {
      return ENTITY_COLORS.red;
    }

    return ENTITY_COLORS.player;
  }
}
