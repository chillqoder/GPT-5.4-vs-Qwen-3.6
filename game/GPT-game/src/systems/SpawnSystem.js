// src/systems/SpawnSystem.js
import Food from "../entities/Food.js";
import GreenMolecule from "../entities/GreenMolecule.js";
import RedMolecule from "../entities/RedMolecule.js";
import {
  AI_RESPAWN_DELAY,
  FOOD_POOL_SIZE,
  FOOD_RESPAWN_DELAY,
  GREEN_POOL_SIZE,
  INITIAL_FOOD_COUNT,
  INITIAL_GREEN_COUNT,
  INITIAL_RED_COUNT,
  RED_POOL_SIZE,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "../utils/constants.js";

export default class SpawnSystem {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.foodGroup = null;
    this.greenGroup = null;
    this.redGroup = null;
  }

  createPools() {
    this.foodGroup = this.scene.physics.add.group({
      classType: Food,
      maxSize: FOOD_POOL_SIZE,
    });

    this.greenGroup = this.scene.physics.add.group({
      classType: GreenMolecule,
      maxSize: GREEN_POOL_SIZE,
    });

    this.redGroup = this.scene.physics.add.group({
      classType: RedMolecule,
      maxSize: RED_POOL_SIZE,
    });

    return {
      foodGroup: this.foodGroup,
      greenGroup: this.greenGroup,
      redGroup: this.redGroup,
    };
  }

  seedWorld() {
    this.spawnFood(INITIAL_FOOD_COUNT);
    this.spawnGreens(INITIAL_GREEN_COUNT);
    this.spawnReds(INITIAL_RED_COUNT);
  }

  maintainPopulation() {
    this.spawnFood(INITIAL_FOOD_COUNT - this.foodGroup.countActive(true));
    this.spawnGreens(INITIAL_GREEN_COUNT - this.greenGroup.countActive(true));
    this.spawnReds(INITIAL_RED_COUNT - this.redGroup.countActive(true));
  }

  scheduleFoodRespawn() {
    this.scene.time.delayedCall(FOOD_RESPAWN_DELAY, () => this.spawnFood(1));
  }

  scheduleAIRespawn(groupName) {
    this.scene.time.delayedCall(AI_RESPAWN_DELAY, () => {
      if (groupName === "green") {
        this.spawnGreens(1);
        return;
      }

      this.spawnReds(1);
    });
  }

  spawnFood(count) {
    for (let index = 0; index < count; index += 1) {
      const point = this.getRandomPoint(40);
      const food = this.foodGroup.get(point.x, point.y);
      if (!food) {
        return;
      }

      food.spawn(point.x, point.y);
    }
  }

  spawnGreens(count) {
    for (let index = 0; index < count; index += 1) {
      this.spawnMolecule(this.greenGroup);
    }
  }

  spawnReds(count) {
    for (let index = 0; index < count; index += 1) {
      this.spawnMolecule(this.redGroup);
    }
  }

  spawnMolecule(group) {
    const point = this.getPointAwayFromPlayer(260);
    const stage = this.pickAIMoleculeStage();
    const molecule = group.get(point.x, point.y);

    if (!molecule) {
      return;
    }

    molecule.spawn(point.x, point.y, stage);
  }

  pickAIMoleculeStage() {
    const roll = Phaser.Math.Between(1, 100);

    if (roll <= 54) {
      return 1;
    }

    if (roll <= 80) {
      return 2;
    }

    if (roll <= 94) {
      return 3;
    }

    return 4;
  }

  getPointAwayFromPlayer(minDistance) {
    for (let attempt = 0; attempt < 24; attempt += 1) {
      const point = this.getRandomPoint(80);
      const distance = Phaser.Math.Distance.Between(
        point.x,
        point.y,
        this.player.x,
        this.player.y,
      );

      if (distance >= minDistance) {
        return point;
      }
    }

    return this.getRandomPoint(80);
  }

  getRandomPoint(padding = 0) {
    return new Phaser.Math.Vector2(
      Phaser.Math.Between(padding, WORLD_WIDTH - padding),
      Phaser.Math.Between(padding, WORLD_HEIGHT - padding),
    );
  }
}
