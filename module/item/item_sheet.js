export default class AKRPGItemSheet extends ItemSheet {
    constructor(...args) {
        super(...args);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["akrpg", "sheet", "item"],
            width: 600,
            height: "auto",
            resizeable: true,
            "scrollY": [".tab.details"],
            tabs: [{ navSelector: ".tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @override */
    get template() {
      const path = "systems/AKRPG/templates/item/";
      return `${path}${this.item.data.type}.html`;
    }

    /** @override */
    getData() {
        const data = super.getData();
        data.labels = this.item.labels;

        data.config = CONFIG.AKRPG;

        data.itemType = data.item.type.titleCase();
        data.isPhysical = data.item.data.hasOwnProperty('quantity');

        console.log("Item Sheet Data", data);
        return data;
    }

    /** @override */
    _updateObject(event, formData) {
        const damage = formData.data?.damage;

        // configure damage into parts
        if (damage) damage.parts = Object.values(damage?.parts || {}).map(d => [d[0] || "", d[1] || ""]);

        super._updateObject(event, formData);
    }

    /**
     * @override
     * Sheet listeners
     */
    activateListeners(html) {
        super.activateListeners(html);

        // Add damage
        html.find('.damage-control').click(this._onDamageControl.bind(this));
    }

    /**
     * Add or remove part of the damage formula
     */
    async _onDamageControl(event) {
        event.preventDefault();
        const a = event.currentTarget;

        // Add a new damage component
        if (a.classList.contains('add-damage')) {
            await this._onSubmit(event);
            const damage = this.item.data.data.damage;
            return this.item.update({"data.damage.parts": damage.parts.concat([["", ""]])});
        }

        // Remove a damage component
        if (a.classList.contains('delete-damage')) {
            await this._onSubmit(event);
            const li = a.closest('.damage-part');
            const damage = duplicate(this.item.data.data.damage);
            console.log('DAMAGE', damage);
            damage.parts.splice(Number(li.dataset.damagePart), 1);
            return this.item.update({"data.damage.parts": damage.parts});
        }
    }
}
