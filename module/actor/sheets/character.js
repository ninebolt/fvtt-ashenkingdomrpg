import AKRPGActorSheet  from './base.js';

export default class AKRPGActorSheetCharacter extends AKRPGActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["akrpg", "sheet", "actor"],
            width: 720,
            height: 700,
        });
    }

    getData() {
        const data = super.getData();

        data.dtypes = ['String', 'Number', 'Boolean'];
        return data;
    }

    /**
     * @override
     * Submits form changes
     */
    _onSubmit(event) {
        return super._onSubmit(event);
    }

    /**
     * Event Listeners
     */ 

    activateListeners(html) {
        super.activateListeners(html);
        
        // Updating Skill Proficiency
        html.find('.proficiency-box').click(this._updateSkillProficiency.bind(this));
    }

    _updateSkillProficiency(event) {
        event.preventDefault();
        const proficiency = event.currentTarget.getAttribute('data-prof');
        const field = $(event.currentTarget).siblings('input[type="hidden"]');
        field.val(proficiency);

        // The trick is to use the formdata lifecycle hooks but adjusting the value of the hidden input
        this._onSubmit(event);
    }

}