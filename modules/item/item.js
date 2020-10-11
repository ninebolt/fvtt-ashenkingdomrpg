import { d20Roll, damageRoll } from "../dice.js";
import { AKRPG } from "../config.js";

export default class AKRPGItem extends Item {
  /** @override */
  prepareData() {
      super.prepareData();

      const itemData = this.data;
      const data = itemData.data;

      console.log("Derived Data", data);
  }

  rollDamage() {
      const damageParts = this.data.data.damage.parts;
      const type = this.data.type;

      damageParts.forEach(part => {
        const damageType = AKRPG.damageTypes[part[1]];
        const flavor = [this._flavorText(type), this.data.name, "for", damageType, (damageType === AKRPG.damageTypes.healing ? "" : "damage")].join(" ")
        console.log(damageRoll({parts: [part[0]], data: {}, flavor}))
      });

      return "yee"
  }

  _flavorText(type) {
    if (type.toLowerCase() === 'spell') {
      return 'Casting';
    }
    return 'Attacking with';
  }
}
