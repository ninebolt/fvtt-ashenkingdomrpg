export default class AKRPGActorSheet extends ActorSheet {
    constructor(...args) {
        super(...args);

        this._filters = {
            inventory: new Set(),
            spellbook: new Set()
        }
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            scrollY: [
                ".inventory .inventory-list",
                ".spellbook .inventory-list"
            ],
            tabs: [{ navSelector: ".tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @override */
    get template() {
        return `systems/AKRPG/templates/actor/actor-sheet.html`;
    }

    /** @override */
    getData() {
        const data = super.getData();
        return data;
    }

}