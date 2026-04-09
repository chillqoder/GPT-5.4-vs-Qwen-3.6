// src/systems/AISystem.js
export default class AISystem {
  constructor(scene, { player, foodGroup, greenGroup, redGroup }) {
    this.scene = scene;
    this.player = player;
    this.foodGroup = foodGroup;
    this.greenGroup = greenGroup;
    this.redGroup = redGroup;
  }

  update(time) {
    this.updateGroup(time, this.greenGroup, (actor) => this.findNearestFood(actor));
    this.updateGroup(time, this.redGroup, (actor) => this.findNearestPrey(actor));
  }

  updateGroup(time, group, targetResolver) {
    group.children.iterate((actor) => {
      if (!actor || !actor.active || actor.isBeingConsumed) {
        return;
      }

      if (time < actor.nextThinkAt) {
        return;
      }

      actor.nextThinkAt = time + Phaser.Math.Between(120, 220);
      const target = targetResolver(actor);

      if (target) {
        this.scene.physics.moveToObject(actor, target, actor.speed);
        actor.rotation = Phaser.Math.Angle.Between(actor.x, actor.y, target.x, target.y) + Math.PI / 2;
        return;
      }

      this.wander(actor);
    });
  }

  wander(actor) {
    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    this.scene.physics.velocityFromRotation(angle, actor.speed * 0.5, actor.body.velocity);
  }

  findNearestFood(actor) {
    let nearest = null;
    let bestDistance = actor.radarRange;

    this.foodGroup.children.iterate((food) => {
      if (!food || !food.active) {
        return;
      }

      const distance = Phaser.Math.Distance.Between(actor.x, actor.y, food.x, food.y);
      if (distance < bestDistance) {
        bestDistance = distance;
        nearest = food;
      }
    });

    return nearest;
  }

  findNearestPrey(actor) {
    let nearest = null;
    let bestDistance = actor.radarRange;

    const consider = (candidate) => {
      if (
        !candidate ||
        !candidate.active ||
        candidate === actor ||
        candidate.isBeingConsumed ||
        candidate.stage >= actor.stage
      ) {
        return;
      }

      const distance = Phaser.Math.Distance.Between(actor.x, actor.y, candidate.x, candidate.y);
      if (distance < bestDistance) {
        bestDistance = distance;
        nearest = candidate;
      }
    };

    consider(this.player);
    this.greenGroup.children.iterate(consider);
    this.redGroup.children.iterate(consider);

    return nearest;
  }
}
