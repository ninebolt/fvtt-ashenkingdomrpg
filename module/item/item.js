export default class AKRPGSpell extends Item {

    /**
     * @override
     * This function initalizes the actor entity and calculates appropriate values.
     */
    prepareData() {
        super.prepareData();

        const itemData = this.data;
        const actorData = this.actor ? this.actor.data : {};
        const data = itemData.data;
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

        console.log('ITEM DATA', this.data);
        console.log('ITEM FLAGS', this.flags);
    }

}
