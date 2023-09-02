const { ContextMenuCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Changer en membre")
        .setType(2),
    async execute(interaction) {
        const user = interaction.targetMember;
        user.roles.add("1028938423253356544");
        // Remove all previously messages from bot to user in private channel
        // Send private message to member
        await user.send(`Bonjour <@${user.id}>,\n
Merci d'avoir rejoint One Panthéon et Efrei Craft ! Tu peux désormais devenir **Membre du serveur** !
Pour cela, il te reste **une dernière étape** à effectuer, rendez-vous dans le salon <#1028938731337547786> et **suis les instructions**.\n
À bientôt sur le serveur !
L'équipe d'Efrei Craft`);/*.then(async msg => {
            const messages = await msg.channel.messages.fetch();
            messages.filter(m => m.author.id === interaction.client.user.id).forEach(m => m.delete());
        })*/
        interaction.reply({content: "L'utilisateur <@" + user.id + "> a été converti en nouveau membre avec succès !", ephemeral: true});
    }
}
