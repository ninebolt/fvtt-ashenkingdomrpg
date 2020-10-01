export class AKRPGItemSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["boilerplate", "sheet", "item"],
            template: "systems/AKRPG/templates/item/item-sheet.html",
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @Override */
    getData() {
        const data = super.getData();
        console.log("Item Sheet Data", data);

        data.dtypes = ['String', 'Number', 'Boolean'];
        return data;
    }
}
