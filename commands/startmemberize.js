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
        await user.send(`**Oh ! Un nouveau membre !** Nous sommes ravis de ton arrivée chez EFREI Craft <@${user.id}>. 🤩

Il reste une **dernière étape** pour confirmer ton adhésion en tant que membre de One Panthéon et d'EFREI Craft, pour cela rien de plus simple :
- Rends-toi dans le channel <#1028938731337547786>
- Suis les instructions indiquées (ça prendra pas longtemps !) 👍
- Et... *c'est tout* ! ✨

Merci une nouvelle fois de ta confiance, et à très vite sur le serveur !
L'équipe EFREI Craft`);/*.then(async msg => {
            const messages = await msg.channel.messages.fetch();
            messages.filter(m => m.author.id === interaction.client.user.id).forEach(m => m.delete());
        })*/
        interaction.reply({content: "L'utilisateur <@" + user.id + "> a été converti en nouveau membre avec succès !", ephemeral: true});
    }
}
