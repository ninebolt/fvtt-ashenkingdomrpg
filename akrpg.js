import { AKRPG } from "./modules/config.js";

// Actors
import AKRPGActor from "./modules/actor/actor.js";
import AKRPGActorSheetCharacter from "./modules/actor/sheets/character.js";

// Items
import AKRPGItem from "./modules/item/item.js";
import AKRPGItemSheetSpell from "./modules/item/sheets/spell.js"

Hooks.once("init", async function () {
    console.log("AKRPG | System Loading");

    game.akrpg = {
        application: {
            AKRPGActorSheetCharacter,
            AKRPGItemSheetSpell,
        },
        entities: {
            AKRPGActor,
            AKRPGItem,
        },
    };

    CONFIG.Actor.entityClass = AKRPGActor;
    CONFIG.Item.entityClass = AKRPGItem;
    CONFIG.AKRPG = AKRPG;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("akrpg", AKRPGActorSheetCharacter, {
        types: ["character"],
        makeDefault: true,
    });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("akrpg", AKRPGItemSheetSpell, {
        types: ["spell"],
        makeDefault: true,
    })
});
