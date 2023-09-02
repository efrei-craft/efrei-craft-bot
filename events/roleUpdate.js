const { Events } = require("discord.js");
const animus = require("../animus");

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
        const playerUuid = (await animus.getPlayerFromDiscordId(newMember.id)).uuid;
        if (playerUuid !== null) {
            const groupMap = require("../config.json").discord_roles_id;
            const ranks = [];
            for (const role of newMember.roles.cache.values()) {
                for (const roleName in groupMap) {
                    if (groupMap[roleName] === role.id) {
                        ranks.push(roleName);
                    }
                }
            }
            await animus.updatePlayerGroups(playerUuid, ranks);
            console.log("Updated permissions groups of " + newMember.user.username + " (" + newMember.id + ") to " + ranks.join(", ") + ".");
        }
    }
}
