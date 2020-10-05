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
     * When an item from the compendium is dropped onto the sheet
     */
    async _onDrop(event) {
        console.log('dropped', event);
        event.preventDefault();

        let data;
        try {
            data = JSON.parse(event.dataTransfer.getData('text/plain'));
        } catch (err) {
            console.log('ERROR', err);
            return false;
        }

        console.log('DATA', data);

        if (!data) return false;

        const allowed = Hooks.call('dropActorSheetData', this.actor, this, data);
        console.log('Allowed', allowed);
        if (allowed === false) return;

        if (data.type === 'Item') {
            console.log('ITEM TYPE');
        }

        super._onDrop(event);
        
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