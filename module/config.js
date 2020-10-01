// Namespace Configuration Values
export const AKRPG = {};

/**
 * The set of Ability Scores used within the system
 * @type {Object}
 */
AKRPG.abilities = {
  "str": "AKRPG.AbilityStr",
  "dex": "AKRPG.AbilityDex",
  "con": "AKRPG.AbilityCon",
  "int": "AKRPG.AbilityInt",
  "wis": "AKRPG.AbilityWis",
  "cha": "AKRPG.AbilityCha"
};

AKRPG.abilityAbbreviations = {
  "str": "AKRPG.AbilityStrAbbr",
  "dex": "AKRPG.AbilityDexAbbr",
  "con": "AKRPG.AbilityConAbbr",
  "int": "AKRPG.AbilityIntAbbr",
  "wis": "AKRPG.AbilityWisAbbr",
  "cha": "AKRPG.AbilityChaAbbr"
};

/**
 * The set of skill which can be trained
 * @type {Object}
 */
AKRPG.skills = {
  "acr": "AKRPG.SkillAcr",
  "ani": "AKRPG.SkillAni",
  "arc": "AKRPG.SkillArc",
  "ath": "AKRPG.SkillAth",
  "dec": "AKRPG.SkillDec",
  "his": "AKRPG.SkillHis",
  "ins": "AKRPG.SkillIns",
  "itm": "AKRPG.SkillItm",
  "inv": "AKRPG.SkillInv",
  "med": "AKRPG.SkillMed",
  "nat": "AKRPG.SkillNat",
  "prc": "AKRPG.SkillPrc",
  "prf": "AKRPG.SkillPrf",
  "per": "AKRPG.SkillPer",
  "rel": "AKRPG.SkillRel",
  "slt": "AKRPG.SkillSlt",
  "ste": "AKRPG.SkillSte",
  "sur": "AKRPG.SkillSur"
};

// Spell Arcanum Costs
AKRPG.arcanumCosts = {
  0: "AKRPG.ArcanumCost0",
  1: "AKRPG.ArcanumCost1",
  2: "AKRPG.ArcanumCost2",
  3: "AKRPG.ArcanumCost3",
  4: "AKRPG.ArcanumCost4",
  5: "AKRPG.ArcanumCost5",
  6: "AKRPG.ArcanumCost6",
  7: "AKRPG.ArcanumCost7",
  8: "AKRPG.ArcanumCost8",
  9: "AKRPG.ArcanumCost9"
};


// Spell Domains
AKRPG.spellDomains = {
  "death": "AKRPG.SchoolDeath",
  "glass": "AKRPG.SchoolGlass",
  "ice": "AKRPG.SchoolIce",
  "inferno": "AKRPG.SchoolInferno",
  "nature": "AKRPG.SchoolNature",
  "sky": "AKRPG.SchoolSky",
  "void": "AKRPG.SchoolVoid"
};
