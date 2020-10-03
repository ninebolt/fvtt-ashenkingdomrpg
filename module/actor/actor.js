export default class AKRPGActor extends Actor {

    /**
     * @override
     * This function initalizes the actor entity and calculates appropriate values.
     */
    prepareData() {
        super.prepareData();

        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags;

        if (actorData.type === 'character') this._prepareCharacterData(actorData);

        console.log('ACTOR DATA', this.data);
        console.log('ACTOR FLAGS', this.flags);
    }

    prepareDerivedData() {
        console.log('DERIVING!');
    }

    /**
     * @override
     * Updates the entity data
     */
    async update(data, options={}) {
        return super.update(data, options);
    }

    /**
     * Prepares data for actor type 'character'
     */
    _prepareCharacterData() {
        this._calculateAbilityScoreModifiers();
        this._calculateSavingThrows();
        this._calculateSkillTotals();
        this._calculateCharacterDC();
        this._calculateMaximumSpellStrain();
        this._calculateInitiative();
    }

    /**
     * Computes the ability score modifiers from base ability scores.
     */
    _calculateAbilityScoreModifiers() {
        for (let ability of Object.values(this.data.data.abilityScores)) {
            if (ability.value) ability.modifier = Math.floor((ability.value - 10) / 2);
        }
    }

    /**
     * Computes the saving throw totals from the character's base, relevant ability score, and misc. modifiers.
     */
    _calculateSavingThrows() {
        for (let savingThrow of Object.values(this.data.data.savingThrows)) {
            if (!savingThrow.base) savingThrow.base = 0;
            if (!savingThrow.additionalModifier) savingThrow.miscMod = 0;
            savingThrow.value = savingThrow.base + this.data.data.abilityScores[savingThrow.baseAbility].modifier + savingThrow.additionalModifier;
        }
    }

    /**
     * Computes the totals for each general and specific skill.
     */
    _calculateSkillTotals() {
        let proficiencyMap = { 'unknown': -4, 'known': 0, 'trained': 3, 'expert': 6 };
        for (let skill of Object.values(this.data.data.skills)) {
            if (!skill.additionalModifier) skill.additionalModifier = 0;
            skill.value = +proficiencyMap[skill.proficiency] + +this.data.data.abilityScores[skill.baseAbility].modifier + +skill.additionalModifier;
        }
    }

    /**
     * Computes the characterDC
     */
    _calculateCharacterDC() {
        if (!this.data.data.attributes.signatureAbility) this.data.data.attributes.signatureAbility = 'wis';
        if (!this.data.data.attributes.characterDC.additionalModifier) this.data.data.attributes.characterDC.additionalModifier = 0;
        this.data.data.attributes.characterDC.value = 10 + Math.floor(+this.data.data.attributes.level / 2) + this.data.data.abilityScores[this.data.data.attributes.signatureAbility].modifier + +this.data.data.attributes.characterDC.additionalModifier;
    }

    /**
     * Computes the maximum spell strain
     */
    _calculateMaximumSpellStrain() {
        if (!this.data.data.attributes.signatureAbility) this.data.data.attributes.signatureAbility = 'wis';
        this.data.data.strain.maximum = 1 + this.data.data.attributes.level;
    }

    /**
     * Computes character initiative
     */
    _calculateInitiative() {
        if (!this.data.data.attributes.initiative.additionalModifier) this.data.data.attributes.initiative.additionalModifier = 0;
        this.data.data.attributes.initiative.value = this.data.data.abilityScores.dex.modifier + this.data.data.attributes.initiative.additionalModifier;
    }

}