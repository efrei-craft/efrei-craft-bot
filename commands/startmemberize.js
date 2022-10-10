const { ContextMenuCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Changer en membre")
        .setType(2),
    async execute(interaction) {
        const user = interaction.targetMember;
        user.roles.add("1028938423253356544");
        user.roles.remove("1018926458632146995");
        interaction.reply({content: "L'utilisateur <@" + user.id + "> a été converti en nouveau membre avec succès !", ephemeral: true});
    }
}
