const { Events } = require("discord.js");
const animus = require("../animus");

module.exports = {
    eventName: Events.GuildMemberUpdate,
    eventHandler: async (oldMember, newMember) => {
        // PROMO ROLES
        for (const role of newMember.roles.cache.values()) {
            if (role.name.startsWith("P") && role.name.substring(1).match(/^[0-9]+$/)) {
                await animus.updateMember(newMember.id, {promo: parseInt(role.name.substring(1))});
                console.log("Updated promo of " + newMember.user.username + "#" + newMember.user.discriminator + " (" + newMember.id + ") to " + role.name.substring(1));
            }
            else if (role.name === "Ancien") {
                await animus.updateMember(newMember.id, {promo: -1});
                console.log("Updated promo of " + newMember.user.username + "#" + newMember.user.discriminator + " (" + newMember.id + ") to Ancien");
            }
        }
    }
}