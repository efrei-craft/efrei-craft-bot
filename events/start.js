const { Events, ActivityType } = require("discord.js");
const animus = require("../animus");

module.exports = {
    eventName: Events.ClientReady,
    eventHandler: async (client) => {
        console.log('Successfully logged in!');

        // Set bot status
        client.user.setPresence({status: "online", activities: [{ name: "Minecraft | efreicraft.fr", type: ActivityType.Playing}]});

        // Check if all members are in the database
        const members = await animus.getAllMembers();

        const guild = client.guilds.cache.get(require("../config.json").guild_id);
        // To update the cache
        await guild.members.list({ limit: 1000, cache: false })
        for (const member of guild.members.cache.values()) {
            if (member.user.bot) continue;
            if (members.find((m) => m.discordId === member.id) === undefined) {
                console.log("Member " + member.user.username + " was not in Database, creating it...")
                await animus.createMember(member.id, "", "", 0);
            }
        }
    }
}
