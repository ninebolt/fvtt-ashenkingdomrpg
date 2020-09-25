export class AKRPGActor extends Actor {

    /**
     * @override
     * This function initalizes the actor entity and calculates appropriate values.
     */
    prepareData() {
        console.log('ACTOR DATA', this.data);
        super.prepareData();

        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags;

        if (actorData.type === 'character') this._prepareCharacterData(actorData);
    }

    /**
     * Prepares data for actor type 'character'
     */
    _prepareCharacterData() {
        this._calculateAbilityScoreModifiers();
        this._calculateSavingThrows();
    }

    /**
     * Computes the ability score modifiers from base ability scores.
     */
    _calculateAbilityScoreModifiers() {
        for (let ability of Object.values(this.data.data.abilityScores)) {
            if (ability.value) ability.modifier = Math.floor((ability.value - 10) / 2);
            console.log('ABILITY', ability);
        }
    }

    /**
     * Compuates the saving throw totals from the character's base, relevant ability score, and misc. modifiers.
     */
    _calculateSavingThrows() {
        for (let savingThrow of Object.values(this.data.data.savingThrows)) {
            if (!savingThrow.base) savingThrow.base = 0;
            if (!savingThrow.miscMod) savingThrow.miscMod = 0;

            console.log('A', savingThrow.base);
            console.log('B', this.data.data.abilityScores[savingThrow.baseAbility].modifier);
            console.log('C', savingThrow.miscMod);

            savingThrow.value = savingThrow.base + this.data.data.abilityScores[savingThrow.baseAbility].modifier + savingThrow.miscMod;
            console.log('SAVING THROW', savingThrow);
        }
    }
}