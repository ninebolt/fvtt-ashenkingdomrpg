// Import config
import { AKRPG } from './module/config.js'

// Import Entities
import AKRPGActor from './module/actor/actor.js';
import AKRPGItem from './module/item/item.js';

// Import Sheets
import AKRPGActorSheetCharacter from './module/actor/sheets/character.js';
import AKRPGItemSheet from './module/item/item_sheet.js';

Hooks.once('init', async function () {
  console.log('AKRPG | System Loading');

  game.akrpg = {
    application: {
      AKRPGActorSheetCharacter,
      AKRPGItemSheet
    },
    entities: {
      AKRPGActor,
      AKRPGItem
    }
  };

  CONFIG.Actor.entityClass = AKRPGActor;
  CONFIG.AKRPG = AKRPG;

  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('akrpg', AKRPGActorSheetCharacter, { types: ['character'], makeDefault: true });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('akrpg', AKRPGItemSheet, {makeDefault: true});

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initative = {
    formula: '1d20',
    decimals: 2,
  };

  /* Handlebars helpers */
  Handlebars.registerHelper('ifEqual', function(val1, val2) {
    return (val1 === val2);
  });
});
