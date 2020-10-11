import { AKRPG } from "../../config.js";

export default class AKRPGItemSheet extends ItemSheet {
    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
      // TODO
      return mergeObject(super.defaultOptions, {
          scrollY: [
          ],
          tabs: [
              {
                  navSelector: ".tabs",
                  contentSelector: ".sheet-body",
                  initial: "description",
              },
          ],
      });
    }

    /** @override */
    get template() {
        return `systems/akrpg/templates/item/${this.item.data.type}-sheet.html`;
    }

    getData() {
        const data = {
            ...super.getData(),
            config: CONFIG.AKRPG,
        };

        //TODO
        console.log("DATA", data);
        return data;
    }

    /**
     * Event Listeners
     */
    activateListeners(html) {
        html.find(".name").click(this._rollDamage.bind(this));

        super.activateListeners(html);
    }

    /**
     * @private
     * Rolls spell damage when title is clicked
     */
    _rollDamage(event) {
        event.preventDefault();
        const item = event;

        this.item.rollDamage()
    }
}
