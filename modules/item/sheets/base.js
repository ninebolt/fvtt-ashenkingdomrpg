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
        const path = "systems/akrpg/templates/item/";
        return `${path}${this.item.data.type}-sheet.html`;
    }

    /** @override */
    getData() {
        const data = super.getData();
        console.log("Item Data", data);

        data.itemType = data.item.type.toLowerCase();

        return data;
    }
}
