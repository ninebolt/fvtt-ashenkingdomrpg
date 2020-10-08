import AKRPGActorSheet from "./base.js";

export default class AKRPGActorSheetCharacter extends AKRPGActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["akrpg", "sheet", "actor", "character"],
            width: 720,
            height: 680,
        });
    }

    getData() {
        return super.getData();
    }
}
