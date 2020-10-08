export default class AKRPGActorSheet extends ActorSheet {
    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            scrollY: [
                ".inventory .inventory-list",
                ".spellbook .inventory-list",
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
        return `systems/akrpg/templates/actor/${this.actor.data.type}-sheet.html`;
    }

    getData() {
        return super.getData();
    }
}
