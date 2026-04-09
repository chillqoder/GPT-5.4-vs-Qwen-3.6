// src/systems/CollisionSystem.js
import Food from "../entities/Food.js";
import { MAX_STAGE } from "../utils/constants.js";

export default class CollisionSystem {
  constructor(
    scene,
    {
      player,
      foodGroup,
      greenGroup,
      redGroup,
      spawnSystem,
      onPlayerDefeat,
      onPlayerWin,
      onPlayerProgress,
    },
  ) {
    this.scene = scene;
    this.player = player;
    this.foodGroup = foodGroup;
    this.greenGroup = greenGroup;
    this.redGroup = redGroup;
    this.spawnSystem = spawnSystem;
    this.onPlayerDefeat = onPlayerDefeat;
    this.onPlayerWin = onPlayerWin;
    this.onPlayerProgress = onPlayerProgress;
    this.colliders = [];

    this.register();
  }

  register() {
    this.colliders.push(
      this.scene.physics.add.overlap(this.player, this.foodGroup, (player, food) => {
        this.handleFoodConsumed(player, food);
      }),
    );

    this.colliders.push(
      this.scene.physics.add.overlap(this.greenGroup, this.foodGroup, (green, food) => {
        this.handleFoodConsumed(green, food);
      }),
    );

    this.colliders.push(
      this.scene.physics.add.collider(this.player, this.greenGroup, this.handleMoleculeCollision, null, this),
      this.scene.physics.add.collider(this.player, this.redGroup, this.handleMoleculeCollision, null, this),
      this.scene.physics.add.collider(this.greenGroup, this.greenGroup, this.handleMoleculeCollision, null, this),
      this.scene.physics.add.collider(this.greenGroup, this.redGroup, this.handleMoleculeCollision, null, this),
      this.scene.physics.add.collider(this.redGroup, this.redGroup, this.handleMoleculeCollision, null, this),
    );
  }

  handleFoodConsumed(eater, food) {
    if (!eater.active || !food.active || eater.isBeingConsumed) {
      return;
    }

    this.consume(eater, food, 1);
  }

  handleMoleculeCollision(first, second) {
    if (
      !first.active ||
      !second.active ||
      first.isBeingConsumed ||
      second.isBeingConsumed
    ) {
      return;
    }

    if (first.stage === second.stage) {
      return;
    }

    const predator = first.stage > second.stage ? first : second;
    const victim = predator === first ? second : first;
    this.consume(predator, victim, Math.max(1, victim.stage));
  }

  consume(predator, victim, reward) {
    if (!predator.active || !victim.active || victim.isBeingConsumed) {
      return;
    }

    victim.isBeingConsumed = true;

    if (victim.body) {
      victim.body.enable = false;
      victim.setVelocity(0, 0);
    }

    this.scene.tweens.add({
      targets: victim,
      x: predator.x,
      y: predator.y,
      alpha: 0,
      scaleX: 0.15,
      scaleY: 0.15,
      duration: 150,
      ease: "Quad.easeIn",
      onComplete: () => {
        const isFood = victim instanceof Food;
        const isPlayerVictim = victim === this.player;
        const predatorEvolved = predator.addGrowth(reward);

        victim.setScale(1);
        victim.setAlpha(victim.baseAlpha ?? 1);
        victim.deactivate();

        if (isFood) {
          this.spawnSystem.scheduleFoodRespawn();
        } else if (!isPlayerVictim) {
          this.spawnSystem.scheduleAIRespawn(victim.faction);
        }

        if (predator === this.player) {
          this.onPlayerProgress(predatorEvolved);
          if (this.player.stage >= MAX_STAGE) {
            this.onPlayerWin();
          }
        }

        if (isPlayerVictim) {
          this.onPlayerDefeat(predator);
        }
      },
    });
  }

  destroy() {
    this.colliders.forEach((collider) => collider.destroy());
    this.colliders.length = 0;
  }
}
