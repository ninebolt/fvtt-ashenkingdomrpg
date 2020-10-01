export class AKRPGActorSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["akrpg", "boilerplate", "sheet", "actor"],
            template: "systems/AKRPG/templates/actor/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @Override */
    getData() {
        const data = super.getData();
        console.log("Actor Sheet Data", data);

        data.dtypes = ['String', 'Number', 'Boolean'];
        return data;
    }
}
