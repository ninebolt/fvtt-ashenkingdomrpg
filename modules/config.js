// Namespace Configuration Values
export const AKRPG = {};

/**
 * The set of Ability Scores used within the system
 * @type {Object}
 */
AKRPG.abilities = {
    str: "Strength",
    dex: "Dexterity",
    con: "Constitution",
    int: "Intelligence",
    wis: "Wisdom",
    cha: "Charisma",
};

AKRPG.abilityAbbreviations = {
    str: "Str",
    dex: "Dex",
    con: "Con",
    int: "Int",
    wis: "Wis",
    cha: "Cha",
};

AKRPG.savingThrows = {
    fort: "Fortitude",
    ref: "Reflex",
    will: "Will",
};

/**
 * The set of skill which can be trained
 * @type {Object}
 */
AKRPG.skills = {
    acr: "Acrobatics",
    ani: "Animal Handling",
    arc: "Arcana",
    ath: "Athletics",
    dec: "Deception",
    his: "History",
    ins: "Insight",
    itm: "Intimidation",
    inv: "Investigation",
    med: "Medicine",
    nat: "Nature",
    prc: "Perception",
    prf: "Performance",
    per: "Persuasion",
    rel: "Religion",
    slt: "Sleight of Hand",
    ste: "Stealth",
    sur: "Survival",
};

// Spell Domains
AKRPG.spellDomains = {
    death: "Death",
    glass: "Glass",
    ice: "Ice",
    inferno: "Inferno",
    nature: "Nature",
    sky: "Sky",
    void: "Void",
    life: "Life",
};

// Weapon Properties
AKRPG.weaponProperties = {
    finesse: "Finesse",
    light: "Light",
    thrown: "Thrown",
    versatile: "Versatile",
    reach: "Reach",
    heavy: "Heavy",
    reload: "Reload",
};

AKRPG.actionTypes = {
    action: "Action",
    bonusAction: "Bonus Action",
    reaction: "Reaction",
    movementAction: "Movement Action",
    interactAction: "Interact Action",
    freeAction: "Free Action",
    special: "Special",
    none: "None",
};

AKRPG.damageTypes = {
    bludgeoning: "Bludgeoning",
    slashing: "Slashing",
    piercing: "Piercing",
    fire: "Fire",
    cold: "Cold",
    lightning: "Lightning",
    acid: "Acid",
    radiant: "Radiant",
    necrotic: "Necrotic",
    void: "Void",
    healing: "Healing",
};
