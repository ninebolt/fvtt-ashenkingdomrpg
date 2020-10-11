import AKRPGItemSheet from "./base.js";

export default class AKRPGItemSheetEquipment extends AKRPGItemSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["akrpg", "sheet", "item", "equipment"],
            width: 620,
            height: 560,
        });
    }

    getData() {
        const data = super.getData();

        return data;
    }
}
