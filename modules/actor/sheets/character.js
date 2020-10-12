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

        data.inventory = this._prepareItems(data);

        console.log("Character Data", data);
        return data;
    }
    
    /**
     * @override
     * @param {} event The drop event
     */
    async _onDrop(event) {
        console.log('DROPPED', event);
        event.preventDefault();

        let data;
        try {
            data = JSON.parse(event.dataTransfer.getData('text/plain'));
        } catch (err) {
            console.log('Error with drop', err);
            return false;
        }

        console.log('Dropped Data', data);

        if (!data) return false;

        super._onDrop(event);

        // Recalculates the encumbrance
        this._prepareItems(this.getData());
    }

    _prepareItems(data) {
        // Categorizes the inventory into the three item types
        // Spells are excluded since they are not an item, just under the Item umbrella
        const inventory = {
            weapon: { label: 'Weapons', items: [], dataset: { type: 'weapon'}},
            armor: { label: 'Armor', items: [], dataset: { type: 'armor'}},
            equipment: { label: 'Equipment', items: [], dataset: { type: 'equipment' }},
        };

        this.actor.data.data.carryingCapacity.value = 0;

        // Sort and calculate total weight of each item
        for (let i of data.items ) {
            i.data.quantity = i.data.quantity || 0;
            i.data.bulk = i.data.bulk || '-';
            i.data.totalWeight = this._calculateWeight(i);
            inventory[i.type].items.push(i);
            this.actor.data.data.carryingCapacity.value += i.data.totalWeight;
        }

        // Rounds down the current weight carried
        this.actor.data.data.carryingCapacity.value = Math.floor(this.actor.data.data.carryingCapacity.value);
        this.actor.updateCurrentWeight(this.actor.data.data.carryingCapacity.value);
        return inventory;
    }

    _calculateWeight(item) {
        let totalWeight = 0;
        let convertedWeight = parseInt(item.data.bulk);

        console.log('DOING IT');
        console.log('CONVERTED WEIGHT', convertedWeight);
        
        if (!Number.isNaN(convertedWeight)) {
            totalWeight = item.data.bulk * item.data.quantity;
        } else if (item.data.bulk === 'L') {
            console.log('L');
            totalWeight = 0.1 * item.data.quantity;
        }
        return totalWeight;
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

        html.find('.roll-strain').click(this._rollStrainCheck.bind(this));

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

    /**
     * Updates the ability tied to each skill proficiency
     * @param {Event} event The click event
     */
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

    _rollStrainCheck(event) {
        event.preventDefault();
        this.actor.rollSavingThrow('fort', 'Strain')
    }
}
