import AKRPGActor from './module/actor/actor.js';
import AKRPGActorSheetCharacter from './module/actor/sheets/character.js';

Hooks.once('init', async function () {
  console.log('AKRPG | System Loading');

  game.boilerplate = {
    AKRPGActor
  };

  CONFIG.Actor.entityClass = AKRPGActor;
  
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('akrpg', AKRPGActorSheetCharacter, { types: ['character'], makeDefault: true });

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initative = {
    formula: '1d20',
    decimals: 2,
  };
});
