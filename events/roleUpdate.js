const { Events } = require("discord.js");
const animus = require("../animus");
const { getUserRanks } = require("../utils");

module.exports = {
    eventName: Events.GuildMemberUpdate,
    eventHandler: async (oldMember, newMember) => {
        // ROLES
        for (const role of newMember.roles.cache.values()) {
            // PROMO
            if (role.name.startsWith("P") && role.name.substring(1).match(/^[0-9]+$/)) {
                await animus.updateMember(newMember.id, {promo: parseInt(role.name.substring(1))});
                console.log("Updated promo of " + newMember.user.username + " (" + newMember.id + ") to " + role.name.substring(1));
            }
            else if (role.name === "Ancien") {
                await animus.updateMember(newMember.id, {promo: -1});
                console.log("Updated promo of " + newMember.user.username + " (" + newMember.id + ") to Ancien");
            }
        }
        // POLES
        try {
            const playerUuid = (await animus.getPlayerFromDiscordId(newMember.id)).uuid;
            if (playerUuid !== null) {
                const ranks = getUserRanks(newMember);
                await animus.updatePlayerGroups(playerUuid, ranks);
                console.log("Updated permissions groups of " + newMember.user.username + " (" + newMember.id + ") to " + ranks.join(", ") + ".");
            }
        } catch {}
    }
}
