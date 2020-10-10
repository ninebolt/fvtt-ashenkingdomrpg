export async function d20Roll({ parts = [], data = {}, flavor }) {
    let roll = new Roll(parts.join(" + "), data);

    try {
        roll.roll();
    } catch (err) {
        console.log(err);
        ui.notifications.error(`Dice roll failed: ${err.message}`);
        return null;
    }

    const messageData = {};
    messageData.flavor = flavor;
    messageData.speaker = ChatMessage.getSpeaker();

    const messageOptions = { rollMode: game.settings.get("core", "rollMode") };

    roll.toMessage(messageData, messageOptions);

    return roll;
}
