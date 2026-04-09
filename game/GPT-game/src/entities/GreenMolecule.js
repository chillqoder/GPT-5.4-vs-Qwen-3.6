// src/entities/GreenMolecule.js
import BaseMolecule from "./BaseMolecule.js";
import { ENTITY_COLORS } from "../utils/constants.js";

export default class GreenMolecule extends BaseMolecule {
  constructor(scene, x, y) {
    super(scene, x, y, "shape-diamond", {
      faction: "green",
      tint: ENTITY_COLORS.green,
      alpha: 0.9,
    });
  }
}
