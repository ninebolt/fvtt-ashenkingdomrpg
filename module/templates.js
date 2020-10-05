export const preloadHandlebarsTemplates = async function() {

    const templatePaths = [
        'systems/AKRPG/templates/item/partials/item-description.html',
        'systems/AKRPG/templates/item/partials/item-activation.html',
        'systems/AKRPG/templates/item/partials/item-action.html'
    ];

    return loadTemplates(templatePaths);
}