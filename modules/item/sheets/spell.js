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
        this.config = data.config;

        data.dtypes = ["String", "Number", "Boolean"];

        // Spell Domains
        data.labels.spellDomain = data.config.spellDomains[data.item.data.domain];

        // Saves
        if (data.item.data.save.dc) {
          data.labels.saveAbility = data.config.savingThrows[data.item.data.save.ability];
        }

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

        // Only summon an Area effect if the spell has a reasonable size
        if (areaParts[2].toLowerCase() === 'foot' || areaParts[2].toLowerCase() === 'feet') {
          let shape = "rect";
          let direction = 0;
          let distance = parseInt(areaParts[1]);
          let width = 0;

          // Fun maths based on the shape of the spell
          switch (areaParts[3].toLowerCase()) {
            case "sphere":
            case "circle":
              shape = "circle";
              distance /= 2;
              break;
            case "cone":
              shape = "cone";
              break;
            case "line":
              shape = "ray";
              width = 5;
              break;
            default:
              direction = 45;
              distance = Math.sqrt(Math.pow(distance, 2) * 2);
              break;
          }

          MeasuredTemplate.create({
            t: shape,
            user: game.user._id,
            x: 1000,
            y: 1000,
            direction: direction,
            angle: 90,
            distance: distance,
            width: width,
            borderColor: "#000000",
            fillColor: this.config.spellDomainColors[this.item.data.data.domain],
          });
        }
      }
      super._rollDamage(event);
    }

}
