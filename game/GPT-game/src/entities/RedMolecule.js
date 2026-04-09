// src/entities/RedMolecule.js
import BaseMolecule from "./BaseMolecule.js";
import { ENTITY_COLORS } from "../utils/constants.js";

export default class RedMolecule extends BaseMolecule {
  constructor(scene, x, y) {
    super(scene, x, y, "shape-hexagon", {
      faction: "red",
      tint: ENTITY_COLORS.red,
      alpha: 0.88,
    });
  }
}
