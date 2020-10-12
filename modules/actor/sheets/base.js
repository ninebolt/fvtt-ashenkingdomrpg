import { AKRPG } from "../../config.js";

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
        const data = {
            ...super.getData(),
            config: CONFIG.AKRPG,
        };

        // data.actor = duplicate(this.actor.data);

        // Ability Scores
        for (let [a, abl] of Object.entries(data.actor.data.abilityScores)) {
            abl.label = CONFIG.AKRPG.abilities[a];
        }

        // Skills
        for (let [s, skl] of Object.entries(data.actor.data.skills)) {
            skl.label = CONFIG.AKRPG.skills[s];
        }

        // Saving Throws
        for (let [s, sv] of Object.entries(data.actor.data.savingThrows)) {
            sv.label = CONFIG.AKRPG.savingThrows[s];
        }

        console.log("DATA", data);
        return data;
    }

    /**
     * Event Listeners
     */
    activateListeners(html) {
        html.find(".skill-name").click(this._rollSkillCheck.bind(this));
        html.find(".savingThrow-name").click(this._rollSavingThrow.bind(this));

        // Create Item
        html.find('.item-create').click(this._onItemCreate.bind(this));
        // Edit Item
        html.find('.item-edit').click(this._onItemEdit.bind(this));
        // Delete Item
        html.find(".item-delete").click(this._onItemDelete.bind(this));

        super.activateListeners(html);
    }

    _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget.closest('.item-group');
        const type = header.dataset.itemType;

        console.log('HEADER', header);
        console.log('TYPE', type);

        const itemData = {
            name: "Item",
            type: type,
            data: duplicate(header.dataset)
        }
        delete itemData.data['type'];

        console.log('ITEM DATA', itemData);
        return this.actor.createOwnedItem(itemData);
    }

    /**
     * Handles editing an item attached to the actor
     * @param event The click event
     */
    _onItemEdit(event) {
        event.preventDefault();
        const div = event.currentTarget.closest('.item');
        const item = this.actor.getOwnedItem(div.dataset.itemId);
        item.sheet.render(true);
    }

    /**
     * Handles deleting an item attached to the actor
     * @param event The click event
     */
    _onItemDelete(event) {
        event.preventDefault();
        const div = event.currentTarget.closest('.item');
        console.log('Deleting Item', div.dataset);
        this.actor.deleteOwnedItem(div.dataset.itemId);
    }

    /**
     * @private
     * Rolls a skill check when it is clicked
     */
    _rollSkillCheck(event) {
        event.preventDefault();
        const skill = event.currentTarget.parentElement.dataset.skill;
        const skillName =
            AKRPG.skills[skill] ||
            this.data.data.skills[skill].label ||
            "Skill";
        this.actor.rollSkill(skill, skillName);
    }

    /**
     * @private
     * Rolls a saving throw when clicked
     */
    _rollSavingThrow(event) {
        event.preventDefault();
        const savingThrow =
            event.currentTarget.parentElement.dataset.savingthrow;
        const savingThrowName =
            AKRPG.savingThrows[savingThrow] || "Saving Throw";

        this.actor.rollSavingThrow(savingThrow, savingThrowName);
    }
}
