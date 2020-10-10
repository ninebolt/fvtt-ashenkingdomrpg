import { AKRPG } from "./modules/config.js";

import AKRPGActor from "./modules/actor/actor.js";
import AKRPGItem from "./modules/item/item.js";
import AKRPGActorSheetCharacter from "./modules/actor/sheets/character.js";

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
});
