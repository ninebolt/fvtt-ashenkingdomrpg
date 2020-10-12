import AKRPGItemSheet from "./base.js";
import { d20Roll, damageRoll } from "../../dice.js";

export default class AKRPGItemSheetSpell extends AKRPGItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["akrpg", "sheet", "item", "spell"],
            width: 480,
            height: 480,
        });
    }

    getData() {
        const data = super.getData();
        this.areaPattern = /(\d+)(?:\-| )?([^\- ]*) ([^ ]*)/i;

        data.dtypes = ["String", "Number", "Boolean"];

        // Spell Domains
        data.item.data.domain = data.config.spellDomains[data.item.data.domain];

        console.log("Spell Data", data);
        return data;
    }

    /**
     * Event Listeners
     */
    activateListeners(html) {
        html.find(".spellcast").click(this._castSpell.bind(this));

        super.activateListeners(html);
    }

    /**
     * @private
     * Rolls spell damage when called, and summons spell effects
     */
    _castSpell(event) {
      event.preventDefault();
      const area = this.item.data.data.area;

      // Make sure that the area flag is setup as expected
      if (area && this.areaPattern.test(area)) {
        const areaParts = area.match(this.areaPattern);
        let shape = "rect";

        // Only summon an Area effect if the spell has a reasonable size
        if (areaParts[2].toLowerCase() === 'foot' || areaParts[2].toLowerCase() === 'feet') {
          switch (areaParts[3].toLowerCase()) {
            case "sphere":
            case "circle":
              shape = "circle";
              break;
            case "cone":
              shape = "cone";
              break;
            default:
              break;
          }

          MeasuredTemplate.create({
            t: shape,
            user: game.user._id,
            x: 1000,
            y: 1000,
            direction: 0.45,
            angle: 90,
            distance: parseInt(areaParts[1])/2,
            borderColor: "#FF0000",
            fillColor: "#FF3366",
          });
        }
      }
      super._rollDamage(event);
    }

}
