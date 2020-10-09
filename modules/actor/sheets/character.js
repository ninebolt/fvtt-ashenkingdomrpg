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

        super.activateListeners(html);
    }

    /**
     * @private
     * Updates the proficiency level for each skill. Required because there is no way to have radio buttons work the way I want and it sucks.
     */
    _updateSkillProficiency(event) {
        event.preventDefault();
        const proficiency = event.currentTarget.getAttribute("data-prof");
        const field = $(event.currentTarget).siblings('input[type="hidden"]');
        field.val(proficiency);

        // The trick is to use the formdata lifecycle hooks but adjusting the value of the hidden input
        this._onSubmit(event);
    }
}
