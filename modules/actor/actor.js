import { d20Roll } from "../dice.js";

export default class AKRPGActor extends Actor {
    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
    }

    /** @override */
    prepareDerivedData() {
        const actorData = this.data;
        const data = actorData.data;

        this._calculateAbilityScoreModifiers(data);
        this._calculateSavingThrows(data);
        this._calculateSkillTotals(data);
        this._calculateCharacterDC(data);
        this._calculateMaximumSpellStrain(data);
        this._calculateSpellAttackBonus(data);
        this._calculateInitiative(data);
        this._calculateCarryingCapacity(data);
    }

    /**
     * Rolls a skill check based on the inputted skill key
     * @param {string} skillId
     */
    rollSkill(skillId, skillName) {
        const parts = ["1d20"];
        const modifier = this.data.data.skills[skillId].value || 0;

        parts.push("@abilityMod");

        const rollData = { abilityMod: modifier };
        const flavor = `${skillName} Roll`;

        return d20Roll({ parts, data: rollData, flavor });
    }

    rollSavingThrow(savingThrowId, savingThrowName) {
        const parts = ["1d20"];
        const modifier = this.data.data.savingThrows[savingThrowId].value || 0;

        parts.push("@abilityMod");

        const rollData = { abilityMod: modifier };
        const flavor = `${savingThrowName} Roll`;

        return d20Roll({ parts, data: rollData, flavor });
    }

    /**
     * Updates the current weight using the update function
     * @param {number} weight Weight to be set
     */
    updateCurrentWeight(weight) {
        const data = { "data.carryingCapacity.value": weight };
        return super.update(data, {});
    }

    /**
     * @private
     * Calculates the ability score modifiers
     */
    _calculateAbilityScoreModifiers(data) {
        for (let ability of Object.values(data.abilityScores)) {
            if (!ability.value) ability.value = 10;
            ability.mod = Math.floor((+ability.value - 10) / 2);
        }
    }

    /**
     * @private
     * Calculates saving throw values
     */
    _calculateSavingThrows(data) {
        for (let savingThrow of Object.values(data.savingThrows)) {
            if (!savingThrow.base) savingThrow.base = 0;
            if (!savingThrow.additionalModifier)
                savingThrow.additionalModifier = 0;
            if (!savingThrow.baseAbility) savingThrow.baseAbility = "wis";
            savingThrow.value =
                +savingThrow.base +
                +savingThrow.additionalModifier +
                +data.abilityScores[savingThrow.baseAbility].mod;
        }
    }

    /**
     * @private
     * Calculates the total for each skill
     */
    _calculateSkillTotals(data) {
        let proficiencyMap = { unknown: -4, known: 0, trained: 3, expert: 6 };
        for (let skill of Object.values(data.skills)) {
            if (!skill.additionalModifier) skill.additionalModifier = 0;
            if (!skill.baseAbility) skill.baseAbility = "wis";
            if (!skill.proficiency) skill.proficiency = "unknown";
            skill.value =
                +data.abilityScores[skill.baseAbility].mod +
                +proficiencyMap[skill.proficiency] +
                +skill.additionalModifier;
        }
    }

    /**
     * @private
     * Calculates the characterDC
     */
    _calculateCharacterDC(data) {
        if (!data.attributes.signatureAbility)
            data.attributes.signatureAbility = "wis";
        if (!data.characterDC.additionalModifier)
            data.characterDC.additionalModifier = 0;
        data.characterDC.value =
            10 +
            +data.abilityScores[data.attributes.signatureAbility].mod +
            +Math.floor(+data.attributes.level / 2) +
            +data.characterDC.additionalModifier;
    }

    /**
     * @private
     * Calculates maximum spell strain
     */
    _calculateMaximumSpellStrain(data) {
        if (!data.attributes.level) data.attributes.level = 1;
        data.strain.max = 1 + +data.attributes.level;
    }

    /**
     * @private
     * Calculates spell attack bonus
     */
    _calculateSpellAttackBonus(data) {
        if (!data.spellAttack.additionalModifier)
            data.spellAttack.additionalModifier = 0;
        if (!data.attributes.signatureAbility)
            data.attributes.signatureAbility = "wis";
        if (!data.baseAttackBonus.value) data.baseAttackBonus.value = 0;
        data.spellAttack.value =
            +data.spellAttack.additionalModifier +
            +data.abilityScores[data.attributes.signatureAbility].mod +
            +data.baseAttackBonus.value;
    }

    /**
     * @private
     * Calculates initiative
     */
    _calculateInitiative(data) {
        if (!data.initiative.additionalModifier)
            data.initiative.additionalModifier = 0;
        data.initiative.value =
            +data.abilityScores["dex"].mod +
            +data.initiative.additionalModifier;
    }

    /**
     * @private
     * Calculate carrying capacity
     */
    _calculateCarryingCapacity(data) {
        if (!data.carryingCapacity.additionalModifier) data.carryingCapacity.additionalModifier = 0;
        data.carryingCapacity.encumbrance =  5 + +data.carryingCapacity.additionalModifier;
        data.carryingCapacity.max = 10 + +data.carryingCapacity.additionalModifier;
    }
}
