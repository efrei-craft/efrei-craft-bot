const { Events } = require("discord.js");
const animus = require("../animus");

module.exports = {
    eventName: Events.GuildMemberAdd,
    eventHandler: async (member) => {
        console.log("New member: " + member.user.username + "#" + member.user.discriminator + " (" + member.id + ")");
        if (await animus.getMember(member.id) === null) {
            console.log("Creating member in Database...")
            await animus.createMember(member.id, "", "", 0);
        }
        else {
            console.log("Member already exists in Database.")
        }
    }
}
