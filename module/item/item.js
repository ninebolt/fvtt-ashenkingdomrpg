export default class AKRPGItem extends Item {

    /**
     * @override
     * This function initalizes the actor entity and calculates appropriate values.
     */
    prepareData() {
        super.prepareData();

        const itemData = this.data;
        const data = itemData.data;
        const actorData = this.actor ? this.actor.data : {};
        const flags = itemData.flags;
        const C = CONFIG.AKRPG;
        const labels = {};

        // Spell Level, Domain, and Components
        if ( itemData.type === "spell" ) {
          labels.cost = C.arcanumCosts[data.arcanumCost];
          labels.domain = C.spellDomains[data.domain.toLowerCase()];
          labels.components = Object.entries(data.components).reduce((arr, c) => {
            if ( c[1] !== true ) return arr;
            arr.push(c[0].titleCase().slice(0, 1));
            return arr;
          }, []);
          labels.concentration = data.concentration;
          labels.materials = data?.materials?.value ?? null;
        }

        this.labels = labels;

        console.log('ITEM DATA', this.data);
        console.log('ITEM FLAGS', this.flags);
    }

    /**
     * Rolling with the item
     */
    async roll({configureDialog=true, rollMode=null, createMessage=true}={}) {
      // Basic template rendering
      const token = this.action.token;
      const templateData = {
        actor: this.actor,
        tokenId: token ? `${token.scene_id}.${token.id}` : null,
        item: this.data, 
        data: this.getChatData(), // TODO LOOK AT THIS
        hasAttack: this.hasAttack,
        hasDamage: this.hasDamage,
        isVersatile: this.isVersatile
      };

      // Render the chat card
      const template = `systems/dnd5e/templates/chat/item-card.html`;
      const html = await renderTemplate(template, templateData);

      const chatData = {
        user: game.user._id,
        type: CONST.CHAT_MESSAGE_TYPES.OTHER,
        content: html,
        flavor: this.name,
        speaker: {
          actor: this.actor_id,
          token: this.actor.token,
          alias: this.actor.name
        },
        flags: {"core.canPopout": true}
      }

      // Toggle default roll mode
      rollMode = rollMode || game.settings.get('core', 'rollMode');
      if (['gmroll', 'blindroll'].includes(rollMode)) chatData['whisper'] = ChatMessage.getWhisperRecipients('GM');
      if (rollMode === 'blindroll') chatData['blind'] = true;

      // Create the chat message
      if (createMessage) return ChatMessage.create(chatData);
      else return chatData;
    }

    /**
     * Prepare chat data
     */
    getChatData(htmlOptions={}) {
      const data = duplication(this.data.data);
      const labels = this.labels;

      // Rich text
      data.description.value = TextEditor.enrichHTML(data.description, htmlOptions);

      // Item specific properties
      const props = [];
      const fn = this[`_${this.data.type}ChatData`];
      if (fn) fn.bind(this)(data, labels, props);

      data.properties = props.filter(p => !!p);
      return data;
    }

    /**
   * Prepare chat card data for weapon type items
   * @private
   */
    _weaponChatData(data, labels, props) {
      props.push('');
    }

    static chatListeners(html) {
      html.on('click', '.card-buttons button', this._onChatCardAction.bind(this));
    }

    static async _onChatCardAction(event) {
      event.preventDefault();

      // Extract card data
      const button = event.currentTarget;
      button.disabled = true;
      const card = button.closest('.chat-card');
      const messageId = card.closest('.message').dataset.messageId;
      const action = button.dataset.action;

      // Get actor
      const actor = this._getChatCardActor(card);
      if(!actor) return;

      // Get item
      const item = actor.getOwnedItem(card.dataset.itemId);
      if (!item) {
        return ui.notifications.error('Your actor does have access to this item.');
      }

      switch (action) {
        case "attack":
          console.log('ATTACKING!');
          break;
      }

      button.disabled = false;
    }

    /**
     * Get the ability score modifier tied to this item
     */
    get abilityMod() {
      const itemData = this.data.data;
      if (!('ability' in itemData)) return null;

      if (itemData.ability)  return itemData.ability;
    }

    /**
     * For now, only weapons have attack
     */
    get hasAttack() {
      return this.data.type === 'weapon';
    }

    /**
     * If damage has been set up
     */
    get hasDamage() {
      return !!(this.data.data.damage && this.data.data.damage.parts.length);
    }

    /**
     * If the weapon has versatile damage
     */
    get isVersatile() {
      return !!(this.hasDamage && this.data.data.damage.versatile);
    }

    /** Is there a target selected for the damage */
    get hasTarget() {
      const target = this.data.data.target;
      return target && !['none', ''].includes(target.type);
    }

    
}
