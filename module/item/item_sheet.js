export default class AKRPGItemSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["akrpg", "boilerplate", "sheet", "item"],
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @Override */
    get template() {
      const path = "systems/AKRPG/templates/item/";
      return `${path}${this.item.data.type}.html`;
    }

    /** @Override */
    getData() {
        const data = super.getData();
        data.labels = this.item.labels;

        data.config = CONFIG.AKRPG;

        console.log("Item Sheet Data", data);
        return data;
    }
}
