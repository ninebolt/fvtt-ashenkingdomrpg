Hooks.once('init', async function () {
  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initative = {
    formula: '1d20',
    decimals: 2,
  };
});
