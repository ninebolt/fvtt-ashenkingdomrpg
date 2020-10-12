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
        }
        console.log("Item Data", data);

        data.itemType = data.item.type.toLowerCase();

        return data;
    }

    /**
     * Event Listeners
     */
    activateListeners(html) {
        html.find(".spell-name").click(this._rollDamage.bind(this));

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
