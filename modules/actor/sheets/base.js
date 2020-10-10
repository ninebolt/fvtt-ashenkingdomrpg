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

        super.activateListeners(html);
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
