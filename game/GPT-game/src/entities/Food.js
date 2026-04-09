// src/entities/Food.js
export default class Food extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "food-dot");

    this.scene = scene;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(4);
    this.setBlendMode(Phaser.BlendModes.ADD);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);

    this.deactivate();
  }

  spawn(x, y) {
    const scale = Phaser.Math.FloatBetween(0.75, 1.15);
    const radius = 5 * scale;
    const frameSize = this.frame.realWidth;
    const offset = (frameSize - radius * 2) / 2;

    this.enableBody(true, x, y, true, true);
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
    this.setScale(scale);
    this.setAlpha(Phaser.Math.FloatBetween(0.78, 1));
    this.body.setCircle(radius, offset, offset);
    return this;
  }

  deactivate() {
    this.disableBody(true, true);
    this.setActive(false);
    this.setVisible(false);
  }
}
