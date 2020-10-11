import AKRPGItemSheet from "./base.js";
import { d20Roll, damageRoll } from "../../dice.js";

export default class AKRPGItemSheetSpell extends AKRPGItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["akrpg", "sheet", "item", "spell"],
            width: 480,
            height: 480,
        });
    }

    getData() {
        const data = super.getData();

        data.dtypes = ["String", "Number", "Boolean"];

        // Spell Domains
        data.item.data.domain = data.config.spellDomains[data.item.data.domain];

        console.log("Spell Data", data);
        return data;
    }

}
