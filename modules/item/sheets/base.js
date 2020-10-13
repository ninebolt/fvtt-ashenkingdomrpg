import { AKRPG } from "../../config.js";

export default class AKRPGItemSheet extends ItemSheet {
    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            resizable: true,
            scrollY: [".tab.details"],
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

    /** @override */
    getData() {
        const data = {
          ...super.getData(),
          config: AKRPG,
          labels: {},
        }
        console.log("Item Data", data);

        data.itemType = data.item.type.toLowerCase();

        return data;
    }

    /**
     * @private
     * Rolls spell damage when called
     */
    _rollDamage(event) {
        event.preventDefault();
        this.item.rollDamage()
    }
}
