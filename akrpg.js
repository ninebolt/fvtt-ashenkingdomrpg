import { AKRPG } from "./modules/config.js";

import { preloadPartials } from './modules/partialLoader.js';

import AKRPGActor from "./modules/actor/actor.js";
import AKRPGItem from "./modules/item/item.js";
import AKRPGActorSheetCharacter from "./modules/actor/sheets/character.js";
import AKRPGItemSheetEquipment from "./modules/item/sheets/equipment.js";

Hooks.once("init", async function () {
    console.log("AKRPG | System Loading");

    game.akrpg = {
        application: {
            AKRPGActorSheetCharacter,
        },
        entities: {
            AKRPGActor,
            AKRPGItem,
        },
    };

    CONFIG.Actor.entityClass = AKRPGActor;
    CONFIG.AKRPG = AKRPG;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("akrpg", AKRPGActorSheetCharacter, {
        types: ["character"],
        makeDefault: true,
    });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("akrpg", AKRPGItemSheetEquipment, {
        types: ["equipment", "weapon", "armor"],
        makeDefault: true,
    });

    // Load HTML Partials
    preloadPartials();

    console.log('AKRPG | System Load Complete');
});
