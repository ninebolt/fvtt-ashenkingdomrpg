import AKRPGActorSheet  from './base.js';
import AKRPGActor from '../actor.js';

export default class AKRPGActorSheetCharacter extends AKRPGActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["akrpg", "sheet", "actor"],
            width: 720,
            height: 680,
        });
    }

    getData() {
        const data = super.getData();
        console.log("Actor Data", data);

        data.dtypes = ['String', 'Number', 'Boolean'];
        return data;
    }

    /**
     * Event Listeners
     */

    activateListeners(html) {
        super.activateListeners(html);
        
        // Selecting Signature Ability
        html.find('.ability-signature-selector').click(this._selectSignatureAbility.bind(this));
    }

    _selectSignatureAbility(event) {
        event.preventDefault();
        this.actor.setSignatureAbility(event.toElement.getAttribute('data-abilityScore'));
    }
}