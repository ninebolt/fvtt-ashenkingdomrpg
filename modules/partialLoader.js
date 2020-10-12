export const preloadPartials = async function() {
    const templatePaths = [
        'systems/akrpg/templates/actor/partials/inventory-partial.html'
    ];

    return loadTemplates(templatePaths);
}