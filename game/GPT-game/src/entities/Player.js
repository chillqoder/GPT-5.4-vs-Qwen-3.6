// src/entities/Player.js
import BaseMolecule from "./BaseMolecule.js";
import { ENTITY_COLORS } from "../utils/constants.js";

export default class Player extends BaseMolecule {
  constructor(scene, x, y) {
    super(scene, x, y, "shape-circle", {
      faction: "player",
      tint: ENTITY_COLORS.player,
      alpha: 0.96,
      autoSpawn: true,
      startStage: 1,
    });
  }

  update(pointer) {
    if (!this.active || this.isBeingConsumed) {
      return;
    }

    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      pointer.worldX,
      pointer.worldY,
    );

    if (distance < 12) {
      this.setVelocity(this.body.velocity.x * 0.9, this.body.velocity.y * 0.9);
      return;
    }

    const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY);
    const speed = Math.min(this.speed, distance * 2.6);

    this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);
    this.rotation = angle + Math.PI / 2;
  }
}
