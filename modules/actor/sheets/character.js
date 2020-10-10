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
        const data = super.getData();

        data.dtypes = ["String", "Number", "Boolean"];

        console.log("Character Data", data);
        return data;
    }

    /**
     * Event Listeners
     */
    activateListeners(html) {
        // Updating Skill Proficiency
        html.find(".proficiency-box").click(
            this._updateSkillProficiency.bind(this)
        );

        // Updating Skill Base Ability
        html.find(".skill-proficiency").click(
            this._updateSkillProficiencyAbility.bind(this)
        );

        html.find(".savingThrow-baseAbility").click(
            this._updateSkillProficiencyAbility.bind(this)
        );

        super.activateListeners(html);
    }

    /**
     * @private
     * Updates the proficiency level for each skill. Required because there is no way to have radio buttons work the way I want and it sucks.
     */
    _updateSkillProficiency(event) {
        event.preventDefault();
        const proficiency = event.currentTarget.dataset.prof;
        const field = $(event.currentTarget).siblings('input[type="hidden"]');
        field.val(proficiency);

        // The trick is to use the formdata lifecycle hooks but adjusting the value of the hidden input
        this._onSubmit(event);
    }

    _updateSkillProficiencyAbility(event) {
        event.preventDefault();
        const abilities = ["str", "dex", "con", "int", "wis", "cha"];

        const currentAbility = event.target.innerHTML.trim();

        var ind = abilities.indexOf(currentAbility);
        if (ind < 0) ind = 0;
        ind = (ind + 1) % abilities.length;

        const field = $(event.currentTarget).siblings('input[type="hidden"]');
        field.val(abilities[ind]);

        this._onSubmit(event);
    }
}
